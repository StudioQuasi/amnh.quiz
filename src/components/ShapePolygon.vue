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
    ></polygon>
  </svg>
</template>

{ id: 0, index: [0, 0], color: 'blue' },

<script>
export default {
  data: function() {
    return {}
  },
  props: {
    id: Number,
    pstyle: String,
    psize: Number,
    rcolor: String,
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
  methods: {
    pressedAnswer() {
      console.log(this.id)
    }
  },
  components: {}
}

function valueToPoint(value, index, total) {
  var x = 0
  var y = -value
  var angle = ((Math.PI * 2) / total) * index
  var cos = Math.cos(angle)
  var sin = Math.sin(angle)
  var tx = x * cos - y * sin + value
  var ty = x * sin + y * cos + value
  return {
    x: tx,
    y: ty
  }
}
</script>

<style></style>
