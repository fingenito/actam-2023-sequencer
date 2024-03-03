<template>
  <!-- Impostazione flavio -->
  <div class="page-container">

    <div class="left">
      <div class="topleft-container">
        <BPMSwing/>
      </div>

      <div class="bottomleft-container">
        <div class="Selectors"> <!-- messo il div al posto della q-card per grafica -->

            <!-- Kit selection -->
            <selectKit :is-playing="playing" @stopLoop="stop" :kits="kits" @kitChange="changeKit"/>

            <!-- Subdivision selection -->
            <SubdivisionSelection @subdivisionChange="changeSubdivision" :subdivisions="subdivisions"/>
        </div>

        <div class="Controls">
            <!-- BPM slider -->
            BPM
            <q-slider class="BPMSlider" vertical v-model="bpm" :min="30" :max="300" :reverse="true"/>
            <!-- Swing slider -->
            Swing
            <q-slider class="SwingSlider" vertical v-model="swingValue" :min="0" :max="1" :step="0.05" :reverse="true"/>
            <!-- Volume slider -->
            Volume
            <q-slider class="VolumeSlider" vertical v-model="mainVolume.volume.value" :min="-40" :max="0" :step="4" :reverse="true"/>

            <!-- Play/pause buttons -->
            <PlayPauseButton/>
        </div>

      </div>
    </div>

    <div class="right">
      <div class="topright-container">
          <div class="row q-justify-between" v-for="(row,rowIndex) in rows" :key="row.id">

            <!-- Row labels -->
            <div class="buttonRow">
              <div class="col flex justify-center">
                <Displays1 :displayText="row.instrument"/>
              </div>

              <!-- Sequencer buttons -->
              <div class="col flex justify-center" v-for="(button,colIndex) in row.buttons" :key="button.id" >
                <div>
                  <Buttons1 class="q-ma-md" @click="toggleButton(rowIndex,colIndex)" :isPlaying="playing && colIndex === beat"></Buttons1>
                </div>
              </div>
            </div>
            <!-- ON/OFF buttons -->
            <simple-button :row-index="rowIndex" class="q-ma-sm" @turnOn="turnOn" @turnOff="turnOff"></simple-button>
          </div>
      </div>
      <div class="bottomright-container">
        <!-- Effects section -->
        <div v-for="(row, sectionIndex) in rows">
          <KnobSection :row="sectionIndex" :section-label="row.instrument" :update="updateEffects" @pitchZero="pitchZero"/>
        </div>
      </div>
    </div>

  <!-- Impostazione nico -->
<!--  <div>-->
<!--    <q-card class="card">-->
<!--      <q-card-section>-->
<!--        <div class="row q-justify-between" v-for="(row,rowIndex) in rows" :key="row.id">-->
<!--          <q-card-section horizontal>-->
<!--            &lt;!&ndash; Row labels &ndash;&gt;-->
<!--            <div class="col flex justify-center">-->
<!--              <Displays1 :displayText="row.instrument"/>-->
<!--            </div>-->

<!--            &lt;!&ndash; Sequencer buttons &ndash;&gt;-->
<!--            <div class="col flex justify-center" v-for="(button,colIndex) in row.buttons" :key="button.id" >-->
<!--              <div>-->
<!--                <Buttons1 class="q-ma-md" @click="toggleButton(rowIndex,colIndex)" :isPlaying="playing && colIndex === beat"></Buttons1>-->
<!--              </div>-->
<!--            </div>-->

<!--            &lt;!&ndash; ON/OFF buttons &ndash;&gt;-->
<!--            <q-card-section>-->
<!--              <simple-button :row-index="rowIndex" class="q-ma-sm" @turnOn="turnOn" @turnOff="turnOff"></simple-button>-->
<!--            </q-card-section>-->
<!--          </q-card-section>-->

<!--        </div>-->
<!--      </q-card-section>-->

<!--&lt;!&ndash;       Play and pause buttons&ndash;&gt;-->
<!--      <q-card-section>-->
<!--        <PlayPauseButton @startSeq = "play" @pauseSeq = "stop" :is-playing="playing"/>-->
<!--      </q-card-section>-->


<!--&lt;!&ndash;       Sliders&ndash;&gt;-->
<!--      <q-card class="my-card" flat bordered>-->
<!--        <q-card-section horizontal>-->

<!--          &lt;!&ndash; BPM slider &ndash;&gt;-->
<!--          <q-card-section>-->
<!--            <q-badge>BPM</q-badge>-->
<!--            <q-slider v-model="bpm" :min="30" :max="300" style="width: 250px"/>-->
<!--          </q-card-section>-->

<!--          <q-separator vertical />-->

