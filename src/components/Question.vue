<template>
  <div>
    <h3>{{ question.body }} ({{ question.id }})</h3>

    <Answer
      v-for="answer in question.answers"
      :key="answer.id"
      :answer="answer"
      @answer-press="selectAnswer"
    />
  </div>
</template>

<script>
import Answer from '@/components/Answer.vue'

import { EventBus } from '@/event-bus.js'

export default {
  props: {
    question: Object,
    test: Object
  },
  data: function() {
    return {
      selectedAnswerId: -1
    }
  },
  components: {
    Answer
  },
  methods: {
    selectAnswer(id) {
      if (this.selectedAnswerId == -1) {
        this.selectedAnswerId = id

        //this.$refs.me.receiveAnswer(1)
        console.log('SELECT ANSWER')

        EventBus.$emit('broadcast-answer', this.selectedAnswerId)
      }
    }
  }
}
</script>

<style scoped></style>
