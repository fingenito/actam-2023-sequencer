<template>
  <button class="simple-button" @click="changeState">
    <div class="led" :class="{ 'led-on': isOn}"></div>
  </button>
</template>

<script>
import Sequencer from "components/Sequencer";
import {ref} from "vue";

export default {
  name: 'SimpleButton',
  data() {
    return {
      isOn: ref(true),
    };
  },
  props: {
    rowIndex: {
      type: Number
    }
  },
  methods: {
    changeState() {
      this.isOn = !this.isOn;
      if(this.isOn) {
        this.$emit('turnOn', this.rowIndex);
      }else{
        this.$emit('turnOff', this.rowIndex);
      }
      console.log("Toggled row", this.rowIndex);
    }
  }
}
</script>

<style>
.simple-button {
  position: relative;
  left: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  border-radius: 8px;
  border: 2px solid #090909;
  background-color: transparent;
  background-image: linear-gradient(145deg, #171717, #6d6b6e);
  box-shadow: inset 1px 1px 0 #7d7c7e, inset -1px -1px 0 #1c1c1c;
  cursor: pointer;
  margin-left: 5px;
  transition: box-shadow 0.3s ease; /* Aggiunto il trasferimento per un effetto più fluido */
}

.simple-button:active {
  box-shadow: inset 3px 3px 5px #7d7c7e, inset -3px -3px 5px #1c1c1c;
}

.led {
  position: relative;
  left: 85%;
  bottom: 10%;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: darkred;
}

.led-on {
  background-color: red;
}

</style>
