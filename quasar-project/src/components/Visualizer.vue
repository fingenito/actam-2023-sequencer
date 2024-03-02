<template>
  <div class="visualizer-container">
    <div v-for="i in NBR_OF_BARS" :key="i" class="visualizer-container__bar" :style="{ height: `${barHeights[i]}px` }"></div>
  </div>
</template>

<script>
import * as Tone from 'tone';
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  setup() {
    const NBR_OF_BARS = 50;
    const barHeights = ref(new Array(NBR_OF_BARS).fill(4));

    const ctx = ref(null);
    const analyzer = ref(null);

    const initAudioContext = () => {
      if (!ctx.value) {
        ctx.value = new AudioContext();
        analyzer.value = ctx.value.createAnalyser();
        Tone.Destination.connect(analyzer.value);
      }
    };

    const renderFrame = () => {
      if (ctx.value && analyzer.value) {
        const frequencyData = new Uint8Array(analyzer.value.frequencyBinCount);
        analyzer.value.getByteFrequencyData(frequencyData);

        for (let i = 0; i < NBR_OF_BARS; i++) {
          const index = (i + 10) * 2;
          const fd = frequencyData[index];
          const barHeight = Math.max(4, fd || 0);
          barHeights.value[i] = barHeight;
        }

        window.requestAnimationFrame(renderFrame);
      }
    };

    onMounted(() => {
      initAudioContext();
      renderFrame();
    });

    onBeforeUnmount(() => {
      if (ctx.value && analyzer.value) {
        Tone.Destination.disconnect(analyzer.value);
      }
    });

    return {
      NBR_OF_BARS,
      barHeights,
    };
  },
};
</script>

<style scoped>
.visualizer-container {
  position: absolute;
  bottom: 450px;
  right: 0;
  left: 0;
  text-align: center;
}

.visualizer-container__bar {
  display: inline-block;
  background: white;
  margin: 0 2px;
  width: 25px;
}
</style>
