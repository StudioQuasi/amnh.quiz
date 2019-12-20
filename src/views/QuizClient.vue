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
        :pTextColor="{ hex: '#ffffff' }"
        :pFillColor="{ hex: getHexagonFillColor() }"
        :pStrokeColor="{ hex: getHexagonStrokeColor() }"
        :pBody="getIDString"
      />

      <div
        :style="{
          position: 'absolute',
          left: '350px'
        }"
      >
        <ColorWheel
          :pRadius="200"
          :pThickness="35"
          :pSteps="12"
          :pColors="this.colorWheelLrg"
        />
      </div>
    </div>

    <!--
      Multiple Choice + Bar Graph
    -->
    <div v-else-if="this.question.quizType === 1">
      <ShapePolygonSimple
        :pSize="75"
        :pTextColor="{ hex: this.question.colorPrompt }"
        :pFillColor="{ hex: this.question.colorPrompt }"
        :pStrokeColor="{ hex: this.question.colorPrompt }"
      />
      <div
        :style="{
          position: 'absolute',
          left: '350px'
        }"
      >
        <Question
          :question="this.question"
          :pDefaultTextColor="{ hex: '#ffffff' }"
          :pDefaultFillColor="{ hex: '#000000' }"
          :pDefaultStrokeColor="{ hex: '#ffffff' }"
        />
      </div>
    </div>

    <!--
      Color Pair
    -->
    <div v-else-if="this.question.quizType === 2">
      <ShapeColorPair
        :pSizeOutside="200"
        :pSizeInside="75"
        :pColorOutside="{ hex: this.question.colorPrompt }"
        :pSelectedColor="{ hex: this.receivedColor }"
      />

      <div
        :style="{
          position: 'absolute',
          left: '350px',
          top: '0px'
        }"
      >
        <ColorPair :question="this.question" :pSize="150" :pMargin="10" />
      </div>
    </div>

    <!--
      Multiple Choice + Corrct Answer
    -->
    <div v-else-if="this.question.quizType === 3">
      <QuestionFillinBlank :question="this.question" />

      <Question
        :question="this.question"
        :pDefaultTextColor="{ hex: '#ffffff' }"
        :pDefaultFillColor="{ hex: '#000000' }"
        :pDefaultStrokeColor="{ hex: '#ffffff' }"
      />
    </div>

    <!--
      Multiple Choice + Corrct Answer
    -->
    <div v-if="this.question.quizType === 0">
      <ShapePolygonSimple
        :pSize="75"
        :pTextColor="{ hex: '#ffffff' }"
        :pFillColor="{ hex: getHexagonFillColor() }"
        :pStrokeColor="{ hex: getHexagonStrokeColor() }"
        :pBody="getIDString"
      />

      <div
        :style="{
          position: 'absolute',
          left: '350px'
        }"
      >
        <ColorWheel
          :pRadius="200"
          :pThickness="200"
          :pSteps="4"
          :pColors="this.colorWheelSml"
        />
      </div>
    </div>
  </div>
</template>

<script>
import QuizService from '@/services/QuizService.js'
import ProgressBar from '@/components/ProgressBar.vue'
import QuestionPrompt from '@/components/QuestionPrompt.vue'
import Pusher from 'pusher-js'

import ColorWheel from '@/components/ColorWheel.vue'
import ShapePolygonSimple from '@/components/ShapePolygonSimple.vue'
import Question from '@/components/Question.vue'
import ColorPair from '@/components/ColorPair.vue'
import ShapeColorPair from '@/components/ShapeColorPair.vue'
import QuestionFillinBlank from '@/components/QuestionFillinBlank.vue'

import { EventBus } from '@/event-bus.js'

export default {
  props: ['quizId', 'questionId'],
  components: {
    ProgressBar,
    QuestionPrompt,
    ColorWheel,
    ShapePolygonSimple,
    Question,
    ColorPair,
    QuestionFillinBlank,
    ShapeColorPair
  },
  data() {
    return {
      question: Object,
      quiz: { questions: [] },

      quizState: Object,
      userScreenName: Number,
      userID: Number,

      //Color Wheel
      colorWheelLrg: Array,
      colorWheelSml: Array,

      quizIndex: Number,
      questionIndex: Number,

      prompt1: '',
      prompt2: '',

      receivedColor: '#000000',
      isAnswered: false
    }
  },
  methods: {
    receiveColor(c) {
      this.isAnswered = true

      this.receivedColor = c
      console.log('Shape Polygon. Receive : ' + c)
    },
    getHexagonFillColor() {
      if (this.isAnswered) return this.receivedColor
      else return '#393939'
    },
    getHexagonStrokeColor() {
      return '#ffffff'
    },
    getHexagonBody() {
      return 'As fd ss'
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
    getIDString: function() {
      return this.userID
    },
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

    this.userID = '12'

    QuizService.getQuestions()
      .then(response => {
        console.log('quiz index ' + this.quizIndex)
        console.log('question index ' + this.questionIndex)

        this.quiz = response.data.quizzes[this.quizIndex]
        this.question = this.quiz.questions[this.questionIndex]

        this.colorWheelLrg = response.data.colorWheelLrg
        this.colorWheelSml = response.data.colorWheelSml

        //Set Question prompt
        this.prompt1 = 'Your ID : ' + this.userID
        this.prompt2 = this.question.clientPrompt
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })

    //Receive broadcast of answer on Event Bus
    EventBus.$on('broadcast-client-word', qid =>
      QuizService.submitQuestion(qid, this.userID, this.quiz.id, this.question)
    )
    EventBus.$on('broadcast-client-color', c => this.receiveColor(c))
  }
}
</script>
