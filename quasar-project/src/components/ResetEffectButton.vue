
<template>
  <button class="simple-button" @click="changeState"/>
  <div class="rst">RST</div>
</template>

<script>
import {ref} from "vue";

export default {
  name: 'ResetEffectButton',
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

<style scoped>
.simple-button {
  position: relative;
  height: 15%;
  border-radius: 8px;
  border: 2px solid #090909;
  background-image: linear-gradient(145deg, #171717, #6d6b6e);
  box-shadow: inset 1px 1px 0 #7d7c7e, inset -1px -1px 0 #1c1c1c;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  top: 77%;
}

.simple-button:active {
  box-shadow: inset 3px 3px 5px #7d7c7e, inset -3px -3px 5px #1c1c1c;
}

.rst {
  position: relative;
  align-items: center;
  justify-content: center;
  font-size: 0.6em;
  font-weight: bold;
  top: 75%;
}
</style>
