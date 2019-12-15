<template>
  <div
    :style="{
      background: 'black',
      width: canvasSize,
      height: canvasSize,
      position: 'relative'
    }"
  >
    <svg :width="canvasSize" :height="canvasSize">
      <polygon
        v-for="c in this.pColors"
        :key="c.id"
        :points="getAnyPiece(300, 300, 50, c.id)"
        :style="{
          position: 'absolute',
          stroke: '#000000',
          strokeWidth: 1,
          fill: c.color
        }"
        v-on:click="pressedColor"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    pRadius: Number,
    pSteps: {
      type: Number,
      default: 0
    },
    pColors: Array
  },
  computed: {
    canvasSize: function() {
      return 2 * this.pRadius
    }
  },
  methods: {
    pressedColor() {
      console.log(this.id)
    },
    getAnyPiece: function(_x, _y, _radius, _index) {
      var _slices = this.pSteps

      console.log('$$$>>> ' + this.pSteps)

      var _pts = []
      var _pt

      _index -= 1
      var _level = Math.floor(_index / _slices)

      var _radius1 = _level * _radius
      var _radius2 = (1 + _level) * _radius

      //_pts.push(_x + ',' + _y)
      _pt = valueToPoint(_radius1, _x, _y, _index, 12)
      _pts.push(_pt.x + ',' + _pt.y)

      _pt = valueToPoint(_radius2, _x, _y, _index, 12)
      _pts.push(_pt.x + ',' + _pt.y)

      _pt = valueToPoint(_radius2, _x, _y, _index + 1, 12)
      _pts.push(_pt.x + ',' + _pt.y)

      if (_level > 0) {
        _pt = valueToPoint(_radius1, _x, _y, _index + 1, 12)
        _pts.push(_pt.x + ',' + _pt.y)
      }

      console.log('DRAW PIE ' + _index + ' : ')
      console.log(_pts)
      return _pts
    },
    getShapeStroke: function() {
      return '#ffffff'
    }
  },
  data() {
    return {
      thing: [0, 1, 2],
      pstyle: {
        position: 'absolute',
        stroke: 'orange',
        strokeWidth: 4,
        fill: 'purple'
      },
      tColors: [
        {
          id: 2,
          index: [1, 1],
          color: '#4E281C'
        }
      ]
    }
  },
  mounted() {
    console.log('>>> MOUNTED')
    console.log(this.pSteps)
    console.log('1>')
    console.log(this.pColors)
    console.log('2>')
    console.log(this.pColors.colors)
  }
}

function valueToPoint(value, _x, _y, index, total) {
  var x = 0
  var y = -value
  var angle = ((Math.PI * 2) / total) * index + Math.PI / 6

  var cos = Math.cos(angle)
  var sin = Math.sin(angle)

  var tx = x * cos - y * sin + _x
  var ty = x * sin + y * cos + _y

  return {
    x: tx,
    y: ty
  }
}
</script>

<style></style>
