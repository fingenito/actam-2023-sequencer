<template>
  <div class="button-container">
<!--    'active' should indicate looper index position while playing-->
    <button @click="toggleLed" :class="{ 'drum_pad': true, 'playing': isPlaying }">
      <div :class="{ 'led-on': led_status, 'led-off': !led_status }"></div>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Buttons-1',
  props: {
    isPlaying: Boolean
  },
  data() {
    return {
      led_status: false
    };
  },
  methods: {
    toggleLed() {
      this.led_status = !this.led_status;
    }
  }
};
</script>

<style>
.button-container {
  position: relative;
  left: 50%;
  display: flex;
  flex-direction: row;
}

.drum_pad {
  position: relative;
  top: 20%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  background-color: black;
  transition: box-shadow 0.3s ease, background-color 0.3s ease; /* Aggiunto il trasferimento per un effetto più fluido */
}

.drum_pad.playing {
  box-shadow: 0 0 10px rgb(255, 0, 128); /* Ombra persistente quando attivo */
}

.drum_pad:active {
  box-shadow: inset 3px 3px 5px #000, inset -3px -3px 5px #737373; /* Cambiato lo stile durante il clic */
}

.led-on, .led-off {
  position: relative;
  bottom: 30%;
  left: 35%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.led-on {
  background-color: red;
}

.led-off {
  background-color: darkred;
}
</style>




