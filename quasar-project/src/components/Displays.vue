<template>
  <div class="display-container">
<!--    <div class="display-content">-->
      <slot></slot>
<!--    </div>-->
  </div>
</template>

<script>
export default {
  name: 'Displays-1',
};
</script>

<style scoped>
.display-container {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(255, 255, 255, 0.51);
  margin-top: 30px;
  margin-left: 16px;
  width: 120px; /* Lungo lato */
  height: 50px; /* Corto lato */
  background: linear-gradient(to bottom right, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.55) 100%), rgb(246, 246, 246);
  align-content: center;
}

.display-content {
  padding: 16px;
}
</style>




