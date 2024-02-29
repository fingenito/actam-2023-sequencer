<template>
  <q-page>
    <div class="q-pa-md">
      <div v-if="!started">
        <q-btn label="start" @click="start"></q-btn>
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
export default defineComponent({
  name: 'IndexPage',
  components: {
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
