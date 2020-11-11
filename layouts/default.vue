<template>
  <div class="container">
    <div class="nav">
      <nLink to="/">
        Home
      </nLink>
      <nLink to="/about">
        About
      </nLink>
      <nLink to="/dynamic/1">
        Dynamic
      </nLink>
      |
      <a href="https://github.com/nuxt/serverless-demo" target="_blank">Github</a>
    </div>
    <nuxt class="main" />
    <footer>
      <div class="nav">
        <a href="https://nuxt-serverless.vercel.app">Vercel</a>
        <a href="https://nuxt-serverless.netlify.app">Netlify</a>
        <a href="https://serverless-demo.nuxt.workers.dev">Cloudflare</a>
        <a href="https://nuxt.github.io/serverless-demo">Github Pages (Service Worker)</a>
        <a href="" @click="reload">(Reload)</a>
      </div>
      <client-only>
        <div class="perf">
          <template v-if="ssr">
            Server Side Rendered <b>{{ diff }}</b>
            <template v-if="coldStart">
              | Cold Start: <b>{{ coldStart }}</b>
            </template>
            <template v-if="generateTime">
              | Generate Time: <b>{{ generateTime }}</b>
            </template>
            <template v-if="responseTime">
              | Response Time:<b>{{ responseTime }} </b>
            </template>
          </template>
          <template v-else>
            Client Side Rendered
          </template>
          <br>
        </div>
      </client-only>
    </footer>
  </div>
</template>

<script>
import { timeAgo } from '~/utils'

export default {
  data () {
    return {
      t: 0,
      ssr: false,
      diff: '...',
      coldStart: '...',
      responseTime: '...',
      generateTime: '...'
    }
  },
  mounted () {
    this.t = window.__NUXT__.renderedOn
    this.ssr = window.__NUXT__.serverRendered

    this.update()
    this._timer = setInterval(() => this.update(), 1000)

    this.$router.beforeEach((_from, _to, next) => {
      this.ssr = false
      clearInterval(this._timer)
      next()
    })

    // eslint-disable-next-line no-console
    this.bench().catch(console.error)
  },
  methods: {
    update () {
      this.diff = timeAgo(this.t)
    },
    async bench () {
      const start = Date.now()

      const res = await fetch(location.href + '?' + Math.random())
      this.coldStart = res.headers.get('x-nuxt-coldstart') || ''
      this.generateTime = res.headers.get('x-nuxt-responsetime') || ''

      await res.text()
      this.responseTime = Date.now() - start + ' ms'
    },
    reload () {
      window.location.reload()
    }
  },
  head: {
    title: 'Nuxt Serverless Demo',
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  }
}
</script>

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
  margin: 10px;
  text-align: center;
}

.perf {
  color: greenyellow;
  text-align: center;
  border-top: dotted 1px white;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

<style>
body {
  margin: 0;
  background: #2f495e;
  color: white;
  font-family: Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
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
</style>
