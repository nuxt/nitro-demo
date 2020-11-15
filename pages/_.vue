<template>
  <div class="quote">
    <div class="sentence">
      <h1>"{{ quote.quote }}"</h1>
      <p>{{ quote.author }}</p>
    </div>
    <img src="~/assets/drop_the_quote.svg" alt="Drop the quuote">
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

<style>
.quote {
  max-width: 60%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  margin-top: 120px;
}

.quote .sentence {
  width: 60%;
  padding-right: 32px;
}

.quote img {
  width: 40%;
}

.sentence p {
  text-align: right;
}
</style>
