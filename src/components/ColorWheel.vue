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
        v-for="(c, index) in this.pColors"
        :key="index"
        :points="getAnyPiece(index)"
        :style="{
          position: 'absolute',
          stroke: getStrokeColor(c.color),
          strokeWidth: 1,
          fill: c.color
        }"
        v-on:click="pressedColor(c.color, index)"
      />
      <polygon
        :points="getAnyPiece(this.selectedColorIndex)"
        :style="{
          position: 'absolute',
          stroke: '#ffffff',
          strokeWidth: 2,
          strokeOpacity: 1,
          fillOpacity: 0
        }"
      />
    </svg>
  </div>
</template>

<script>
import { EventBus } from '@/event-bus.js'

export default {
  props: {
    pRadius: Number,
    pThickness: {
      type: Number,
      default: 50
    },
    pSteps: {
      type: Number,
      default: 0
    },
    pColors: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  computed: {
    canvasSize: function() {
      return 2 * this.pRadius
    }
  },
  methods: {
    pressedColor(_key, _index) {
      this.selectedColorIndex = _index
      EventBus.$emit('broadcast-client-color', _key)
    },
    valueToPoint: function(value, _x, _y, index, total) {
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
    },
    getStrokeColor: function(_c) {
      if (_c == this.selectedColor) {
        return '#ffffff'
      } else {
        return '#000000'
      }
    },
    getAnyPiece: function(_index) {
      var _slices = this.pSteps
      var _thick = this.pThickness

      var _pts = []

      var _level = Math.floor(_index / _slices)

      var _radius1 = _level * _thick
      var _radius2 = (1 + _level) * _thick

      var _pt = this.valueToPoint(
        _radius1,
        this.pRadius,
        this.pRadius,
        _index,
        _slices
      )
      _pts.push(_pt.x + ',' + _pt.y)

      _pt = this.valueToPoint(
        _radius2,
        this.pRadius,
        this.pRadius,
        _index,
        _slices
      )
      _pts.push(_pt.x + ',' + _pt.y)

      _pt = this.valueToPoint(
        _radius2,
        this.pRadius,
        this.pRadius,
        _index + 1,
        _slices
      )
      _pts.push(_pt.x + ',' + _pt.y)

      if (_level > 0) {
        _pt = this.valueToPoint(
          _radius1,
          this.pRadius,
          this.pRadius,
          _index + 1,
          _slices
        )
        _pts.push(_pt.x + ',' + _pt.y)
      }
      return _pts
    }
  },
  data() {
    return {
      selectedColorIndex: Number
    }
  },
  mounted() {}
}
</script>

<style></style>
