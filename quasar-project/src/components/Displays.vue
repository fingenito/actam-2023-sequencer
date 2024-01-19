<template>
  <div class="display-container q-mt-md">
    <div class="display-content">
      <p>{{displayText}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Displays-1',
  props: {
    displayText: String
  }
};
</script>

<style scoped>
@font-face {
  font-family: 'DS-Digital';
  src: url('assets/fonts/ds_digital/DS-DIGI.TTF') format('truetype')
}
.display-container {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(255, 255, 255, 0.51);
  width: 120px;
  height: 50px;
  background: linear-gradient(to bottom right, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.55) 100%), rgb(246, 246, 246);
  align-content: center;
}

.display-content {
  padding: 16px;
  font-family: 'DS-Digital', sans-serif;
  text-align: center;
  font-size: 16px;
}
.display-content p{
  color: #dcdcdc;
}
</style>




