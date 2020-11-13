<template>
  <aside class="sidebar">
    <h1><span>N</span>uxt <span>S</span>erverless</h1>
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
        <a href="" @click="reload" class="white-button">Reload</a>
      </template>
    </div>
    <div class="hostings">
      <h4>This demo is deployed on:</h4>
      <ui-button href="https://nuxt-serverless.vercel.app" rel="noreferrer">Vercel</ui-button>
      <ui-button href="https://nuxt-serverless.netlify.app" rel="noreferrer">Netlify</ui-button>
      <ui-button href="https://serverless-demo.nuxt.workers.dev" rel="noreferrer">Cloudflare</ui-button>
      <ui-button href="https://nuxt.github.io/serverless-demo">GH Pages (SW)</ui-button>
    </div>
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