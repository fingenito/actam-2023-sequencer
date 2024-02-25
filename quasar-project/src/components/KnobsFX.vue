<template>
  <q-card class="my-card" flat bordered>
    <q-card-section horizontal>
      <q-badge :label="sectionLabel"/>
      <q-separator vertical/>
      <q-btn @click="console.log(this.row)">ON/OFF</q-btn>
    </q-card-section>
    <q-card-section>
      <div>
        <q-card-section horizontal>
          <q-badge class="q-mr-md q-mb-md">Pitch</q-badge>
          <q-badge class="q-ml-md q-mb-md">Phaser</q-badge>
        </q-card-section>

        <q-card-section horizontal>
          <!-- Pitch knob -->
          <q-knob
            show-value
            :min="0"
            :max="20"
            :step="1"
            font-size="12px"
            v-model="pitchValue"
            :thickness="0.22"
            color="blue"
            track-color="grey-3"
            class="q-mr-md q-mb-md"
            @update:model-value = "updateEffect"
          >
            {{ pitchValue }}
          </q-knob>

          <q-separator vertical/>

          <!-- Phaser knob -->
          <q-knob
            show-value
            font-size="12px"
            :min="0"
            :max="1"
            :step="0.01"
            v-model="phaserValue"
            :thickness="0.22"
            color="blue"
            track-color="grey-3"
            class="q-ml-md q-mb-md"
            @update:model-value = "updateEffect"

          >
            {{ phaserValue }}
          </q-knob>
        </q-card-section>

        <q-card-section horizontal>
          <q-badge class="q-mr-md q-mb-md">Delay</q-badge>
          <q-badge class="q-ml-md q-mb-md">Reverb</q-badge>
        </q-card-section>

        <q-card-section horizontal>
          <!-- Delay knob -->
          <q-knob
            show-value
            font-size="12px"
            v-model="delayValue"
            :thickness="0.22"
            :min="0"
            :max="1"
            :step="0.01"
            color="blue"
            track-color="grey-3"
            class="q-mr-md q-mb-md"
            @update:model-value = "updateEffect"

          >
            {{ delayValue }}
          </q-knob>

          <q-separator vertical/>

          <!-- Reverb knob -->
          <q-knob
            show-value
            font-size="12px"
            v-model="reverbValue"
            :thickness="0.22"
            :min="0"
            :max="1"
            :step="0.01"
            color="blue"
            track-color="grey-3"
            class="q-ml-md q-mb-md"
            @update:model-value = "updateEffect"

          >
            {{ reverbValue }}
          </q-knob>
        </q-card-section>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import SimpleButton from "components/SimpleButton.vue";
import {ref, watch} from "vue";
import * as Tone from "tone";
import Sequencer from "components/Sequencer";

export default {
  name: 'KnobSection',
  components: {SimpleButton},
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
  setup(props){
    const pitchValue = ref(0);
    const phaserValue = ref(0);
    const delayValue = ref(0);
    const reverbValue = ref(0);



    // Watches for change in pitch
    // watch(pitchValue, (newPitch) => {
    //   // console.log('pitch changed to', newPitch);
    //   Sequencer.pitchShifts[props.row].pitch = newPitch;
    // });

    // // Watches for change in phase
    // watch(phaserValue, (newPhase) => {
    //   // console.log('phase changed to', newPhase);
    //   Sequencer.phasers[props.row].wet.value = newPhase / 100;
    // });
    //
    // // Watches for change in delay
    // watch(delayValue, (newDelay) => {
    //   // console.log('delay changed to', newDelay);
    //   Sequencer.delays[props.row].wet.value = newDelay / 100;
    // });
    //
    // // Watches for change in reverb
    // watch(reverbValue, (newReverb) => {
    //   // console.log('reverb changed to', newReverb);
    //   Sequencer.reverbs[props.row].wet.value = newReverb / 100;
    // });

    return{
      pitchValue,
      phaserValue,
      delayValue,
      reverbValue
    }
  },
  methods : {
    updateEffect (){
      this.update(this.row,this.pitchValue,this.phaserValue,this.reverbValue,this.delayValue)
    }
  }
}


</script>

<style>

</style>
