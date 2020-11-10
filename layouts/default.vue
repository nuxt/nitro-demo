<template>
  <div class="container">
    <div class="nav">
      <nLink to="/">Home</nLink>
      <nLink to="/about">About</nLink>
      <nLink to="/perf">Perf</nLink>
      <nLink to="/dynamic/1">Dynamic</nLink>
    </div>
    <nuxt class="main" />
    <client-only>
      <span class="text-muted">
        <template v-if="ssr">Server Side Rendered {{ diff }} ({{ generated }})</template>
        <template v-else>Client Side Rendered</template>
      </span>
    </client-only>
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
      t: 0,
      ssr: false,
      diff: 0
    }
  },
  mounted() {
    this._timer = setInterval(() => this.update(), 100)
    this.t = window.__NUXT__.renderedOn
    this.ssr =  window.__NUXT__.serverRendered
    this.$router.beforeEach((_from, _to, next) => {
      this.ssr = false
      clearInterval(this._timer)
      next()
    })
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
