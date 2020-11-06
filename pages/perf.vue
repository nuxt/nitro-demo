<template>
  <div>
    <h2>Cold Start: {{ this.coldstart }}</h2>
    <h2>Response Time: {{ this.responsetime }}</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coldstart: '...',
      responsetime: '...'
    }
  },
  async mounted() {
    const res = await fetch(location.href + '?' + Math.random())
    this.coldstart = res.headers.get('x-nuxt-coldstart') || '??'
    this.responsetime = res.headers.get('x-nuxt-responsetime') || '??'
  }
}
</script>
