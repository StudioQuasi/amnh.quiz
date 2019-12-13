<template>
  <div>
    <h3>{{ question.clientPrompt }}</h3>

    <div
      :style="{
        position: 'relative'
      }"
    >
      <AnswerWord
        v-for="answer in question.answers"
        :style="{ position: 'relative' }"
        :psize="pSize"
        :passedstyle="{
          stroke: getShapeStroke(answer),
          strokeWidth: 4,
          fill: getShapeFill(answer)
        }"
        :key="answer.id"
        :answerTxt="answer.body"
        :answer="answer"
        @answer-press="selectAnswer"
      />
    </div>
  </div>
</template>

<script>
import AnswerWord from '@/components/AnswerWord.vue'

import { EventBus } from '@/event-bus.js'

export default {
  props: {
    question: Object,
    test: Object
  },
  data: function() {
    return {
      pSize: 1,
      selectedAnswerId: -1
    }
  },
  components: {
    AnswerWord
  },
  methods: {
    selectAnswer(id) {
      if (this.selectedAnswerId == -1) {
        this.selectedAnswerId = id

        //this.$refs.me.receiveAnswer(1)
        console.log('SELECT ANSWER')

        EventBus.$emit('broadcast-answer', this.selectedAnswerId)
      }
    },
    getShapeFill: function(_stroke) {
      console.log(_stroke)
      return '#ffffff'
    },
    getShapeStroke: function(_stroke) {
      console.log(_stroke)
      return '#000000'
    }
  }
}
</script>

<style scoped></style>
