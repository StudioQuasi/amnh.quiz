<template>
  <div id="app">
    <div class="container">
      <my-video :sources="video.sources" :options="video.options"></my-video>
    </div>
  </div>
</template>

<script>
import myVideo from 'vue-video'

export default {
  data() {
    return {
      video: {
        sources: [
          {
            src: 'http://vjs.zencdn.net/v/oceans.mp4',
            type: 'video/mp4'
          }
        ],
        options: {
          autoplay: false,
          volume: 0.6,
          controls: false
        }
      }
    }
  },
  components: {
    myVideo
  },
  methods: {},
  created() {
    console.log('created')

    myVideo.on('loaded', function() {
      console.log('ddd')
    })

    //var player1 = document.querySelector('.player1-id')

    //player1.load()

    //player1.play()
    /*
    var player = videojs('my-player', options, function onPlayerReady() {
      videojs.log('Your player is ready!')

      // In this context, `this` is the player that was created by Video.js.
      this.play()

      // How about an event listener?
      this.on('ended', function() {
        videojs.log('Awww...over so soon?!')
      })
    })
    */
  }
}
</script>

<style></style>
