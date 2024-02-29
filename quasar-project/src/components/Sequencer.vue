<template>
  <q-card class="card">

    <q-card-section>
      <div class="row q-justify-between" v-for="(row,rowIndex) in rows" :key="row.id">
        <q-card-section horizontal>
          <!-- Row labels -->
          <div class="col flex justify-center">
            <Displays1 :displayText="row.instrument"/>
          </div>

          <!-- Sequencer buttons -->
          <div class="col flex justify-center" v-for="(button,colIndex) in row.buttons" :key="button.id" >
            <div>
              <Buttons1 class="q-ma-md" @click="toggleButton(rowIndex,colIndex)" :isPlaying="playing && colIndex === beat"></Buttons1>
            </div>
          </div>

          <!-- ON/OFF buttons -->
          <q-card-section>
            <simple-button :row-index="rowIndex" class="q-ma-sm" @turnOn="turnOn" @turnOff="turnOff"></simple-button>
          </q-card-section>
        </q-card-section>

      </div>
    </q-card-section>

    <!-- Play and pause buttons -->
    <q-card-section>
      <PlayPauseButton @startSeq = "play" @pauseSeq = "stop" :is-playing="playing"/>
    </q-card-section>


    <!-- Sliders -->
    <q-card class="my-card" flat bordered>
      <q-card-section horizontal>

        <!-- BPM slider -->
        <q-card-section>
          <q-badge>BPM</q-badge>
          <q-slider v-model="bpm" :min="30" :max="300" style="width: 250px"/>
        </q-card-section>

        <q-separator vertical />

        <!-- Swing slider -->
        <q-card-section>
          <q-badge>Swing</q-badge>
          <q-slider v-model="swingValue" :min="0" :max="1" :step="0.05" style="width: 250px"/>
        </q-card-section>

        <q-separator vertical />

        <!-- Volume slider -->
        <q-card-section>
          <q-badge>Volume</q-badge>
          <q-slider v-model="mainVolume.volume.value" :min="-40" :max="0" :step="4" style="width: 250px"/>
        </q-card-section>

      </q-card-section>
    </q-card>

    <!-- Effects section -->
    <q-card-section horizontal>
      <div v-for="(row, sectionIndex) in rows">
        <KnobSection :row="sectionIndex" :section-label="row.instrument" :update="updateEffects" @pitchZero="pitchZero"/>
      </div>
    </q-card-section>

    <!-- Kit selection -->
    <q-card-section horizontal>
      <q-card-section>
        <selectKit :is-playing="playing" @stopLoop="stop" :kits="kits" @kitChange="changeKit"/>
      </q-card-section>

      <!-- Subdivision selection -->
      <q-card-section>
        <SubdivisionSelection @subdivisionChange="changeSubdivision" :subdivisions="subdivisions"/>
      </q-card-section>
    </q-card-section>

  </q-card>
</template>

