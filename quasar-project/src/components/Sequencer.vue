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
        <PlayPauseButton
          @startSeq = "play"
          @pauseSeq = "pause"
        />
      </q-card-section>

      <!-- BPM slider -->
      <q-card-section >
        <q-slider v-model="bpm" :min="30" :max="300" style="width: 250px"/>
      </q-card-section>

      <!-- Swing slider -->
      <q-card-section >
        <q-slider v-model="swingValue" :min="0" :max="1" :step="0.05" style="width: 250px"/>
      </q-card-section>

<!--      <Sliders1 :swing-value="swingValue" :bpm-value="bpm"/>-->
      <Subdivision1></Subdivision1>
      <!-- Subdivision selection -->
      <q-card-section>
        <q-badge class="q-mr-lg" color="secondary">
          Subdivision
        </q-badge>
        <q-btn-group push>
          <q-btn :class="{ 'selected-note-length': selectedNoteLength === '4' }" push label="1/4" @click="selectedNoteLength = '4'" />
          <q-btn :class="{ 'selected-note-length': selectedNoteLength === '8' }" push label="1/8" @click="selectedNoteLength = '8'" />
          <q-btn :class="{ 'selected-note-length': selectedNoteLength === '16' }" push label="1/16" @click="selectedNoteLength = '16'" />
        </q-btn-group>
      </q-card-section>
    </q-card>
</template>

<script>
import * as Tone from "tone";
import Sequencer from "components/Sequencer";
import {defineComponent, onMounted, reactive, ref, watch} from "vue";
import Buttons1 from "components/Buttons.vue";
import PlayPauseButton from "components/PlayPauseButton.vue";
import Displays1 from "components/Displays.vue";
import Knob1 from "components/Knobs.vue";
import Sliders1 from "components/Sliders.vue";
import SimpleButton from "components/SimpleButton.vue";
import BPMSwing from "components/BPMSwing.vue";
import Subdivision1 from "components/KitSelection.vue";
export default defineComponent({
  name : 'SequencerComp',
  components: {Subdivision1, BPMSwing, SimpleButton, Sliders1, Knob1, Displays1, PlayPauseButton, Buttons1},
  setup(){
    const beat = ref(0)
    const rows = reactive([]);
    const cols = ref(8)
    const bpm = ref(120);
    let playing = ref(false);
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

    const pause = () => {
      Tone.Transport.stop();
      Tone.Transport.cancel()
      playing.value = false;
      beat.value = 0;
    }

    const configLoop = (bpm, selectedNoteLength, swingValue)=> {
      const repeat = (time) => {
        Sequencer.createLoop(time, beat.value)
        beat.value = (beat.value + 1) % 8;
      };

      Tone.Transport.bpm.value = bpm;
      Tone.Transport.swing = swingValue;
      Tone.Transport.scheduleRepeat(repeat, selectedNoteLength + "n");
      Tone.Transport.start()
    };
    return{
      beat,
      rows,
      cols,
      bpm,
      play,
      pause,
      playing,
      toggleButton,
      selectedNoteLength,
      swingValue
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
