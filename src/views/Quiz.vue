<template>
  <div>
    <div v-if="$route.name == 'host-show'">
      <h2>Host Screen: {{ quiz.name }}</h2>

      <template>
        <video-player
          class="video-player-box"
          ref="videoPlayer"
          :options="playerOptions"
          :playsinline="true"
          customEventName="customstatechangedeventname"
          @play="onPlayerPlay($event)"
          @pause="onPlayerPause($event)"
          @ended="onPlayerEnded($event)"
          @waiting="onPlayerWaiting($event)"
          @playing="onPlayerPlaying($event)"
          @loadeddata="onPlayerLoadeddata($event)"
          @timeupdate="onPlayerTimeupdate($event)"
          @canplay="onPlayerCanplay($event)"
          @canplaythrough="onPlayerCanplaythrough($event)"
          @statechanged="playerStateChanged($event)"
          @ready="playerReadied"
        ></video-player>

        <!--vimeo-player
          ref="player"
          :video-id="videoID"
          @ready="onReady"
          :player-height="height"
        ></vimeo-player-->
      </template>
    </div>

    <div v-else>
      <h2>Question: {{ quiz.name }} ({{ quiz.id }})</h2>
      <h3>{{ this.questionIndex + 1 }}/{{ this.quiz.questions.length }}</h3>
      <button v-on:click="nextQuestion">Next Question</button>
    </div>

    <PolygonSet
      :pNum="pNum"
      :pSize="50"
      :width="300"
      :height="300"
    ></PolygonSet>

    <Timer v-bind:state="this.quizState"></Timer>

    <Question v-bind:key="this.question.id" v-bind:question="this.question" />
  </div>
</template>

<script>
import Timer from '@/components/Timer.vue'
import Question from '@/components/Question.vue'
import QuizService from '@/services/QuizService.js'
import Pusher from 'pusher-js'
import PolygonSet from '@/components/PolygonSet.vue'

import 'video.js/dist/video-js.css'

import { EventBus } from '@/event-bus.js'

export default {
  props: ['quizId'],
  components: {
    Question,
    Timer,
    PolygonSet
  },
  data() {
    return {
      pNum: 5,
      pSize: 100,

      pcolor2: 'blue',
      psize2: 50,

      questionIndex: 0,
      question: Object,
      quiz: { questions: [] },
      quizState: Object,
      userScreenName: Number,
      userID: Number,

      videoID: '224876461',
      height: 2000,
      options: {},
      playerReady: false,

      playerOptions: {
        // videojs options
        muted: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: 'video/mp4',
            src: '/static/video/game.webm'
          }
        ],
        poster: '/static/images/author.jpg'
      }
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
    },
    onReady() {
      this.playerReady = true
      this.play()
    },
    play() {
      this.$refs.player.play()
    },
    pause() {
      this.$refs.player.pause()
    }
  },
  computed: {
    dstate() {
      return this.tstate
    }
  },

  // When this is first created
  created() {
    this.subscribe()

    QuizService.getQuestions()
      .then(response => {
        for (
          var quizIndex = 0;
          quizIndex < response.data.quizzes.length;
          quizIndex++
        ) {
          if (response.data.quizzes[quizIndex].id == this.quizId) {
            this.quiz = response.data.quizzes[quizIndex]
            this.question = this.quiz.questions[this.questionIndex]
          }
        }
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
