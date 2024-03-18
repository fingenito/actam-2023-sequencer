<template>
  <div class="slider">
    <div class="slider-track">
      <input class="slider-input" type="range" value="78">
      <div class="slider-thumb">
        <div class="slider-thumb-side"></div>
        <div class="slider-thumb-middle"></div>
        <div class="slider-thumb-side"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestSlider',
  props: {
    minValue: {
      type: Number,
      default: 0
    },
    maxValue: {
      type: Number,
      default: 100
    }
  },
  mounted() {
    const sliders = document.querySelectorAll('.slider');

    sliders.forEach(slider => {
      const sliderInput = slider.querySelector('.slider-input');

      const minValue = +sliderInput.min || 0;
      const maxValue = +sliderInput.max || 100;

      const updateSlider = () => {
        slider.style.setProperty('--slider-value', 100 * +sliderInput.value / (maxValue - minValue));
      }

      sliderInput.addEventListener('input', () => {
        updateSlider();
      });

      updateSlider();
    });
  }
}
</script>

<style scoped>
.slider {
  --slider-height: 9px;
  --slider-value: 0;
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 3.125em;
  width: 250px;
  height: 40px;
}

.slider:nth-child(1) {
  --slider-color: #c52828;
}


.slider-track {
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 3em;
  height: var(--slider-height);
  width: calc(100%);
  background-color: #262626;
  background-blend-mode: overlay, normal;
  box-shadow: inset 0 .0625em .125em rgb(0 0 0 / .4), 0 1px 1px rgba(255, 255, 255, 0.15);
}

.slider-input {
  -webkit-appearance: none;
  appearance: none;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  border-radius: inherit;
  width: calc(100% + .875em);
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.slider-input::-webkit-slider-thumb,
.slider-input::-moz-range-thumb {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  padding: .5em;
  width: 1.25em;
  height: 1.25em;
}

.slider-thumb {
  display: flex;
  position: absolute;
  left: calc(var(--slider-value) / 100 * (100% - var(--slider-height)) + var(--slider-height) / 2);
  border-radius: .0625em;
  width: 2em;
  height: 2.5em;
  transform: translateX(-50%);
  box-shadow: 0 0 .25em .0625em rgb(0 0 0 / .2), 0 .25em .25em rgb(0 0 0 / .3);
  overflow: hidden;
}

.slider-thumb-side {
  flex-grow: 37;
  height: 100%;
}

.slider-thumb-side:first-child {
  background-image: linear-gradient(to right, #252427 45%, #383836 55%);
  box-shadow: inset .03125em 0 0 .03125em rgb(0 0 0 / .3);
}

.slider-thumb-side:last-child {
  background-image: linear-gradient(to right, #383836 45%, #252427 55%);
  box-shadow: inset -.03125em 0 0 .03125em rgb(0 0 0 / .3);
}

.slider-thumb-middle {
  flex-grow: 20;
  height: 100%;
  background-color: red;
  box-shadow: inset 0 .0625em .03125em rgb(0 0 0 / .5),
  inset 0 -.0625em .03125em rgb(0 0 0 / .5),
  inset .0625em 0 .03125em rgb(0 0 0 / .5),
  inset -.0625em 0 .03125em rgb(0 0 0 / .5);
}

</style>

