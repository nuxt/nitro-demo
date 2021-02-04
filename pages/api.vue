<template>
  <div>
    <br>
    <div>
      Direct SSR calls makes fetch super fast!
      <br>
      <div><code>$fetch('/api/hello')</code> {{ directTime }}ms</div>
      <div><code>$fetch('{{ url }}')</code> {{ urlTime }}ms</div>
    </div>
  </div>
</template>

<script>
async function timer (promise) {
  const start = global.process.hrtime()
  const res = await promise
  const end = global.process.hrtime(start)
  const time = ((end[0] * 1e9) + end[1]) / 1e6
  return [time, res]
}

const ORIGINS = {
  vercel: 'https://nitro-demo.vercel.app',
  browser: 'https://nuxt.github.io/nitro-demo',
  netlify: 'https://nitro-demo.netlify.app',
  cloudflare: 'https://nitro-demo.netlify.app',
  azure: 'https://nuxt-nitro.azurewebsites.net',
  default: process.client ? '' : 'https://nitro-demo.netlify.app'
}

export default {
  async asyncData (ctx) {
    const origin = ORIGINS[process.env.NITRO_PRESET] ?? ORIGINS.default
    const path = '/api/hello'

    const [directTime] = await timer($fetch(path).then(r => r.text()))

    const url = origin + path
    const [urlTime] = await timer($fetch(url).then(r => r.text()))

    return {
      directTime,
      urlTime,
      url
    }
  }
}
</script>
