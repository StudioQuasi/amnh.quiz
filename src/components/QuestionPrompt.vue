<template>
  <div class="clientQuestionPrompt">
    <h2>{{ body1 }}</h2>
    <h3>{{ body2 }}</h3>
  </div>
</template>

<script>
export default {
  data: function() {
    return {}
  },
  props: {
    body1: String,
    body2: String
  }
}
</script>

<style></style>
