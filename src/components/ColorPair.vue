<template>
  <div>
    <svg
      :width="canvasSize[0]"
      :height="canvasSize[1]"
      :style="{
        position: 'relative',
        padding: '0px',
        left: '0px',
        top: '0px'
      }"
    >
      <rect
        v-for="(answer, index) in question.answers"
        :key="answer.id"
        :style="{
          strokeWidth: 0,
          fill: getFillColor(answer)
        }"
        :width="boxSize"
        :height="boxSize"
        :y="boxOffset(index)"
        v-on:click="pressedColor(answer)"
      />

      <!--polygon
        v-for="(answer, index) in question.answers"
        :key="answer.id"
        :style="{
          stroke: getStrokeColor(answer),
          strokeWidth: 0,
          fill: getFillColor(answer)
        }"
        :id="1"
        :points="getPoints"
        v-on:click="pressedColor(answer, index)"
      /-->
    </svg>
  </div>
</template>

<script>
import { EventBus } from '@/event-bus.js'

//import AnswerWord from '@/components/AnswerWord.vue'

export default {
  props: {
    question: Object,
    pSize: Number,
    pMargin: Number
  },
  data: function() {
    return {
      selectedAnswer: Object
    }
  },
  components: {},
  computed: {
    canvasSize: function() {
      return [this.pSize, 3 * this.pSize]
    },
    boxSize: function() {
      return this.pSize
    }
  },
  methods: {
    pressedColor(_answer) {
      this.selectedAnswer = _answer

      console.log(this.selectedAnswer.id)
      console.log(_answer.id)
      EventBus.$emit('broadcast-client-color', _answer.id)
    },
    getFillColor: function(_answer) {
      if (_answer == this.selectedAnswer) {
        return '#000000'
      } else return _answer.color
    },
    getStrokeColor: function(_answer) {
      if (_answer == this.selectedAnswer) return this.question.colorPrompt
      else return _answer.color
    },
    boxOffset: function(_index) {
      return _index * (this.pSize + this.pMargin)
    }
  },
  mounted() {}
}
</script>

<style scoped></style>
