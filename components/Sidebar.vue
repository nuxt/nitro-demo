<template>
  <aside class="sidebar">
    <h1><span>N</span>uxt + <span>N</span>itro<sup><small>{{ $config.nitroVersion }}</small></sup></h1>
    <div class="perf">
      <template v-if="ssr">
        <h3>✔️ Server Side Rendered</h3>
        <p>🕒 {{ diff }}</p>
        <h3> 🚀 Metrics</h3>
        <p v-for="(metric, index) in metrics" :key="index">
          {{ metric.name }}:
          <b>{{ metric.duration }} ms</b>
        </p>
      </template>
      <template v-else>
        <h3>⚠️ Client Side Rendered</h3>
        <a href="" class="white-button" @click="reload">Reload</a>
      </template>
    </div>
    <div class="hostings">
      <h4>This demo is deployed on:</h4>
      <ui-button href="https://nitro-demo.vercel.app" rel="noreferrer">
        Vercel
      </ui-button>
      <ui-button href="https://nitro-demo.netlify.app" rel="noreferrer">
        Netlify
      </ui-button>
      <ui-button href="https://nitro-demo.nuxt.workers.dev" rel="noreferrer">
        Cloudflare
      </ui-button>
      <ui-button href="https://nuxt.github.io/nitro-demo">
        GH Pages (SW)
      </ui-button>
      <ui-button href="https://nuxt-sigma.azurewebsites.net" rel="noreferrer">
        Azure Functions
      </ui-button>
      <ui-button href="https://nitro-azure-demo.nuxtjs.org" rel="noreferrer">
        Azure SWA
      </ui-button>
    </div>
  </aside>
</template>

<script>
import uiButton from '@/components/Button'
import { timeAgo } from '~/utils'

export default {
  components: {
    uiButton
  },
  data () {
    return {
      t: process.server ? 0 : window.__NUXT__.renderedOn,
      ssr: process.server || window.__NUXT__.serverRendered,
      diff: '',
      metrics: []
    }
  },
  mounted () {
    this.update()
    this._timer = setInterval(() => this.update(), 1000)

    this.$router.beforeEach((_from, _to, next) => {
      this.ssr = false
      clearInterval(this._timer)
      next()
    })

    const nav = globalThis.performance.getEntriesByType('navigation')[0]
    for (const entry of nav.serverTiming || []) {
      this.metrics.push({
        name: decodeURIComponent(entry.description || entry.name),
        duration: entry.duration
      })
    }
    this.metrics.push({
      name: 'TTFB (client)',
      duration: nav.responseStart
    })
  },
  methods: {
    update () {
      this.diff = timeAgo(this.t)
    },
    reload () {
      window.location.reload()
    }
  }
}
</script>

<style>
.sidebar {
  color: #EFEFE6;
  width: 320px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #003C3C;
}

.sidebar h1 {
  margin: 12px 0;
}

.sidebar h1 span {
  color: #00DC82;
}

.sidebar h3 {
  color: #EFEFE6;
  margin: 0;
  margin-bottom: 8px;
  padding-top: 4px;
  padding-bottom: 16px;
  border-bottom: 1px dashed #EFEFE6;
}

.hostings a {
  margin-bottom: 12px;
}

.perf {
  font-family: monospace;
  padding: 20px 16px;
  color: #00DC82;
  background-color: #032A2A;
  border-radius: 8px;
}
.perf p {
  margin: 0;
  padding-top: 8px;
  padding-bottom: 4px;
}

.white-button {
 border: 1px solid #fff;
 color: #fff;
 padding: 8px 24px;
 text-decoration: none;
 margin-top: 16px;
 display: inline-block;
}

.white-button:hover {
  color: #00DC82;
  border-color: #00DC82;
}
</style>
