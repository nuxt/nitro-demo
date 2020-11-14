<template>
  <div>
    <br>
    <code v-text="res" />
    <div>Request to api took {{ time }} ms</div>
    <hr>
    This page is using <code>fetch('/api/hello')</code> (Yes it works unversally!)
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
  async asyncData () {
    const [time, res] = await timer(fetch('/api/hello').then(r => r.text()))
    return { time, res }
  }
}
</script>
