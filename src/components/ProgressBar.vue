<template>
  <div>
    <svg
      :width="500"
      :height="50"
      :style="{
        position: 'relative',
        left: '0px',
        top: '0px'
      }"
    >
      <polygon
        v-for="i in this.total"
        :key="i"
        :points="getPolygonPoints(i)"
        :style="{ fill: getColor(i) }"
      />
    </svg>

    <ShapePolygonSimple
      :body="this.currentQuestionIndex"
      :psize="50"
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
    pscale: Number,
    pmargin: Number,
    total: Number,
    currentQuestionIndex: Number
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
      console.log('OUT : ')
      console.log(_offset * this.pscale)

      for (var i = 0; i < _pts.length; i++) {
        _out.push(
          _pts[i][0] * this.pscale +
            (_offset - 1) * (0.875 * this.pscale + this.pmargin) +
            ',' +
            _pts[i][1] * this.pscale
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
