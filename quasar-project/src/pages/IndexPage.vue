<template>
  <q-page>
    <div class="q-pa-md">
      <div v-if="!started">
        <div class="center-container">
          <q-btn label="start" @click="start"></q-btn>
        </div>
      </div>
      <div v-else>
        <sequencer-comp></sequencer-comp>
      </div>
    </div>

  </q-page>
</template>

<script>
import {defineComponent, ref} from 'vue'
import SequencerComp from "components/Sequencer.vue";
import * as Tone from "tone";
import ParticleCircle from "components/ParticleCircle.vue";
export default defineComponent({
  name: 'IndexPage',
  components: {
    ParticleCircle,
    SequencerComp
  },
  setup() {
    const started = ref(false)

    const start = () =>{
      Tone.start().then(() => {
        started.value = true
        console.log('started')
      })
    }
    return {
      started,
      start
    }
  }
})
</script>

<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Ensure the container takes the full height of the viewport */
}
</style>
