<template>
  <div class="page">
    <h1>
      "{{ quote.quote }}"
    </h1>
    <i>__{{ quote.author }}</i>
  </div>
</template>

<script>
// const getQuotes = () => import('~/data/quotes' /* webpackChunkName: "quotes" */).then(c => c.default || c)
const getQuotes = () => fetch('https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/fd9c289c2ee41a844cfbe99ba531aca3b483bf42/quotes.json').then(r => r.json())

export default {
  async asyncData () {
    const quotes = await getQuotes()

    return {
      // Select a random quote
      quote: quotes[Math.round(Math.random() * (quotes.length - 1))]
    }
  }
}
</script>

<style scoped>
.page {
  max-width: 60vw;
  margin: 0 auto;
}
</style>
