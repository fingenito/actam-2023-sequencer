<template>
  <div class="sub-container">
    <div class="green-screen">
      {{`Kit: ${currentKit}`}}
    </div>
    <div class="selector-container">
      <div class="selector-up" @click="cycleForward"></div>
      <div class="selector-down" @click="cycleBackward"></div>
    </div>
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
      this.currentKitIndex = (this.currentKitIndex + 1) % this.kits.length
      this.$emit('kitChange', this.kits[this.currentKitIndex])
    },
    cycleBackward() {
      this.currentKitIndex = (this.currentKitIndex - 1 + this.kits.length) % this.kits.length
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
  top: 20%;
  width: 38%;
  height: 40%;
  right: 5%;
  position: relative;
  background-color: black;
}

.green-screen {
  font-family: 'DS-Digital', sans-serif;
  font-size: 100%;
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

.selector-container {
  position: absolute;
  bottom: 5%;
  left: 85%;
  width: 10%;
  height: 90%;
  flex-direction: column;
}

.selector-up, .selector-down {
  background-color: black;
  border-style: solid;
  cursor: pointer;
  border-radius: 5px;
  border-color: transparent transparent darkgray transparent;

}

.selector-up {
  border-width: 0 10px 20px 10px;
  margin-bottom: 10%;
}
.selector-down {
  border-width: 20px 10px 0 10px;
  top: 55%;
  left: 1%;
  border-color: darkgray transparent transparent transparent;
}
</style>