<!--          &lt;!&ndash; Swing slider &ndash;&gt;-->
<!--          <q-card-section>-->
<!--            <q-badge>Swing</q-badge>-->
<!--            <q-slider v-model="swingValue" :min="0" :max="1" :step="0.05" style="width: 250px"/>-->
<!--          </q-card-section>-->

<!--          <q-separator vertical />-->

<!--          &lt;!&ndash; Volume slider &ndash;&gt;-->
<!--          <q-card-section>-->
<!--            <q-badge>Volume</q-badge>-->
<!--            <q-slider v-model="mainVolume.volume.value" :min="-40" :max="0" :step="4" style="width: 250px"/>-->
<!--          </q-card-section>-->

<!--        </q-card-section>-->
<!--      </q-card>-->

<!--&lt;!&ndash;       Effects section&ndash;&gt;-->
<!--      <q-card-section horizontal>-->
<!--        <div v-for="(row, sectionIndex) in rows">-->
<!--          <KnobSection :row="sectionIndex" :section-label="row.instrument" :update="updateEffects" @pitchZero="pitchZero"/>-->
<!--        </div>-->
<!--      </q-card-section>-->

<!--      &lt;!&ndash; Kit selection &ndash;&gt;-->
<!--      <q-card-section horizontal>-->

<!--        <q-card-section>-->
<!--          <selectKit :is-playing="playing" @stopLoop="stop" :kits="kits" @kitChange="changeKit"/>-->
<!--        </q-card-section>-->

<!--        &lt;!&ndash; Subdivision selection &ndash;&gt;-->
<!--        <q-card-section>-->
<!--          <SubdivisionSelection @subdivisionChange="changeSubdivision" :subdivisions="subdivisions"/>-->
<!--        </q-card-section>-->
<!--      </q-card-section>-->
<!--    </q-card>-->
<!--  </div>-->
  </div>
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
import Subdivision from "components/KitSelection.vue";
import Section2 from "components/EffectSection/Section2.vue";
import Section1 from "components/EffectSection/Section1.vue";
import Section3 from "components/EffectSection/Section3.vue";
import Section4 from "components/EffectSection/Section4.vue";
import Buttons from "components/Buttons.vue";
import Section5 from "components/EffectSection/Section5.vue";
import Displays from "components/Displays.vue";
import {Analyser} from "tone";
// import Visualizer from "components/Visualizer.vue";
export default defineComponent({
  name : 'SequencerComp',

  components: {
    // Visualizer,
    Displays, Section5, Buttons, Section4, Section3, Section1, Section2,
    Subdivision,
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
        players.player(instr).chain(pitchShifts[index], phasers[index], delays[index], reverbs[index], gains[index], mainVolume, Tone.Destination)
      })
      sequencer.set(kit, players); // maps kit to set of Tone.Player
    });

    // Loops through selected buttons;
    const loop = new Tone.Loop((time) =>{
      currentPlayers = sequencer.get(selectedKit.value);
      // currentPlayers = players associated to selected kit
      beat.value = (beat.value + 1) % 8;
      toRaw(rows).forEach((row) => {
        const instrument = currentPlayers.player(toRaw(row).instrument)
        const active = toRaw(row).buttons[beat.value].isActive
        if(active){
          instrument.start(time);
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
      selectedKit,
      currentPlayers
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
body {
  background-color: #8aff92;
  padding: 0;
}

.page-container {
  margin: 3%;
  width: 90%;
  background: lightgray;
  border-radius: 50px;
  padding: 2%; /* Regola la dimensione del margine sfumato interno */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8), inset 0 0 50px rgba(80, 80, 80, 50);
  height: 88vh;
}

.left {
  height: 100%;
  width: 35%;
  float: left;
  flex-direction: column;
}
.topleft-container {
  height: 45%;
  width: 100%;
  border-radius: 10% 0 0 10%;
  background-color: #000000;
  overflow: hidden;
  flex-direction: column;
}
.bottomleft-container {
  height: 55%;
  width: 100%;
  flex-direction: row;
}

.right {
  height: 100%;
  width: 65%;
  float: right;
  flex-direction: column;
}
.topright-container {
  height: 70%;
  width: 100%;
  overflow: hidden;
  float: right;
  flex-direction: row;
  display: flex;
}
.bottomright-container {
  height: 30%;
  width: 100%;
  flex-direction: row;
  display: flex;
  overflow: hidden;
}

.BPMSlider, .SwingSlider, .VolumeSlider{
  height: 90%;
  top: 5%;
  left: 5%;
  padding: 0;
  position: relative;
}

.Selectors {
  height: 30%;
  width: 100%;
  display: flex;
  justify-content: center;
}

.Controls {
  height: 65%;
  width: 100%;
  display: flex;
  flex-direction: row;
}

</style>
