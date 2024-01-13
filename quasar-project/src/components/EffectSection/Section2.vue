<template>
  <div class="section2-container">
    <SimpleButton/>
  </div>
</template>

<script>
import SimpleButton from "components/SimpleButton.vue";

export default {
  name: 'Section-2',
  components: {SimpleButton}
}
</script>

<style scoped>
.section2-container {
  height: 100%;
  width: 32%;
  border-right: black 3px solid;
  border-radius: 0 10px 10px 0; /* Questa riga imposta lati tondi a destra */

}
</style>
