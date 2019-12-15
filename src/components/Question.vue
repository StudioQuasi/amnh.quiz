<template>
  <div>
    <div
      v-for="(answer, index) in question.answers"
      :key="answer.id"
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
          :style="{
            stroke: getStrokeColor(answer),
            strokeWidth: 2,
            fill: getFillColor(answer)
          }"
          :id="1"
          :points="getPoints"
          v-on:click="pressedWord(answer, index)"
        />
      </svg>

      <div
        :style="{
          color: getTextColor(answer),
          position: 'absolute',
          left: '10px',
          top: '-20px'
        }"
      >
        <h4>{{ answer.body }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/event-bus.js'

//import AnswerWord from '@/components/AnswerWord.vue'

export default {
  props: {
    question: Object,
    pDefaultTextColor: Object,
    pDefaultFillColor: Object,
    pDefaultStrokeColor: Object
  },
  data: function() {
    return {
      pSize: 1,
      selectedAnswer: Object
    }
  },
  components: {},
  computed: {
    getPoints: function() {
      var _arrpts = ['0, 0', '200, 0', '225, 25', '200, 50', '0, 50', '0, 0']
      var _t = _arrpts.join(' ')

      return _t
    }
  },
  methods: {
    pressedWord(_answer, _index) {
      this.selectedAnswer = _answer

      console.log('SELECT ANSWER' + _index)
      console.log(this.selectedAnswer.id)
      console.log(_answer.id)
      EventBus.$emit('broadcast-client-word', _answer.id)
    },
    getFillColor: function(_answer) {
      if (_answer == this.selectedAnswer) {
        return this.question.colorPrompt
      } else return this.pDefaultFillColor.hex
    },
    getStrokeColor: function(_answer) {
      if (_answer == this.selectedAnswer) return this.question.colorPrompt
      else return this.pDefaultStrokeColor.hex
    },
    getTextColor: function(_answer) {
      if (_answer == this.selectedAnswer) return '#000000'
      else return this.pDefaultTextColor.hex
    }
  },
  mounted() {}
}
</script>

<style scoped></style>
