<template>
  <div>
    <br>
    <div>
      Direct SSR calls makes fetch super fast!
      <br>
      <div><code>fetch('/api/hello')</code> {{ directTime }}ms</div>
      <div><code>fetch('{{ url }}')</code> {{ urlTime }}ms</div>
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

export default {
  async asyncData (ctx) {
    const [directTime] = await timer(fetch('/api/hello').then(r => r.text()))

    const url = 'https://nuxt-serverless.netlify.app/api/hello' // TODO
    const [urlTime] = await timer(fetch(url)).then(r => r.text())

    return {
      directTime,
      urlTime,
      url
    }
  }
}
</script>
