<template>
  <div
    :style="{
      position: 'absolute'
    }"
  >
    <svg :width="canvasSize" :height="canvasSize">
      <polygon :id="1" :points="getPoints" :style="passedstyle" />
    </svg>

    <div
      :style="{
        position: 'absolute',
        left: '33px',
        top: '-22px'
      }"
    >
      <h1>{{ this.body }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {}
  },
  props: {
    psize: Number,
    passedstyle: Object,
    body: Number
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
      return _t
    }
  }
}

function valueToPoint(value, index, total) {
  var x = 0
  var y = -value
  var angle = ((Math.PI * 2) / total) * index + Math.PI / 6

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
