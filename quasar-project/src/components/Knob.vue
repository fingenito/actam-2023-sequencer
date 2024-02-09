<template>
  <div class="knob-container">
    <div class="knob">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Knob'
}
</script>

<style scoped>
.knob-container {
  display: flex;
  width: 80px;
  height: 80px;
  background-color: white;
  align-items: center;
  justify-content: center;
  position: relative;
}

.knob {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border-width: 2px;
}


</style>
