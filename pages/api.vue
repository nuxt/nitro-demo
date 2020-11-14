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
  const start = new Date()
  const res = await promise
  return [new Date() - start, res]
}

export default {
  async asyncData () {
    const [time, res] = await timer(fetch('http://localhost:3000/api/hello').then(r => r.text()))
    return { time, res }
  }
}
</script>
