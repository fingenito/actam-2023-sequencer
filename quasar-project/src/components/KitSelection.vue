<template>
  <div class="sub-container">
    <div class="green-screen">
      {{`Kit: ${currentKit}`}}
    </div>
    <div class="selector-up" @click="cycleForward"></div>
    <div class="selector-down" @click="cycleBackward"></div>
  </div>
</template>

<script>
import Sequencer from "components/Sequencer";
import * as Tone from "tone";
export default {
  name: 'selectKit',
  data() {
    return {
      currentKitIndex: 0,
    }
  },
  props: {
    isPlaying: {
      type: Boolean
    },
    kits: {
      type: Array,
      required: true
    }
  },
  computed: {
    currentKit(){
      return this.kits[this.currentKitIndex]
    }
  },
  methods: {
    cycleForward() {
      if(this.isPlaying){
        this.$emit("stopLoop")
      }
      this.currentKitIndex = (this.currentKitIndex + 1) % this.kits.length
      // Sequencer.loadKit(this.kits[this.currentKitIndex])
      this.$emit('kitChange', this.kits[this.currentKitIndex])
    },
    cycleBackward() {
      if(this.isPlaying){
        this.$emit("stopLoop")
      }
      this.currentKitIndex = (this.currentKitIndex - 1 + this.kits.length) % this.kits.length
      // Sequencer.loadKit(this.kits[this.currentKitIndex])
      this.$emit('kitChange', this.kits[this.currentKitIndex])
    },
  }
}
</script>

<style scoped>
@font-face {
  font-family: 'DS-Digital';
  src: url('assets/fonts/ds_digital/DS-DIGIB.TTF') format('truetype')
}

.sub-container {
  width: 55%;
  height: 20%;
  display: flex;
  position: relative;
  top: 10%;
  left: 25%;
  background-color: black;
}

.green-screen {
  font-family: 'DS-Digital', sans-serif;
  font-size: 30px;
  color: black;
  text-align: left;
  position: relative;
  top: 7%;
  left: 7%;
  width: 75%;
  height: 85%;
  background-color: #008800;
  border-radius: 8px;
}

.selector-up, .selector-down {
  width: 0;
  height: 0;
  background-color: black;
  border-style: solid;

  cursor: pointer;
  border-radius: 5px;
}

.selector-up {
  border-width: 0 10px 20px 10px;
  position: relative;
  top: 10%;
  left: 10%;
  border-color: transparent transparent darkgray transparent;
}
.selector-down {
  border-width: 20px 10px 0 10px;
  position: relative;
  top: 55%;
  left: 1%;
  border-color: darkgray transparent transparent transparent;
}
</style>


