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

        <!--          <div>-->
        <!--            <q-btn class="q-ma-md" @click="toggleRow(rowIndex)">-->
        <!--              ON/OFF-->
        <!--            </q-btn>-->
        <!--&lt;!&ndash;            <simple-button></simple-button>&ndash;&gt;-->
        <!--          </div>-->

      </div>

    </q-card-section>

    <!-- Screen showing BPM and swing values -->
    <BPMSwing
      :bpm-value="bpm"
      :swing-value="Math.floor(swingValue * 100)"
    />


    <!-- Play button -->
    <q-card-section>
      <PlayPauseButton @startSeq = "play" @pauseSeq = "stop" :is-playing="playing"/>
    </q-card-section>

    <!-- BPM slider -->
    <q-card-section >
      <q-slider v-model="bpm" :min="30" :max="300" style="width: 250px"/>
    </q-card-section>


    <!-- Swing slider -->
    <q-card-section >
      <q-slider v-model="swingValue" :min="0" :max="1" :step="0.05" style="width: 250px"/>
    </q-card-section>

    <CoolSlider></CoolSlider>

    <Knob></Knob>

    <!-- Sliders for swing and bpm modulation -->
    <!--<Sliders1 :swing-value="swingValue" :bpm-value="bpm"/>-->

    <!-- Kit selection -->
    <q-card-section>
      <selectKit :is-playing="playing" @stopLoop="stop"/>
    </q-card-section>

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
export default defineComponent({
  name : 'SequencerComp',
  components: {
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


    onMounted(()=>{
      Sequencer.initSequencer()
      Sequencer.getRows().forEach((row)=>{
        rows.push(row);
      })

      console.log(rows)
    })

    watch(bpm, (newBpm) => {
      console.log('BPM changed to', newBpm);
      if (playing.value) {
        Tone.Transport.bpm.value = newBpm;
      }
    });

    watch(swingValue, (newSwing) => {
      console.log('Swing changed to', newSwing);
      if (playing.value) {
        Tone.Transport.swing = newSwing;
      }
    });


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

    const play = () => {
      console.log('play')
      configLoop(bpm.value, selectedNoteLength.value, swingValue.value);
      playing.value = true;
    }

    const stop = () => {
      Tone.Transport.stop();
      Tone.Transport.cancel();
      playing.value = false;
      beat.value = 0;
    }

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
      swingValue
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
  height: 600px;
}
.selected-note-length {
  background-color: #42a5f5;
  color: white;
}
</style>
