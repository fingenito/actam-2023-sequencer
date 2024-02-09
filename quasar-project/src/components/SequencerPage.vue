<template>
  <div class="page-container" v-if="showSeqPage">
    <div class="left">
      <div class="topleft-container">
        <BPMSwing/>
      </div>
      <div class="bottomleft-container">
        <Subdivision/>
        <Sliders/>
        <PlayPauseButton/>
      </div>
    </div>
    <div class="right">
      <div class="topright-container">
        <Displays/>
        <Buttons/>
      </div>
      <div class="bottomright-container">
        <Section1/>
        <Section2/>
        <Section3/>
        <Section4/>
        <Section5/>
      </div>
    </div>
  </div>
</template>

<script>
import Subdivision from 'components/KitSelection.vue';
import Buttons from 'components/Buttons.vue';
import Displays from "components/Displays.vue";
import Sliders from "components/Sliders.vue";
import PlayPauseButton from "components/PlayPauseButton.vue";
import BPMSwing from "components/BPMSwing.vue";
import Section1 from "components/EffectSection/Section1.vue";
import Section2 from "components/EffectSection/Section2.vue";
import Section3 from "components/EffectSection/Section3.vue";
import Section4 from "components/EffectSection/Section4.vue";
import Section5 from "components/EffectSection/Section5.vue";




export default {
  name: 'SequencerPage',
  components: {PlayPauseButton, Sliders, Displays, Buttons, Subdivision, BPMSwing, Section1, Section2, Section3, Section4, Section5},
    props: {
      showSeqPage: Boolean,
      showSeqPageHandler: Function,
    },
    watch: {
      showSeqPage: function (newValue) {
        if (newValue) {
          this.showSeqPageHandler(newValue)
        }
      }
    }
    }
</script>

<style>
body {
  background-color: white;
  padding: 0;
  overflow: hidden;
  height: 100vh; /* Rende l'elemento alto quanto l'intero viewport */
}

.page-container {
  margin: 40px;
  background: lightgray;
  border-radius: 40px;
  padding: 10px; /* Regola la dimensione del margine sfumato interno */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8), inset 0 0 50px rgba(80, 80, 80, 50);
  height: 88vh;
  display: inline-list-item;
  flex-direction: column-reverse;
}

.left {
  height: 100%;
  width: 35%;
  float: left;
  display: flex;
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
  overflow: hidden;
}


.right {
  height: 100%;
  width: 65%;
  float: right;
  display: flex;
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


</style>

