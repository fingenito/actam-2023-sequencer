<template>
  <div class="screens-container">
    <div class="screen1">BPM: {{ bpmValue }}</div>
    <div class="screen2">SWING: {{ swingValue }}%</div>
  </div>
</template>

<script>
export default {
  name: 'BPMSwing',
  props: {
    bpmValue: null,
    swingValue: null
  }
}
</script>

<style scoped>
@font-face {
  font-family: 'DS-Digital';
  src: url('assets/fonts/ds_digital/DS-DIGI.TTF') format('truetype')
}
.screens-container {
  position: relative;
  top: 85%;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 23%;
}

.screen1, .screen2 {
  font-family: 'DS-Digital', sans-serif;
  font-size: 20px;
  width: 100%;
  height: 100%;
  background-color: black;
  color: white;
  text-align: center;
}

</style>
