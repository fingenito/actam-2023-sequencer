<template>
  <q-card class="my-card">
    <div class="title-container">
      <label>{{ sectionLabel }}</label>
    </div>
    <q-card-section class="knob-container">
      <div>
        <q-card-section horizontal>
          <label class="labels-left">PITCH</label>
          <label class="labels-right">PHASER</label>
        </q-card-section>

        <q-card-section horizontal>
          <!-- Pitch knob -->
<!--          <q-knob
            size="300%"
            show-value
            :min="0"
            :max="20"
            :step="1"
            font-size="30%"
            v-model="pitchValue"
            :thickness="0.22"
            color="blue"
            track-color="grey-3"
            class="q-mr-md q-mb-md"
            @update:model-value = "updateEffect"
            @dblclick="resetKnobValue('pitchValue')"
          >
          </q-knob>-->

<!--          <Knob-->
<!--            id="pitch"-->
<!--            size="300%"-->
<!--            show-value-->
<!--            :min="0"-->
<!--            :max="20"-->
<!--            :step="1"-->
<!--            font-size="30%"-->
<!--            v-model="pitchValue"-->
<!--            :thickness="0.22"-->
<!--            color="transparent"-->
<!--            track-color="grey-3"-->
<!--            class="q-mr-md q-mb-md"-->
<!--            @update:model-value = "updateEffect"-->
<!--            @dblclick="resetKnobValue('pitchValue')"-->
<!--          />-->
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
            class="q-ml-md q-mb-md"
            @updateValue="updateValue"
            @dblclick="updateValue(0,'pitch')"
          />


          <q-separator vertical/>

          <!-- Phaser knob -->
<!--          <q-knob
            size="300%"
            show-value
            font-size="30%"
            :min="0"
            :max="1"
            :step="0.01"
            v-model="phaserValue"
            :thickness="0.22"
            color="blue"
            track-color="grey-3"
            class="q-ml-md q-mb-md"
            @update:model-value = "updateEffect"
            @dblclick="resetKnobValue('phaserValue')"
          >
            {{ phaserValue }}
          </q-knob>-->

<!--          <Knob-->
<!--            id="phaser"-->
<!--            size="300%"-->
<!--            show-value-->
<!--            font-size="30%"-->
<!--            :min="0"-->
<!--            :max="1"-->
<!--            :step="0.01"-->
<!--            v-model="phaserValue"-->
<!--            :thickness="0.22"-->
<!--            color="transparent"-->
<!--            track-color="grey-3"-->
<!--            class="q-ml-md q-mb-md"-->
<!--            @update:model-value = "updateEffect"-->
<!--            @dblclick="resetKnobValue('phaserValue')"-->
<!--          />-->
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
            class="q-ml-md q-mb-md"
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
<!--          <q-knob
            size="300%"
            show-value
            font-size="30%"
            v-model="delayValue"
            :thickness="0.22"
            :min="0"
            :max="1"
            :step="0.01"
            color="blue"
            track-color="grey-3"
            class="q-mr-md q-mb-md"
            @update:model-value = "updateEffect"
            @dblclick="resetKnobValue('delayValue')"
          >
            {{ delayValue }}
          </q-knob>-->

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
            class="q-ml-md q-mb-md"
            @updateValue="updateValue"
            @dblclick="updateValue(0,'delay')"
          />

          <q-separator vertical/>

          <!-- Reverb knob -->
<!--          <q-knob
            size="300%"
            show-value
            font-size="30%"
            v-model="reverbValue"
            :thickness="0.22"
            :min="0"
            :max="1"
            :step="0.01"
            color="blue"
            track-color="grey-3"
            class="q-ml-md q-mb-md"
            @update:model-value = "updateEffect"
            @dblclick="resetKnobValue('reverbValue')"
          >
            {{ reverbValue }}
          </q-knob>-->
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
            class="q-ml-md q-mb-md"
            @updateValue="updateValue"
            @dblclick="updateValue(0,'reverb')"
          />

        </q-card-section>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import SimpleButton from "components/SimpleButton.vue";
import {ref} from "vue";


import * as Tone from "tone";
import Sequencer from "components/Sequencer";
import Knob from "components/Knob.vue";

export default {
  name: 'KnobSection',
  components: {Knob, SimpleButton},
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
    // resetKnobValue(resetValue){
    //   console.log("Reset");
    //   this[resetValue] = 0;
    //   this.updateEffect();
    //   console.log("Updated")
    // },
    // resetKnobValue(resetValue){
    //   switch (resetValue) {
    //     case 'pitchValue':
    //       this.pitchValue.value = 0;
    //       break;
    //     case 'phaserValue':
    //       this.phaserValue.value = 0;
    //       break;
    //     case 'delayValue':
    //       this.delayValue.value = 0;
    //       break;
    //     case 'reverbValue':
    //       this.reverbValue.value = 0;
    //       break;
    //   }
    //   this.update(this.row, this.pitchValue, this.phaserValue, this.reverbValue, this.delayValue);
    // },
    updateEffect (){
      // Uses updateEffects function from the Sequencer component
      this.update(this.row, this.pitchValue, this.phaserValue, this.reverbValue, this.delayValue)
    },
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
  display: flex;
  height: 100%;
  width: 80%;
}

.labels-left {
  font-size: 50%;
  color: black;
  margin-left: 9%;
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


</style>
