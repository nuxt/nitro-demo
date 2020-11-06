<template>
  <div class="container">
    <div class="nav">
      <nLink to="/">Home</nLink>
      <nLink to="/about">About</nLink>
      <nLink to="/perf">Perf</nLink>
      <nLink to="/dynamic/1">Dynamic</nLink>
    </div>
    <nuxt class="main" />
    <span class="text-muted">Generated {{ diff }} ({{ generated }})</span>
  </div>
</template>

<script>
import { format } from 'timeago.js'

export default {
  head: {
    title: 'Nuxt Serverless Demo',
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },
  data() {
    return {
      t: new Date(),
      diff: 0
    }
  },
  mounted() {
    this._timer = setInterval(() => this.update(), 100)
  },
  beforeDestroy() {
    clearInterval(this._timer)
  },
  computed: {
    generated() {
      return this.t.toUTCString()
    }
  },
  methods: {
    update() {
      const now = new Date()
      const diff = now - this.t
      this.diff = diff < 10000 ? `${diff/1000} seconds ago` : format(this.t)
    }
  }
}
</script>

<style>
body {
  margin: 0;
  background: #2f495e;
  color: white;
  font-family: Quicksand,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.1s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}

a {
  color: white;
}

.text-muted {
  color: grey;
}
</style>

<style scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;

  min-height: 90vh;
  height: 90vh;
  justify-content: center;
}

.nav a {
  padding: 10px;
}

.nav {
  margin-top: 10px;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
