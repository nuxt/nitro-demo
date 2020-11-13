<template>
  <aside class="sidebar">
    <div class="perf">
      <template v-if="ssr">
        <h3>Server Side Rendered</h3>
        <p>{{ diff }}</p>
        <p v-if="coldStart">
          Cold Start: <b>{{ coldStart }}</b>
        </p>
        <p v-if="generateTime">
          Generate Time: <b>{{ generateTime }}</b>
        </p>
        <p v-if="responseTime">
          Response Time: <b>{{ responseTime }} </b>
        </p>
      </template>
      <template v-else>
        <h3>Client Side Rendered</h3>
        <a href="" @click="reload">(Reload)</a>
      </template>
    </div>
    <div class="hostings">
      <ui-button href="https://nuxt-serverless.vercel.app" rel="noreferrer">Demo with Vercel</ui-button>
      <ui-button href="https://nuxt-serverless.netlify.app" rel="noreferrer">Demo with Netlify</ui-button>
      <ui-button href="https://serverless-demo.nuxt.workers.dev" rel="noreferrer">Demo with Cloudflare</ui-button>
      <ui-button href="https://nuxt.github.io/serverless-demo">Demo with GH Pages (SW)</ui-button>
    </div>
    <ui-button href="https://github.com/nuxt/serverless-demo" target="_blank" rel="noopener">
      Source Code on GitHub
    </ui-button>
  </aside>
</template>

<script>
import { timeAgo } from '~/utils'
import uiButton from '@/components/Button'

export default {
  components: {
    uiButton
  },
  data () {
    return {
      t: 0,
      ssr: false,
      diff: '',
      coldStart: '',
      responseTime: '',
      generateTime: ''
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
  }
}
</script>

<style>
.sidebar {
  width: 320px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #003C3C;
}

.sidebar h3 {
  color: #EFEFE6;
  margin: 0;
  margin-bottom: 8px;
  padding-top: 4px;
  padding-bottom: 16px;
  border-bottom: 1px dashed #EFEFE6;
}

.hostings {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
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
</style>