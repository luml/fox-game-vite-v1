<template>
  <h1>{{ msg }}</h1>
  <button type="button" @click="count++">count up to: {{ count }}</button>
  <button type="button" @click="decreaseCount">count1 down to: {{ count1 }}</button>
  <button type="button" @click="increaseCount">count1 up to: {{ count1 }}</button>
  <!-- <button type="button" @click="handleNextTimeTick">Tick to: {{ nextTimeToTick }}</button> -->
  <div class="container">
    <div class="inner">
      <div class="game day"></div>
      <div class="fox hidden"></div>
      <div class="poop-bag hidden"></div>
      <div class="foreground-rain"></div>
      <div class="frame"></div>
      <div class="modal">
        <div class="modal-inner">Press the middle button to start</div>
      </div>
      <div class="buttons">
        <div class="btn left-btn"></div>
        <div class="btn middle-btn"></div>
        <div class="btn right-btn"></div>
      </div>
      <div class="icons">
        <div class="icon highlighted fish-icon"></div>
        <div class="icon poop-icon"></div>
        <div class="icon weather-icon"></div>
      </div>
    </div>
  </div>
  <input type="number" v-model="changeAmount" />
  <button @click="sumCountAmount">Add</button>
  <audio preload="auto" src="/static/audio.mp3"></audio>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { useCounter } from "../features/useCounter";
import gameState, { handleUserAction } from "./gameState";
import { TICK_RATE } from "./constants";
import initButtons from "./buttons";
export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup: () => {
    const nextTimeToTick = ref(0);
    // count, count1 are play data
    const count = ref(5);
    const { count1, decreaseCount, increaseCount } = useCounter();
    const changeAmount = ref(30);
    const sumCountAmount = () => {
      count.value += changeAmount.value;
    };
    return {
      count,
      count1,
      decreaseCount,
      increaseCount,
      nextTimeToTick,
      changeAmount,
      sumCountAmount
    };
  },
  created() {
    this.nextTimeToTick = Date.now();
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      console.log("starting game");
      initButtons(handleUserAction);
      requestAnimationFrame(this.nextAnimationFrame);
    },
    async nextAnimationFrame() {
      const now = Date.now();

      if (this.nextTimeToTick <= now) {
        gameState.tick();
        this.nextTimeToTick = now + TICK_RATE;
      }
      requestAnimationFrame(this.nextAnimationFrame);
    }
  }
});
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
button,
input {
  background: lightcyan;
  border-radius: 0.3rem;
  padding: 0.2rem 0.5rem;
  margin: 0 0.1rem;
  color: darkgreen;
  border: none;
}
button:first-of-type,
button:last-of-type,
input {
  background: lightcoral;
  color: floralwhite;
}
</style>
<style>
@import url("../assets/sprites.css");
@import url("../assets/style.css");
</style>
