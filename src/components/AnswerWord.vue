<!--template>
  <div class="answer-body">
    <h4>{{ answer.body }}</h4>
  </div>
</template-->

<template>
  <div
    :style="{
      position: 'relative'
    }"
  >
    <svg
      :width="225"
      :height="50"
      :style="{
        position: 'relative',
        padding: '0px',
        left: '0px',
        top: '0px'
      }"
    >
      <polygon
        :style="passedstyle"
        :id="1"
        :points="getPoints"
        v-on:click="pressedAnswer"
      />
    </svg>

    <div
      :style="{
        position: 'absolute',
        left: '0px',
        top: '0px'
      }"
    >
      <h4>{{ this.answer.body }}</h4>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/event-bus.js'

export default {
  props: {
    answerTxt: String,
    psize: Number,
    passedstyle: Object,
    answer: Object
  },
  data: function() {
    return {
      id: this.answer.id,
      state: 0
    }
  },

  methods: {
    pressedAnswer() {
      console.log(this.id)
      this.$emit('answer-press', this.id)
    },
    receiveAnswser(tid) {
      console.log('SETTING STATE')
      if (tid == this.id) {
        this.state = 1
      } else {
        this.state = 2
      }
    }
  },
  computed: {
    getPoints: function() {
      var _arrpts = ['0, 0', '200, 0', '225, 25', '200, 50', '0, 50', '0, 0']

      var _t = _arrpts.join(' ')

      return _t
    },
    bgColor() {
      switch (this.state) {
        case 1:
          return 'answer-selected'
        case 2:
          return 'answer-disabled'
      }
      return ''
    }
  },
  mounted() {
    console.log('#' + this.answer.body)
    EventBus.$on('broadcast-answer', tid => this.receiveAnswser(tid))
  }
}
</script>

<style></style>
