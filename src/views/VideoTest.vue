<template>
  <div
    style="position:relative;background-image:url(https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg)"
  >
    <div
      style="position:absolute;width:600px;height:600px;left:100px;top:0px;background-color:#008800"
    >
      aasdfasdf
      <br />asdf <br />aasdfasdfasdf <br />asdf <br />asdffadsasdf
      <br />
    </div>
    <video
      id="video1"
      autoplay
      src="http://localhost:8080/./video/game.webm"
      loop
      muted
      playsinline
    ></video>
    <div
      style="position:absolute;width:600px;height:600px;left:100px;top:0px;background-color:#008800"
    >
      aasdfasdf
      <br />asdf <br />aasdfasdfasdf <br />asdf <br />asdffadsasdf
      <br />
    </div>
    aasdfasdf <br />asdf <br />aasdfasdfasdf <br />asdf <br />asdffadsasdf
    <br />

    <button @click="myFunctionClick()">click</button>

    <div
      id="vFrame1"
      ref="vFrame1"
      style="{ visibility:visible; position:absolute; top:40px; }"
    >
      <video
        id="vPlayer1"
        ref="vPlayer1"
        class="video-js"
        preload="auto"
        data-setup="{}"
        @loadeddata="onVideoLoad"
        @ended="onVideoEnd"
      >
        <source src="http://localhost:8080/./video/1.webm" type="video/webM" />
      </video>
    </div>

    <div
      id="vFrame2"
      ref="vFrame2"
      style="{ visibility:visible; position:absolute; top:40px; }"
    >
      <video
        id="vPlayer2"
        ref="vPlayer2"
        class="video-js"
        preload="auto"
        data-setup="{}"
        @loadeddata="onVideoLoad"
        @ended="onVideoEnd"
      >
        <source src="http://localhost:8080/./video/1.webm" type="video/webM" />
      </video>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      players: [],
      playerIndex: Number
    }
  },
  computed: {
    showVideo() {
      return this.playerIndex == 1
    }
  },
  methods: {
    //Fix this
    onVideoLoad() {
      console.log('>On video load.')
    },
    onVideoEnd() {
      console.log('Video Ended : ')
      console.log(this.playerIndex)
      //this.players[this.playerIndex].style.visibility = 'hidden'
      this.playerIndex = ++this.playerIndex % 2

      console.log('Auto Play Video : ' + this.playerIndex)
      this.players[this.playerIndex].style.visibility = 'visible'
      this.players[this.playerIndex].play()
    },
    myFunctionClick: function() {
      //this.players[this.playerIndex].style.visibility = 'hidden'
      this.playerIndex = ++this.playerIndex % 2
      this.players[this.playerIndex].style.visibility = 'visible'

      console.log('Play video : ' + this.playerIndex)
      this.players[this.playerIndex].play()
    }
  },
  mounted() {
    console.log('mounted')
    this.players.push(this.$refs.vPlayer1)
    this.players.push(this.$refs.vPlayer2)

    this.playerIndex = 0

    this.players[1].style.visibility = 'hidden'
    this.players[0].style.visibility = 'visible'
  }
}
</script>

<style></style>
