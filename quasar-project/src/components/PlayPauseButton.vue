<template>
  <div class="playpause-container">
    <button class="button-play" @click="togglePlay" :style="{ boxShadow: playButtonBoxShadow }">▶</button>
    <button class="button-pause" @click="togglePause" :style="{ boxShadow: pauseButtonBoxShadow }">❚❚</button>
<!--    <button class="button-resume" @click="toggleResume" :style="{ boxShadow: resumeButtonBoxShadow }">◄</button>-->
  </div>
</template>

<script>
export default {
  name: 'PlayPauseButton',
  data() {
    return {
      playButtonBoxShadow: '0 0 10px, inset 0 0 50px rgba(0, 0, 0, 0.8)',
      pauseButtonBoxShadow: '0 0 10px, inset 0 0 50px rgba(0, 0, 0, 0.8)',
      // resumeButtonBoxShadow: '0 0 10px, inset 0 0 50px rgba(0, 0, 0, 0.8)',
      isPlaying: false,
      isPaused: false,
      // isResumed: false
    };
  },
  methods: {
    togglePlay() {
      if(this.isPlaying === false){
        this.isPlaying = true;
        this.playButtonBoxShadow = this.isPlaying
          ? '0 0 10px, inset 0 0 50px rgba(163, 53, 253, 0.87)'
          : '0 0 10px, inset 0 0 50px rgba(0, 0, 0, 0.8)';
        // this.isPaused = false;
        this.pauseButtonBoxShadow = '0 0 10px, inset 0 0 50px rgba(0, 0, 0, 0.8)';

        // this.isResumed = false;
        // this.resumeButtonBoxShadow = '0 0 10px, inset 0 0 50px rgba(0, 0, 0, 0.8)';

        this.$emit('startSeq');
        console.log('startSeq');
      }
    },
    togglePause() {
      if(this.isPlaying === true){
        // this.isPaused = !this.isPaused;
        // this.pauseButtonBoxShadow = this.isPaused
        //   ? '0 0 10px, inset 0 0 50px rgba(163, 53, 253, 0.87)'
        //   : '0 0 10px, inset 0 0 50px rgba(0, 0, 0, 0.8)';
        this.isPlaying = false;
        this.playButtonBoxShadow = '0 0 10px, inset 0 0 50px rgba(0, 0, 0, 0.8)';

        // this.isResumed = false;
        // this.resumeButtonBoxShadow = '0 0 10px, inset 0 0 50px rgba(0, 0, 0, 0.8)';

        this.$emit('pauseSeq');
        console.log('pauseSeq');
      }
    },
    // toggleResume() {
    //   this.isResumed = !this.isResumed;
    //   this.resumeButtonBoxShadow = this.isResumed
    //     ? '0 0 10px, inset 0 0 50px rgba(163, 53, 253, 0.87)'
    //     : '0 0 10px, inset 0 0 50px rgba(0, 0, 0, 0.8)';
    //   this.isPlaying = false;
    //   this.playButtonBoxShadow = '0 0 10px, inset 0 0 50px rgba(0, 0, 0, 0.8)';
    //   this.isPaused = false;
    //   this.pauseButtonBoxShadow = '0 0 10px, inset 0 0 50px rgba(0, 0, 0, 0.8)';
    //
    //   this.$emit('resumeSeq');
    //   console.log('resumeSeq');
    // }
  }
};
</script>


<style scoped>
.playpause-container {
  position: relative;
  bottom: 5%;
  left: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 165px;
  height: 35px;
}

.button-play,
.button-pause,
.button-resume {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 10px, inset 0 0 50px rgba(0, 0, 0, 0.8);
  margin-right: 20px;
}

.button-play:active,
.button-pause:active,
.button-resume:active {
  box-shadow: 0 0 10px, inset 0 0 50px rgba(163, 53, 253, 0.87);
}
</style>
