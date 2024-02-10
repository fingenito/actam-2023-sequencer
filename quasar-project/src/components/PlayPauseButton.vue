<template>
  <div class="playpause-container">
    <button class="button-play" @click="togglePlay" :style="{ boxShadow: playButtonBoxShadow }">▶</button>
    <button class="button-pause" @click="togglePause" :style="{ boxShadow: pauseButtonBoxShadow }">❚❚</button>
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
  bottom: 5%;
  left: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 165px;
  height: 35px;
}

.button-play,
.button-pause {
  width: 35px;
  height: 35px;
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
