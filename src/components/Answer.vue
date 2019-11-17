<template>
  <div class="event-card -shadow" :class="bgColor" v-on:click="pressedAnswer">
    <div>
      <div class="answer-img"><img v-bind:src="image" /></div>
      <div class="answer-body">
        <h4>{{ answer.body }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/event-bus.js'

export default {
  props: {
    answer: Object
  },
  data: function() {
    return {
      id: this.answer.id,
      image: this.answer.img,
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
    console.log('GOT BACK HERE')
    EventBus.$on('broadcast-answer', tid => this.receiveAnswser(tid))
  }
}
</script>

<style></style>
