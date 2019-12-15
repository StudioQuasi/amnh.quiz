<template>
  <div>
    <ProgressBar
      :pscale="100"
      :pmargin="5"
      :total="12"
      :currentQuestionIndex="6"
    />

    <h2>Question: {{ quiz.name }} ({{ quiz.id }})</h2>

    <ColorWheel :pRadius="300" :pSteps="12" :pColors="this.colorWheelLrg" />

    <Question v-bind:key="this.question.id" v-bind:question="this.question" />
  </div>
</template>

<script>
import Question from '@/components/Question.vue'
import QuizService from '@/services/QuizService.js'
import ProgressBar from '@/components/ProgressBar.vue'
import ColorWheel from '@/components/ColorWheel.vue'
import Pusher from 'pusher-js'

import 'video.js/dist/video-js.css'

import { EventBus } from '@/event-bus.js'

export default {
  props: ['quizId', 'questionId'],
  components: {
    Question,
    ProgressBar,
    ColorWheel
  },
  data() {
    return {
      pNum: 5,
      pSize: 100,
      pcolor2: 'blue',
      psize2: 50,

      question: Object,
      quiz: { questions: [] },
      colorWheelLrg: [
        {
          id: 0,
          index: [1, 0],
          color: '#ffffff'
        }
      ],
      colorWheelSml: Array,
      quizState: Object,
      userScreenName: Number,
      userID: Number,

      quizIndex: Number,
      questionIndex: Number
    }
  },
  methods: {
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
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })

    /*
    QuizService.createUser()
      .then(response => {
        console.log('Create User : ' + response.data)
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
    */

    //Receive broadcast of answer on Event Bus
    EventBus.$on('broadcast-answer', qid =>
      QuizService.submitQuestion(qid, this.userID, this.quiz.id, this.question)
    )
  }
}
</script>
