<template>
  <div class="slider-container">
    <div class="left-slider-wrapper">
      <q-slider
        v-model="volumevalue"
        :min="0"
        :max="100"
        color="grey-9"
        vertical
        reverse
        square
        class="slider"
      />
    </div>
    <div class="right-slider-wrapper">
      <q-slider
        v-model="standard1"
        :min="0"
        :max="100"
        color="grey-9"
        vertical
        reverse
        square
        class="slider"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Sliders-1',
  setup () {
    return {
      volumevalue: ref(50),
      standard1: ref(50)
    }
  }
}
</script>

<style>
.slider-container {
  position: relative;
  top: 15%;
  margin: 10px;
  display: flex;
  flex-direction: row;
}

.left-slider-wrapper,
.right-slider-wrapper {
  display: flex;
  justify-content: center;
  width: 40px;
  height: 140px;
}

.left-slider-wrapper {
  margin-right: 5px;
  margin-bottom: 10px;
}

.slider {
  height: 100%;
  border-radius: 20px;
  transform: translateY(0%);
}

</style>
