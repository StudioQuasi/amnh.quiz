<template>
  <div
    :style="{
      background: 'white',
      width: '200px',
      height: '200px',
      position: 'relative'
    }"
  >
    <ShapePolygonParam
      v-for="shape in this.arrVals19"
      :psize="pSize"
      :passedstyle="{
        position: 'absolute',
        stroke: getShapeStroke(shape),
        strokeWidth: 4,
        fill: getShapeFill(shape)
      }"
      :tcolor="shape.color"
      :posX="getX(shape.index[0], shape.index[1])"
      :posY="getY(shape.index[1])"
      :key="shape.id"
      :shape="shape"
    />
  </div>
</template>

<script>
//import ShapePolygon from '@/components/ShapePolygon.vue'
import ShapePolygonParam from '@/components/ShapePolygonParam.vue'

export default {
  components: {
    //ShapePolygon,
    ShapePolygonParam
  },
  props: {
    pNum: Number,
    pSize: Number
  },
  methods: {
    getX: function(index_x, index_y) {
      console.log(Math.floor(index_x * this.stepX))
      return index_y % 2 == 0
        ? Math.floor(index_x * this.stepX)
        : Math.floor(index_x * this.stepX) + this.stepX * 0.5
    },
    getY: function(index_y) {
      return Math.floor(index_y * this.stepY)
    },
    getRandomColor: function() {
      var letters = '0123456789ABCDEF'
      var color = '#'
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    },
    getShapeFill: function(_stroke) {
      console.log(_stroke.id)
      return '#003399'
    },
    getShapeStroke: function(_stroke) {
      console.log(_stroke.id)
      return '#000000'
    }
  },
  data() {
    return {
      pcolor1: 'orange',
      stepX: 0,
      stepY: 0,
      pstyle: {
        position: 'absolute',
        stroke: 'orange',
        strokeWidth: 4,
        fill: 'purple'
      },
      arrVals6: [
        {
          id: 0,
          index: [1, 0],
          color: 'orange'
        },
        {
          id: 1,
          index: [0, 1],
          color: 'yellow'
        },
        {
          id: 2,
          index: [1, 1],
          color: 'red'
        },
        {
          id: 3,
          index: [0, 3],
          color: 'green'
        },
        {
          id: 4,
          index: [1, 3],
          color: 'purple'
        },
        {
          id: 4,
          index: [1, 4],
          color: 'blue'
        }
      ],
      arrVals19: [
        {
          id: 0,
          index: [1, 0],
          color: '#ffffff'
        },
        {
          id: 1,
          index: [0, 1],
          color: '#F7942F'
        },
        {
          id: 2,
          index: [1, 1],
          color: '#4E281C'
        },
        {
          id: 3,
          index: [0, 2],
          color: '#F59DAC'
        },
        {
          id: 4,
          index: [1, 2],
          color: '#F26522'
        },
        {
          id: 5,
          index: [2, 2],
          color: '#828383'
        },
        {
          id: 7,
          index: [0, 3],
          color: '#EC1A23'
        },
        {
          id: 8,
          index: [1, 3],
          color: '#FFF200'
        },
        {
          id: 9,
          index: [0, 4],
          color: '#EC207B'
        },
        {
          id: 10,
          index: [2, 4],
          color: '#8CC63F'
        },
        {
          id: 11,
          index: [0, 5],
          color: '#722C7A'
        },
        {
          id: 12,
          index: [1, 5],
          color: '#03A550'
        },
        {
          id: 13,
          index: [0, 6],
          color: '#B84F9E'
        },
        {
          id: 14,
          index: [1, 6],
          color: '#203F9A'
        },
        {
          id: 15,
          index: [2, 6],
          color: '#43BD96'
        },
        {
          id: 16,
          index: [0, 7],
          color: '#7154A3'
        },
        {
          id: 17,
          index: [1, 7],
          color: '#007D84'
        },
        {
          id: 18,
          index: [1, 8],
          color: '#00AEEF'
        }
      ]
    }
  },
  mounted() {
    this.stepY = (0.5 * this.pSize) / Math.abs(Math.tan((30 * Math.PI) / 180))
    console.log(
      'STEP X : ' +
        this.pSize +
        ',' +
        Math.tan((30 * Math.PI) / 180) +
        ',' +
        this.stepX
    )

    this.stepX =
      2 * this.pSize + 2 * Math.abs(Math.sin((30 * Math.PI) / 180) * this.pSize)

    console.log('Now mounted')
    console.log(this.stepX)
    console.log(this.stepY)
  }
}
</script>

<style></style>
