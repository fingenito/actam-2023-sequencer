<template>
  <q-card class="card">
    <q-card-section>
<!--      {{beat}}-->
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
            <simple-button :row-index="rowIndex" class="q-ma-sm"></simple-button>
          </q-card-section>
        </q-card-section>

      </div>


    </q-card-section>



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
          <q-slider v-model="volume" :min="-40" :max="0" :step="4" style="width: 250px"/>
        </q-card-section>

      </q-card-section>
    </q-card>

    <q-card-section horizontal>
      <div v-for="(row, sectionIndex) in rows">
        <KnobSection :row="sectionIndex" :section-label="row.instrument" :update="updateEffects"/>
      </div>
    </q-card-section>

    <!-- Kit selection -->
<!--    <q-card-section horizontal>-->
<!--      <q-card-section>-->
<!--        <selectKit :is-playing="playing" @stopLoop="stop"/>-->
<!--      </q-card-section>-->

<!--      &lt;!&ndash; Subdivision selection &ndash;&gt;-->
<!--      <q-card-section>-->
<!--        <SubdivisionSelection @subdivisionChange="handleSubdivision"/>-->
<!--      </q-card-section>-->
<!--    </q-card-section>-->

    <!--    <CoolSlider></CoolSlider>-->
  </q-card>
</template>

<script>
import * as Tone from "tone";
import Sequencer from "components/Sequencer";
import {defineComponent, onMounted, reactive, ref, toRaw, watch} from "vue";
import Buttons1 from "components/Buttons.vue";
import PlayPauseButton from "components/PlayPauseButton.vue";
import Displays1 from "components/Displays.vue";
import Sliders1 from "components/Sliders.vue";
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
    selectKit, BPMSwing, SimpleButton, Sliders1, Displays1, PlayPauseButton, Buttons1, CoolSlider, Knob},

  setup(){
    const beat = ref(-1)
    const rows = reactive([]);
    const cols = ref(8)
    const bpm = ref(120);
    const playing = ref(false);
    const selectedNoteLength = ref('4');
    const swingValue = ref(0);
    const volume = ref(0);
    const sequencer = new Map();
    const kits = ['808', 'hiphop', '8bit'];
    const instruments = ['kick','hihat','snare', 'openhat', 'perc'];
    const selectedKit = ref("808");
    let currentPlayers;
    const [pitchShifts,delays, reverbs,phasers, gains] = Sequencer.configFX(instruments.length);


    kits.forEach((kit) =>{
      const players = new Tone.Players();
      instruments.forEach((instr, index) => {
        players.add(instr, "src/assets/samples/" + kit + "/" + instr + ".wav")
        players.player(instr).chain(pitchShifts[index], delays[index],reverbs[index],gains[index], Tone.Destination)
      })
      sequencer.set(kit, players); // maps kit to set of Tone.Player
    })


    const loop = new Tone.Loop((time) =>{
      currentPlayers = sequencer.get(selectedKit.value);
      console.log("currentPlayers: ",currentPlayers)// currentPlayers = players associated to selected kit
      beat.value = (beat.value + 1) % 8;

      toRaw(rows).forEach((row,index) => {
        // console.log("row", row )
        console.log("beat",beat.value)

        const instrument = currentPlayers.player(toRaw(row).instrument)
        const active = toRaw(row).buttons[beat.value].isActive
        console.log("active",active)
        if(active){
          instrument.start(time)
        }
      })



    },selectedNoteLength.value+'n');


    onMounted(()=>{
      Sequencer.initSequencer()
      Sequencer.getRows().forEach((row)=>{
        rows.push(row);
      })

      // console.log(rows)
    })

    // Updates BPM value if changed
    watch(bpm, (newBpm) => {
      // console.log('BPM changed to', newBpm);
      Tone.Transport.bpm.value = newBpm;
    });

    // Updates swing value if changed
    // watch(swingValue, (newSwing) => {
    //   // console.log('Swing changed to', newSwing);
    //   Tone.Transport.swing = newSwing;
    // });


    // Toggles button in position (row, col)
    const toggleButton = (row,col) =>{
      rows[row].buttons[col].isActive = !rows[row].buttons[col].isActive;
      // Sequencer.toggle(row,col,rows[row].buttons[col].isActive);
    }

    // Signals to start loop
    const play = () => {
      // console.log('play')
      // configLoop(bpm.value, selectedNoteLength.value, swingValue.value);
      playing.value = true;


      loop.start("8n")
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

    // Starts loop
    const configLoop = (bpm, selectedNoteLength, swingValue)=> {
      const repeat = async (time) => {
        console.log("Time", time)
        await createLoopAsync(time, beat.value); /* createLoopAsync should be changed back to sequencer.createloop if changes want to be averted */
        beat.value = (beat.value + 1) % 8;
      };
      Tone.Transport.bpm.value = bpm;
      Tone.Transport.swing = swingValue;
      Tone.Transport.scheduleRepeat(repeat, selectedNoteLength + "n");
      Tone.Transport.start()
    }

    const createLoopAsync = (time, beatValue) => {
      return new Promise((resolve, reject) => {
        Sequencer.createLoop(time, beatValue);
        resolve();
      });
    };

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
      volume,
      pitchShifts,
      delays,
      reverbs,
      phasers,
      gains
    }
  },
  methods: {
    handleSubdivision(newSubdivision) {
      this.selectedNoteLength = newSubdivision;
    },

    updateEffects(index,pitchValue,phaserValue,reverbValue,delayValue){
      this.pitchShifts[index].pitch = pitchValue;
      this.delays[index].wet.value = delayValue;
      this.phasers[index].wet.value = phaserValue;
      this.reverbs[index].wet.value = reverbValue;
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
