<template>
  <div>
    <h1>
      "{{ quote.quote }}"
    </h1>
    <i>__{{ quote.author }}</i>
  </div>
</template>

<script>
const getQuotes = () => import('~/data/quotes' /* webpackChunkName: "quotes" */)
  .then(c => c.default || c)

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
