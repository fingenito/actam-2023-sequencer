<template>
  <div class="display-container">
    <div class="display-content">
      <label>{{displayText}}</label>
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
  width: 100%;
  height: 110%;
  background: linear-gradient(to bottom right, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.55) 100%), rgb(246, 246, 246);
  box-shadow: 4px 4px 4px #666;
}

.display-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'DS-Digital', sans-serif;
  font-size: 100%;
  position: relative;
}

.display-content label{
  color: #dcdcdc;

}
</style>




