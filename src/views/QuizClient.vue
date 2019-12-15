<template>
  <div
    :style="{
      position: 'relative'
    }"
  >
    <ProgressBar
      :pWidth="800"
      :pmargin="5"
      :pTotal="this.quiz.number"
      :currentQuestionIndex="this.question.id"
    />

    <QuestionPrompt :body1="this.prompt1" :body2="this.prompt2" />

    <!--
      Color Gradient + Mosaic
    -->
    <div v-if="this.question.quizType === 0">
      <ShapePolygonSimple
        :pSize="75"
        :passedstyle="{
          strokeWidth: 0,
          fill: this.receivedColor
        }"
      />

      <ColorWheel
        :pRadius="200"
        :pThickness="35"
        :pSteps="12"
        :pColors="this.colorWheelLrg"
      />
    </div>

    <!--
      Multiple Choice + Bar Graph
    -->
    <div v-else-if="this.question.quizType === 1">
      <ShapePolygonSimple
        :pSize="75"
        :passedstyle="{
          strokeWidth: 0,
          fill: this.question.colorPrompt
        }"
      />
      <Question
        :question="this.question"
        :pDefaultTextColor="{ hex: '#ffffff' }"
        :pDefaultFillColor="{ hex: '#000000' }"
        :pDefaultStrokeColor="{ hex: '#ffffff' }"
      />
    </div>
  </div>
</template>

<script>
import QuizService from '@/services/QuizService.js'
import ProgressBar from '@/components/ProgressBar.vue'
import QuestionPrompt from '@/components/QuestionPrompt.vue'

import ColorWheel from '@/components/ColorWheel.vue'
import ShapePolygonSimple from '@/components/ShapePolygonSimple.vue'

import Question from '@/components/Question.vue'

import Pusher from 'pusher-js'

import { EventBus } from '@/event-bus.js'

export default {
  props: ['quizId', 'questionId'],
  components: {
    ProgressBar,
    QuestionPrompt,
    ColorWheel,
    ShapePolygonSimple,
    Question
  },
  data() {
    return {
      pNum: 5,
      pSize: 100,
      pcolor2: 'blue',
      psize2: 50,

      question: Object,
      quiz: { questions: [] },
      colorWheelLrg: Array,
      colorWheelSml: Array,
      quizState: Object,
      userScreenName: Number,
      userID: Number,

      quizIndex: Number,
      questionIndex: Number,

      prompt1: '',
      prompt2: '',

      receivedColor: '#ffffff'
    }
  },
  methods: {
    receiveColor(c) {
      this.receivedColor = c
      console.log('Shape Polygon. Receive : ' + c)
    },
    handleServer(data) {
      this.quizState = data
    },
    nextQuestion() {
      console.log('The next question')
      this.questionIndex++
      if (this.questionIndex >= this.quiz.questions.length) {
        this.questionIndex = 0
      }
      this.question = this.quiz.questions[this.questionIndex]
    },
    subscribe() {
      let pusher = new Pusher('09cb2f14bc833f79ca68', { cluster: 'us2' })
      pusher.subscribe('quizserver')
      pusher.bind('next', data => {
        this.handleServer(data)
      })
    }
  },
  computed: {
    dstate() {
      return this.tstate
    }
  },

  // When this is first created
  created() {
    this.quizIndex = this.quizId
    this.questionIndex = this.questionId

    this.subscribe()

    console.log('- QUIZ ID ' + this.quizIndex)

    QuizService.getQuestions()
      .then(response => {
        console.log('quiz index ' + this.quizIndex)
        console.log('question index ' + this.questionIndex)

        this.quiz = response.data.quizzes[this.quizIndex]
        this.question = this.quiz.questions[this.questionIndex]

        this.colorWheelLrg = response.data.colorWheelLrg
        this.colorWheelSml = response.data.colorWheelSml

        //Set Question prompt
        this.prompt1 = 'Your ID : 4'
        this.prompt2 = this.question.clientPrompt
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })

    //Receive broadcast of answer on Event Bus
    EventBus.$on('broadcast-answer', qid =>
      QuizService.submitQuestion(qid, this.userID, this.quiz.id, this.question)
    )
    EventBus.$on('broadcast-client-color', c => this.receiveColor(c))
  }
}
</script>
