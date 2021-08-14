<template>
  <Access msg="Hello Fox Game built on Vue 3 + TypeScript + Vite" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Access from './components/Access.vue'

export default defineComponent({
  name: 'App',
  components: {
    Access
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
