<template>
  <div class="sub-container">
    <div class="green-screen" for="number">{{`sub: ${number}`}}</div>
    <div class="selector-up" @click="increment"></div>
    <div class="selector-down" @click="decrement"></div>
  </div>
</template>

<script>
export default {
  name: 'Subdivision-1',
  data() {
    return {
      number: 1,
    }
  },
  methods: {
    increment() {
      if (this.number < 4) {
        this.number++
      }
    },
    decrement() {
      if (this.number > 1) {
        this.number--
      }
    },
  }
}
</script>

<style scoped>
@font-face {
  font-family: 'DS-Digital';
  src: url('assets/fonts/ds_digital/DS-DIGIB.TTF') format('truetype')
}

.sub-container {
  width: 55%;
  height: 20%;
  display: flex;
  position: relative;
  top: 10%;
  left: 25%;
  background-color: black;
}

.green-screen {
  font-family: 'DS-Digital', sans-serif;
  font-size: 30px;
  color: black;
  text-align: left;
  position: relative;
  top: 7%;
  left: 7%;
  width: 75%;
  height: 85%;
  background-color: #008800;
  border-radius: 8px;
}

.selector-up, .selector-down {
  width: 0;
  height: 0;
  background-color: black;
  border-style: solid;

  cursor: pointer;
  border-radius: 5px;
}

.selector-up {
  border-width: 0 10px 20px 10px;
  position: relative;
  top: 10%;
  left: 10%;
  border-color: transparent transparent darkgray transparent;
}
.selector-down {
  border-width: 20px 10px 0 10px;
  position: relative;
  top: 55%;
  left: 1%;
  border-color: darkgray transparent transparent transparent;
}
</style>


