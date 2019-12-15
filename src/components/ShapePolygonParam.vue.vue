<template>
  <svg
    :width="canvasSize"
    :height="canvasSize"
    :style="{
      position: 'absolute',
      left: posX,
      top: posY
    }"
  >
    <polygon
      :id="1"
      :points="getPoints"
      :style="passedstyle"
      v-on:click="pressedAnswer"
    />
  </svg>
</template>

<script>
export default {
  data: function() {
    return {}
  },
  props: {
    psize: Number,
    posX: Number,
    posY: Number,
    passedstyle: Object
  },
  computed: {
    canvasSize: function() {
      return 2 * this.psize
    },
    getPoints: function() {
      var _pts = []

      for (var i = 0; i < 6; i++) {
        var point = valueToPoint(this.psize, i, 6) //arrPts[i]
        _pts.push(point.x + ',' + point.y)
      }

      var _t = _pts.join(' ')
      console.log(_t)

      return _t
    }
  },
  methods: {},
  components: {}
}
</script>

<style></style>
