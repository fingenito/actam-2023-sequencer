<template>
  <div class="section1-container">
    <SimpleButton/>
  </div>
</template>

<script>
import SimpleButton from "components/SimpleButton.vue";

export default {
  name: 'Section-1',
  components: {SimpleButton}
}
</script>

<style scoped>
.section1-container {
  height: 100%;
  width: 32%;
  border-right: black 3px solid;
  border-radius: 0 10px 10px 0;
}
</style>
