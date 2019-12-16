<template>
  <div
    :style="{
      position: 'relative'
    }"
  >
    <svg
      :width="canvasSize"
      :height="canvasSize"
      :style="{
        position: 'relative',
        padding: '0px',
        left: '0px',
        top: '0px'
      }"
    >
      <rect
        :style="{
          strokeWidth: 0,
          fill: this.pColorOutside.hex
        }"
        :width="this.pSizeOutside"
        :height="this.pSizeOutside"
      />

      <rect
        v-if="this.pSizeInside > 0"
        :style="{
          strokeWidth: 0,
          position: 'absolute',
          fill: selectedColor
        }"
        :width="this.pSizeInside"
        :height="this.pSizeInside"
        :x="boxOffset"
        :y="boxOffset"
      />
    </svg>

    <div
      :style="{
        position: 'absolute',
        left: textLeft,
        top: textTop,
        color: '#ffffff',
        zIndex: 2
      }"
    >
      <h1>{{ colorPrompt }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {}
  },
  props: {
    pSizeOutside: Number,
    pSizeInside: Number,
    pColorOutside: Object,
    pSelectedColor: {
      type: Object,
      default() {
        return { hex: '#000000' }
      }
    }
  },
  methods: {},
  computed: {
    colorPrompt: function() {
      if (this.pSelectedColor.hex == '#000000') {
        return '?'
      }
      return ''
    },
    boxOffset: function() {
      return (this.pSizeOutside - this.pSizeInside) / 2
    },
    canvasSize: function() {
      return this.pSizeOutside
    },
    selectedColor: function() {
      return this.pSelectedColor.hex
    },
    textLeft: function() {
      return 0.42 * this.pSizeOutside + 'px'
    },
    textTop: function() {
      return 0.12 * this.pSizeOutside + 'px'
    }
  },
  mounted() {}
}
</script>

<style></style>
