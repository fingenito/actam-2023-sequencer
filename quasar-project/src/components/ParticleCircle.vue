<template>
  <div>
    <canvas ref="visualizerCanvas" class="canvas"></canvas>
    <button @click="goToSeqPage" class='glowing-btn'><span class='glowing-txt'>S<span class='faulty-letter'>T</span>ART</span></button>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";

export default {
  name: 'ParticleCircle',
  props: {
    goToSeqPageHandler: Function,
  },
  setup(props) {
    const visualizerCanvas = ref(null);
    let cvs;
    let context;
    onMounted(() => {
      cvs = visualizerCanvas.value;
      context = cvs.getContext("2d");

      resizeHandler();
      window.onresize = resizeHandler;
      drawPoints();
    });

    let numDots = 17200,
      n = numDots,
      currDot,
      maxRad = 400,
      minRad = 200,
      radDiff = maxRad - minRad,
      dots = [],
      PI = Math.PI,
      centerPt = {x: 0, y: 0};


    while (n--) {
      currDot = {};
      currDot.radius = minRad + Math.random() * radDiff;
      currDot.ang = (1 - Math.random() * 1.5) * PI;
      currDot.speed = (1 - Math.random() * 3) * 0.005;
      currDot.intensity = Math.round(Math.random() * 255);
      currDot.fillColor = "rgb(" + currDot.intensity + "," + currDot.intensity + "," + currDot.intensity + ")";
      dots.push(currDot);
    }

    function drawPoints() {
      n = numDots;
      let _centerPt = centerPt,
        _context = context,
        dX = 0,
        dY = 0;

      _context.clearRect(0, 0, cvs.width, cvs.height);

      //draw dots
      while (n--) {
        currDot = dots[n];
        dX = _centerPt.x + Math.sin(currDot.ang) * currDot.radius;
        dY = _centerPt.y + Math.cos(currDot.ang) * currDot.radius;

        currDot.ang += currDot.speed;

        //console.log(currDot);
        _context.fillStyle = currDot.fillColor;
        _context.fillRect(dX, dY, 1, 1);

      } //draw dot
      window.requestAnimationFrame(drawPoints);
    }

    function resizeHandler() {
      const box = cvs.getBoundingClientRect();
      const w = box.width;
      const h = box.height;
      cvs.width = w;
      cvs.height = h;
      centerPt.x = Math.round(w / 2);
      centerPt.y = Math.round(h / 2);
    }

    function goToSeqPage() {
      props.goToSeqPageHandler();
    }
    return {
      visualizerCanvas,
      resizeHandler,
      drawPoints,
      goToSeqPage,

    }
  },

}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Raleway");

:root {
  --glow-color: hsl(273 98% 60%);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

//body,
//html {
//  margin: 0;
//  padding: 0;
//  width: 100%;
//  height: 100%;
//  overflow: hidden;
//}

//body {
//  min-height: 100vh;
//  display: flex;
//  justify-content: center;
//  align-items: center;
//  background: black;
//}

.canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #000000;
}


.glowing-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--glow-color);
  cursor: pointer;
  padding: 0.35em 1em;
  border: 0.15em solid var(--glow-color);
  border-radius: 0.45em;
  background: none;
  perspective: 2em;
  font-family: "Raleway", sans-serif;
  font-size: 1.5em;
  font-weight: 900;
  letter-spacing: 1em;

  -webkit-box-shadow: inset 0px 0px 0.5em 0px var(--glow-color),
  0px 0px 0.5em 0px var(--glow-color);
  -moz-box-shadow: inset 0px 0px 0.5em 0px var(--glow-color),
  0px 0px 0.5em 0px var(--glow-color);
  box-shadow: inset 0px 0px 0.5em 0px var(--glow-color),
  0px 0px 0.5em 0px var(--glow-color);
  animation: border-flicker 2s linear infinite;
}

.glowing-txt {
  float: left;
  margin-right: -0.8em;
  -webkit-text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3),
  0 0 0.45em var(--glow-color);
  -moz-text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3),
  0 0 0.45em var(--glow-color);
  text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em var(--glow-color);
  animation: text-flicker 3s linear infinite;
}

.faulty-letter {
  opacity: 0.5;
  animation: faulty-flicker 2s linear infinite;
}

.glowing-btn::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.7;
  filter: blur(1em);
  transform: translateY(120%) rotateX(95deg) scale(1, 0.35);
  background: var(--glow-color);
  pointer-events: none;
}

.glowing-btn::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  z-index: -1;
  background-color: var(--glow-color);
  box-shadow: 0 0 2em 0.2em var(--glow-color);
  transition: opacity 100ms linear;
}

.glowing-btn:hover {
  color: rgba(0, 0, 0, 0.8);
  text-shadow: none;
  animation: none;
}

.glowing-btn:hover .glowing-txt {
  animation: none;
}

.glowing-btn:hover .faulty-letter {
  animation: none;
  text-shadow: none;
  opacity: 1;
}

.glowing-btn:hover:before {
  filter: blur(1.5em);
  opacity: 1;
}

.glowing-btn:hover:after {
  opacity: 1;
}

@keyframes faulty-flicker {
  0% {
    opacity: 0.1;
  }
  2% {
    opacity: 0.1;
  }
  4% {
    opacity: 0.5;
  }
  19% {
    opacity: 0.5;
  }
  21% {
    opacity: 0.1;
  }
  23% {
    opacity: 1;
  }
  80% {
    opacity: 0.5;
  }
  83% {
    opacity: 0.4;
  }

  87% {
    opacity: 1;
  }
}

@keyframes text-flicker {
  0% {
    opacity: 0.1;
  }

  2% {
    opacity: 1;
  }

  8% {
    opacity: 0.1;
  }

  9% {
    opacity: 1;
  }

  12% {
    opacity: 0.1;
  }
  20% {
    opacity: 1;
  }
  25% {
    opacity: 0.3;
  }
  30% {
    opacity: 1;
  }

  70% {
    opacity: 0.7;
  }
  72% {
    opacity: 0.2;
  }

  77% {
    opacity: 0.9;
  }
  100% {
    opacity: 0.9;
  }
}

@keyframes border-flicker {
  0% {
    opacity: 0.1;
  }
  2% {
    opacity: 1;
  }
  4% {
    opacity: 0.1;
  }

  8% {
    opacity: 1;
  }
  70% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}

@media only screen and (max-width: 600px) {
  .glowing-btn{
    font-size: 1em;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>



