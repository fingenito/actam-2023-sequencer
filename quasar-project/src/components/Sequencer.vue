<template>
  <q-card class="card">
    <q-card-section>
      {{beat}}
      <div class="row q-justify-between" v-for="(row,rowIndex) in rows" :key="row.id">

        <!-- Row labels -->
        <div class="col-1 flex justify-center">
          <Displays1 :displayText="row.instrument"/>
        </div>

        <!-- Sequencer buttons -->
        <div class="col-1 flex justify-center" v-for="(button,colIndex) in row.buttons" :key="button.id" >
          <div>
            <Buttons1 class="q-ma-md" @click="toggleButton(rowIndex,colIndex)" :isPlaying="playing && colIndex === beat"></Buttons1>
          </div>
        </div>

        <!-- ON/OFF test -->
        <q-card-section>
          <simple-button :row-index="rowIndex"></simple-button>
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
          <q-slider v-model="volume" :min="-100" :max="0" :step="4" style="width: 250px"/>
        </q-card-section>

      </q-card-section>
    </q-card>


<!-- Knobs -->
<!--    <q-card-section horizontal class="q-mt-lg">-->
<!--      <div>-->
<!--        <q-card-section horizontal>-->
<!--          <q-knob class="q-mr-md q-mb-md"/>-->
<!--          <q-separator vertical/>-->
<!--          <q-knob class="q-ml-md"/>-->
<!--        </q-card-section>-->

<!--        <q-card-section horizontal class="q-mr-20px">-->
<!--          <q-knob class="q-mr-md q-mb-md"/>-->
<!--          <q-separator vertical/>-->
<!--          <q-knob class="q-ml-md"/>-->
<!--        </q-card-section>-->
<!--      </div>-->
<!--    </q-card-section>-->
    <q-card-section horizontal>
      <div v-for="(row, sectionIndex) in rows">
        <KnobSection :row="sectionIndex" :section-label="row.instrument"/>
      </div>
    </q-card-section>



<!--    <CoolSlider></CoolSlider>-->

<!--    <Knob></Knob>-->


    <!-- Kit selection -->
<!--    <q-card-section>-->
<!--      <selectKit :is-playing="playing" @stopLoop="stop"/>-->
<!--    </q-card-section>-->

    <!-- Subdivision selection -->
<!--    <q-card-section>-->
<!--      <SubdivisionSelection @subdivisionChange="handleSubdivision"/>-->
<!--    </q-card-section>-->
  </q-card>
</template>

<script>
import * as Tone from "tone";
import Sequencer from "components/Sequencer";
import {defineComponent, onMounted, reactive, ref, watch} from "vue";
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
    const beat = ref(0)
    const rows = reactive([]);
    const cols = ref(8)
    const bpm = ref(120);
    const playing = ref(false);
    const selectedNoteLength = ref('4');
    const swingValue = ref(0);
    const gain = ref(1);
    const volume = ref(0);

    onMounted(()=>{
      Sequencer.initSequencer()
      Sequencer.getRows().forEach((row)=>{
        rows.push(row);
      })

      console.log(rows)
    })

    // Updates BPM value if changed
    watch(bpm, (newBpm) => {
      console.log('BPM changed to', newBpm);
      Tone.Transport.bpm.value = newBpm;
    });

    // Updates swing value if changed
    watch(swingValue, (newSwing) => {
      console.log('Swing changed to', newSwing);
      Tone.Transport.swing = newSwing;
    });

    // Updates gain value if changed


    // Updates volume value if changed
        // Toggles button in position (row, col)
    const toggleButton = (row,col) =>{
      rows[row].buttons[col].isActive = !rows[row].buttons[col].isActive;
      Sequencer.toggle(row,col,rows[row].buttons[col].isActive);
    }

    const toggleRow = (row) => {
      // if(row.isOn):
      //   row gain to 0
      // else:
      //   row gain to default value
    }

    // Signals to start loop
    const play = () => {
      console.log('play')
      configLoop(bpm.value, selectedNoteLength.value, swingValue.value);
      playing.value = true;
    }

    // Stops loop
    const stop = () => {
      Tone.Transport.stop();
      Tone.Transport.cancel();
      playing.value = false;
      beat.value = 0;
    }

    // Starts loop
    const configLoop = (bpm, selectedNoteLength, swingValue)=> {
      const repeat = async (time) => {
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
      gain,
      volume
    }
  },
  methods: {
    handleSubdivision(newSubdivision) {
      this.selectedNoteLength = newSubdivision;
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
