<template>
  <div class="slider-container">
    <div class="left-slider-wrapper">
      <q-slider
        v-model="bpmValue"
        :min="30"
        :max="300"
        color="grey-9"
        vertical
        reverse
        square
        class="slider"
      />
    </div>

    <div class="right-slider-wrapper">
      <q-slider
        v-model="swingValue"
        :min="0"
        :max="1"
        :step="0.05"
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
  props: {
    bpmValue: null,
    swingValue: null
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