<script>
import * as Tone from "tone";
import Sequencer from "components/Sequencer";
import {defineComponent, onMounted, reactive, ref, toRaw, watch, watchEffect} from "vue";
import Buttons1 from "components/Buttons.vue";
import PlayPauseButton from "components/PlayPauseButton.vue";
import Displays1 from "components/Displays.vue";
import SimpleButton from "components/SimpleButton.vue";
import BPMSwing from "components/BPMSwing.vue";
import selectKit from "components/KitSelection.vue";
import SubdivisionSelection from "components/SubdivisionSelection.vue";
import CoolSlider from "components/CoolSlider.vue";
import Knob from "components/Knob.vue";
import KnobSection from "components/KnobsFX.vue";
export default defineComponent({
  name : 'SequencerComp',

  components: {
    KnobSection,
    SubdivisionSelection,
    selectKit, BPMSwing, SimpleButton, Displays1, PlayPauseButton, Buttons1, CoolSlider, Knob
  },

  setup(){
    const beat = ref(-1)
    const rows = reactive([]);
    const cols = ref(8)

    const playing = ref(false);

    const bpm = ref(120);
    const swingValue = ref(0);
    const mainVolume = new Tone.Volume(0);

    const sequencer = new Map();
    let currentPlayers;

    const kits = ['808', 'hiphop', '8bit'];
    const instruments = ['kick','hihat','snare', 'openhat', 'perc'];
    const subdivisions = ['4', '8', '16'];

    const selectedNoteLength = ref(subdivisions[0]);
    const selectedKit = ref(kits[0]);
    const [pitchShifts, delays, reverbs, phasers, gains] = Sequencer.configFX(instruments.length);


    // Creates set of players containing sounds for each kit
    kits.forEach((kit) =>{
      const players = new Tone.Players();
      instruments.forEach((instr, index) => {
        players.add(instr, "src/assets/samples/" + kit + "/" + instr + ".wav")
        players.player(instr).chain(pitchShifts[index], delays[index], reverbs[index], gains[index], mainVolume, Tone.Destination)
      })
      sequencer.set(kit, players); // maps kit to set of Tone.Player
    })

    // Loops through selected buttons
    const loop = new Tone.Loop((time) =>{
      currentPlayers = sequencer.get(selectedKit.value);
      // console.log("currentPlayers: ",currentPlayers)// currentPlayers = players associated to selected kit
      beat.value = (beat.value + 1) % 8;
      toRaw(rows).forEach((row) => {
        const instrument = currentPlayers.player(toRaw(row).instrument)
        const active = toRaw(row).buttons[beat.value].isActive
        if(active){
          instrument.start(time)
        }
      })
    },selectedNoteLength.value+'n');

    // Initializes sequencer
    onMounted(()=>{
      Sequencer.initSequencer()
      Sequencer.getRows().forEach((row)=>{
        rows.push(row);
      })
    });

    // Updates BPM value if changed
    watch(bpm, (newBpm) => {
      // console.log('BPM changed to', newBpm);
      Tone.Transport.bpm.value = newBpm;
    });

    // Updates swing value if changed --> NOT WORKING
    watch(swingValue, (newSwing) => {
      // Tone.Transport.swing = newSwing;
      Tone.Transport.set({ swing: newSwing });
      console.log('Swing changed to', Tone.Transport.swing);
    });



    // Updates loop interval in real-time
    watchEffect(() => {
      loop.interval = selectedNoteLength.value + 'n';
      console.log("Loop selectedNoteLength", selectedNoteLength.value);
    });

    // Toggles sequencer button in position (row, col)
    const toggleButton = (row,col) =>{
      rows[row].buttons[col].isActive = !rows[row].buttons[col].isActive;
    }

    // Plays pattern by calling loop function
    const play = () => {
      playing.value = true;
      loop.start("8n") // delayed by 8n to avoid time misalignment
      Tone.Transport.start()
    }

    // Stops loop
    const stop = () => {
      loop.stop();
      Tone.Transport.stop();
      Tone.Transport.cancel();
      playing.value = false;
      beat.value = -1;
    }

    return{
      beat,
      rows,
      cols,
      bpm,
      play,
      stop,
      playing,
      toggleButton,
      selectedNoteLength,
      swingValue,
      mainVolume,
      pitchShifts,
      delays,
      reverbs,
      phasers,
      gains,
      kits,
      subdivisions,
      selectedKit
    }
  },
  methods: {
    changeSubdivision(newSubdivision){
      this.selectedNoteLength = newSubdivision;
      // console.log("selectedNoteLength", this.selectedNoteLength);
    },
    changeKit(newKit){
      this.selectedKit = newKit;
      console.log("selectedKit", selectKit);
    },
    updateEffects(index, pitchValue, phaserValue, reverbValue, delayValue){
      this.pitchShifts[index].pitch = pitchValue;
      this.delays[index].wet.value = delayValue;
      this.phasers[index].wet.value = phaserValue;
      this.reverbs[index].wet.value = reverbValue;
    },
    turnOn(row){
      console.log("Turn on row", row)
      this.gains[row].gain.value = 1;
    },
    turnOff(row){
      console.log("Turn off row", row)
      this.gains[row].gain.value = 0;
    },
    pitchZero(row){
      let newPitch = 0;
      this.updateEffects(row, newPitch, this.delays[row].wet.value, this.phasers[row].wet.value, this.reverbs[row].wet.value)
      console.log("pitchZero row", row)
    }
  }
})

</script>

<style>

.card{
  width: 1000px;
  height: 1000px;
}

</style>
