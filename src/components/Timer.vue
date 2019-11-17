<template>
  <div>
    <h3>Timer: {{ state.timer }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    state: {
      type: Object
    }
  },
  data: function() {
    return {}
  }
}
</script>

<style></style>
