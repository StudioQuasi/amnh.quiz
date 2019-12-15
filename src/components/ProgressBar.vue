<template>
  <div>
    <svg
      :width="this.pWidth"
      :height="50"
      :style="{
        position: 'relative',
        left: '0px',
        top: '0px'
      }"
    >
      <polygon
        v-for="i in this.pTotal"
        :key="i"
        :points="getPolygonPoints(i)"
        :style="{ fill: getColor(i) }"
      />
    </svg>

    <ShapePolygonSimple
      :body="this.currentQuestionIndex"
      :pSize="50"
      :passedstyle="{
        stroke: '#FFFF01',
        strokeWidth: 2,
        fill: '#FFFF01'
      }"
    />
  </div>
</template>

<script>
import ShapePolygonSimple from '@/components/ShapePolygonSimple.vue'

export default {
  data: function() {
    return {}
  },
  props: {
    pWidth: Number,
    pmargin: Number,
    pTotal: Number,
    currentQuestionIndex: Number
  },

  computed: {
    pScale: function() {
      return this.pWidth / this.pTotal
    }
  },
  methods: {
    getColor: function(_i) {
      if (_i == this.currentQuestionIndex) {
        return '#ffffff'
      } else if (_i > this.currentQuestionIndex) {
        return '#3F3C48'
      } else {
        return '#FFFF01'
      }
    },
    getPolygonPoints: function(_offset) {
      var _out = []
      var _pts = [
        [0, 0],
        [0.125, 0.125],
        [1, 0.125],
        [0.875, 0]
      ]

      for (var i = 0; i < _pts.length; i++) {
        _out.push(
          _pts[i][0] * this.pScale +
            (_offset - 1) * (0.875 * this.pScale + this.pmargin) +
            ',' +
            _pts[i][1] * this.pScale
        )
      }

      var _t = _out.join(' ')
      return _t
    }
  },
  components: {
    ShapePolygonSimple
  }
}
</script>

<style></style>
