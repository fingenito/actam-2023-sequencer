<template>
  <div>
    <ParticleCircle :goToSeqPageHandler="goToSeqPage" v-if="showParticle"  />
    <SequencerPage
    :showSeqPage="showSeqPage"
    :showSeqPageHandler="goToParticle"
    v-else/>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import SequencerPage from "components/SequencerPage.vue";
import ParticleCircle from 'components/ParticleCircle.vue'

export default defineComponent({
  name: 'IndexPage',
  components: {ParticleCircle, SequencerPage},
  data() {
    return {
      showParticle: true,
      showSeqPage: false,
    }
  },
  methods: {
    goToSeqPage() {
      this.showParticle = false
      this.showSeqPage = true
    },
    goToParticle() {
      this.showParticle = true
      this.showSeqPage = false
    }
  }
})
</script>



