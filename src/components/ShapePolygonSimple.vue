<template>
  <div
    :style="{
      position: 'absolute'
    }"
  >
    <svg :width="canvasSize" :height="canvasSize">
      <polygon
        :id="1"
        :points="getPoints"
        :style="{
          strokeWidth: 2,
          fill: this.pFillColor.hex,
          stroke: this.pStrokeColor.hex
        }"
      />
    </svg>

    <div
      :style="{
        position: 'absolute',
        left: textLeft,
        top: textTop,
        color: this.pTextColor.hex
      }"
    >
      <h2>{{ this.pBody }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {}
  },
  props: {
    pSize: Number,
    pBody: {
      type: String,
      default: ''
    },
    pTextColor: Object,
    pFillColor: Object,
    pStrokeColor: Object
  },
  methods: {},
  computed: {
    textLeft: function() {
      return 0.3 * this.pSize + 'px'
    },
    textTop: function() {
      return -0.3 * this.pSize + 'px'
    },
    canvasSize: function() {
      return 2 * this.pSize
    },
    getPoints: function() {
      var _pts = []

      for (var i = 0; i < 6; i++) {
        var point = valueToPoint(this.pSize, i, 6) //arrPts[i]
        _pts.push(point.x + ',' + point.y)
      }

      var _t = _pts.join(' ')
      return _t
    }
  },
  mounted() {
    console.log('MOUNTED')
    console.log(this.pBody)
    console.log(this.pFillColor)
    console.log(this.pSize)
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
