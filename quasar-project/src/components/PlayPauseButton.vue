<template>
  <div class="playpause-container">
    <div class="circle">
      <button class="button-play" @click="togglePlay" :style="{ boxShadow: playButtonBoxShadow }">▶</button>
    </div>
    <div class="circle">
      <button class="button-pause" @click="togglePause" :style="{ boxShadow: pauseButtonBoxShadow }">❚❚</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayPauseButton',
  data() {
    return {
      playButtonBoxShadow: '0 0 10px, inset 0 0 50px rgba(0, 0, 0, 0.8)',
      pauseButtonBoxShadow: '0 0 10px, inset 0 0 50px rgba(0, 0, 0, 0.8)',
    };
  },
  props: {
    isPlaying: Boolean
  },
  watch: {
    isPlaying(newValue) {
      if (newValue) {
        // Update styles when playing
        this.playButtonBoxShadow = '0 0 10px, inset 0 0 50px rgba(163, 53, 253, 0.87)';
        this.pauseButtonBoxShadow = '0 0 10px, inset 0 0 50px rgba(0, 0, 0, 0.8)';
      } else {
        // Update styles when paused
        this.playButtonBoxShadow = '0 0 10px, inset 0 0 50px rgba(0, 0, 0, 0.8)';
        this.pauseButtonBoxShadow = '0 0 10px, inset 0 0 50px rgba(163, 53, 253, 0.87)';
      }
    }
  },
  methods: {
    togglePlay() {
      if (!this.isPlaying) {
        this.$emit('startSeq');
        console.log('startSeq');
      }
    },
    togglePause() {
      if (this.isPlaying) {
        this.$emit('pauseSeq');
        console.log('pauseSeq');
      }
    }
  }
}
</script>

<style scoped>
.playpause-container {
  position: relative;
  top: 70%;
  left: 10%;
  width: 25%;
  height: 15%;
}

.circle {
  position: relative;
  display: inline-block;
  width: 50%;
  height: 200%;
}

.button-play,
.button-pause {
  width: 75%;
  height: 75%;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 10px, inset 0 0 50px rgba(0, 0, 0, 0.8);
  margin-right: 20px;
}

.button-play:active,
.button-pause:active {
  box-shadow: 0 0 10px, inset 0 0 50px rgba(163, 53, 253, 0.87);
}
</style>
