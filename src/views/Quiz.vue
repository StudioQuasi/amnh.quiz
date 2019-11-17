<template>
  <div>
    <h2>Quiz: {{ quiz.name }} ({{ quiz.id }})</h2>
    <h3>{{ this.questionIndex + 1 }}/{{ this.quiz.questions.length }}</h3>

    <button v-on:click="nextQuestion">
      Next Question
    </button>

    <Timer v-bind:state="this.quizState"></Timer>

    <Question v-bind:key="this.question.id" v-bind:question="this.question" />
  </div>
</template>

<script>
import Timer from '@/components/Timer.vue'
import Question from '@/components/Question.vue'
import QuizService from '@/services/QuizService.js'
import Pusher from 'pusher-js'

export default {
  props: ['quizId'],
  components: {
    Question,
    Timer // change to our component
  },
  data() {
    return {
      questionIndex: 0,
      question: Object,
      quiz: Object,
      quizState: Object
    }
  },
  methods: {
    handleServer(data) {
      this.quizState = data
      console.log('timer > ' + data.timer)
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
    console.log('** STARTING')

    this.subscribe()

    QuizService.getQuestions()
      .then(response => {
        for (var quizIndex = 0; quizIndex < response.data.length; quizIndex++) {
          if (response.data[quizIndex].id == this.quizId) {
            this.quiz = response.data[quizIndex]
            this.question = this.quiz.questions[this.questionIndex]
          }
        }
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  }
}
</script>
