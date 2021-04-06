<template>
  <div>
    <br>
    <div>
      Direct SSR calls makes fetch super fast!
      <br>
      <div><code>$fetch('/api/hello')</code> {{ directTime }}ms</div>
      <div>
        <code>$fetch('{{ url }}')</code> {{ urlTime }}ms
      </div>
    </div>
  </div>
</template>

<script>
async function timer (promise) {
  const start = Date.now()
  const res = await promise
  const end = Date.now()
  const time = end - start
  return [time, res]
}

const ORIGINS = {
  vercel: 'https://nitro-demo.vercel.app',
  browser: 'https://nuxt.github.io/nitro-demo',
  netlify: 'https://nitro-demo.netlify.app',
  cloudflare: 'https://nitro-demo.netlify.app',
  azure_functions: 'https://nuxt-sigma.azurewebsites.net',
  azure: 'https://nitro-azure-demo.nuxtjs.org',
  default: process.client ? '' : (process.dev ? 'http://localhost:3000' : 'https://nitro-demo.netlify.app')
}

export default {
  async asyncData (ctx) {
    const origin = ORIGINS[process.env.NITRO_PRESET] ?? ORIGINS.default
    const path = '/api/hello'

    const [directTime] = await timer($fetch(path))

    const url = origin + path
    const [urlTime] = await timer($fetch(url))

    return {
      directTime,
      urlTime,
      url
    }
  }
}
</script>
