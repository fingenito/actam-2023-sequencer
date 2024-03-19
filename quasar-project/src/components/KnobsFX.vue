<template>
  <q-card class="my-card">
    <div class="title-container">
      <label>{{ sectionLabel }}</label>
    </div>

    <div>
      <ResetEffectButton @click="resetAll"
      />
    </div>

    <q-card-section class="knob-container">
      <div>
        <q-card-section horizontal>
          <label class="labels-left">PITCH</label>
          <label class="labels-right">PHASER</label>
        </q-card-section>

        <q-card-section horizontal>

          <!-- Pitch knob -->
          <Knob
            id="pitch"
            size="300%"
            show-value
            font-size="30%"
            :position="pitchValue"
            :thickness="0.22"
            :min="0"
            :max="10"
            :step="1"
            color="transparent"
            track-color="grey-3"
            class="knob-pitch"
            @updateValue="updateValue"
            @dblclick="updateValue(0,'pitch')"
          />


          <q-separator vertical/>

          <!-- Phaser knob -->
          <Knob
              id="phaser"
              size="300%"
              show-value
              font-size="30%"
              :position="phaserValue"
              :thickness="0.22"
              :min="0"
              :max="1"
              :step="0.01"
              color="transparent"
              track-color="grey-3"
              class="knob-phaser"
              @updateValue="updateValue"
              @dblclick="updateValue(0,'phaser')"
          />


        </q-card-section>

        <q-card-section horizontal>
          <label class="labels-left">DELAY</label>
          <label class="labels-right">REVERB</label>
        </q-card-section>

        <q-card-section horizontal>

          <!-- Delay knob -->
          <Knob
            id="delay"
            size="300%"
            show-value
            font-size="30%"
            :position="delayValue"
            :thickness="0.22"
            :min="0"
            :max="1"
            :step="0.01"
            color="transparent"
            track-color="grey-3"
            class="knob-delay"
            @updateValue="updateValue"
            @dblclick="updateValue(0,'delay')"
          />

          <q-separator vertical/>

          <!-- Reverb knob -->
          <Knob
            id="reverb"
            size="300%"
            show-value
            font-size="30%"
            :position="reverbValue"
            :thickness="0.22"
            :min="0"
            :max="1"
            :step="0.01"
            color="transparent"
            track-color="grey-3"
            class="knob-reverb"
            @updateValue="updateValue"
            @dblclick="updateValue(0,'reverb')"
          />

        </q-card-section>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import ResetEffectButton from "components/ResetEffectButton.vue";
import {ref} from "vue";
import Knob from "components/Knob.vue";
import * as Tone from "tone";
import Sequencer from "components/Sequencer";

export default {
  name: 'KnobSection',
  components: {ResetEffectButton, Knob},
  props:{
    row: Number,
    sectionLabel: String, // instrument which section is linked to
    pitchWet: {
      type: Number,
    },
    phaserWet: {
      type: Number
    },
    delayWet: {
      type: Number
    },
    reverbWet: {
      type: Number
    },
    update : {
      type : Function,
      required : true
    }
  },
  setup(){
    const pitchValue = ref(0);
    const phaserValue = ref(0);
    const delayValue = ref(0);
    const reverbValue = ref(0);

    // const resetKnobValue = (resetValue) => {
    //   switch (resetValue) {
    //     case 'pitchValue':
    //       pitchValue.value = 0;
    //       break;
    //     case 'phaserValue':
    //       phaserValue.value = 0;
    //       break;
    //     case 'delayValue':
    //       delayValue.value = 0;
    //       break;
    //     case 'reverbValue':
    //       reverbValue.value = 0;
    //       break;
    //   }
    // };

    return {
      pitchValue,
      phaserValue,
      delayValue,
      reverbValue
    }
  },
  methods : {
    updateValue(newValue, effectName){
      switch (effectName) {
        case 'pitch':
          this.pitchValue = newValue;
          break;
        case 'phaser':
          this.phaserValue = newValue;
          break;
        case 'delay':
          this.delayValue = newValue;
          break;
        case 'reverb':
          this.reverbValue = newValue;
          break;
      }
      this.update(this.row, this.pitchValue, this.phaserValue, this.reverbValue, this.delayValue);
    },
    resetAll(){
      this.pitchValue = 0;
      this.phaserValue = 0;
      this.delayValue = 0;
      this.reverbValue = 0;
      this.update(this.row, this.pitchValue, this.phaserValue, this.reverbValue, this.delayValue);
    }
  }
}


</script>

<style>

@import url('https://fonts.cdnfonts.com/css/stella-nova');

.my-card {
  width: 100%;
  height: 100%;
  background: transparent;
  display: flex;
}

.knob-container {
  position: relative;
  height: 100%;
  width: 100%;
}

.labels-left {
  font-size: 50%;
  color: black;
  margin-left: 11%;
  font-weight: bold;
}

.labels-right {
  font-size: 50%;
  color: black;
  margin-left: 45%;
  font-weight: bold;
}

.title-container {
  font-family: 'Stella Nova', sans-serif;
  font-size: 80%;
  width: 20%;
  display: flex;
  position: relative;
  writing-mode: vertical-lr;
  text-orientation: upright;
  align-items: center;
  justify-content: center;
}

.knob-phaser, .knob-reverb {
  margin-left: 10%;
}

.knob-pitch, .knob-delay {
  margin-right: 10%;
}
</style>
