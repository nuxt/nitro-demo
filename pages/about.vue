<template>
  <div class="camping">
    <img src="~/assets/camping.svg" alt="Camping">
    <p>
      This website is deployed with <a href="https://github.com/nuxt/sigma" target="_blank" role="noopener">nuxt/sigma</a> and nuxt@2
    </p>
  </div>
</template>

<style>
.camping {
  max-width: 60%;
  margin: 0 auto;
  display: flex;
  margin-top: 120px;
}

.camping img {
  width: 60%;
}

.camping p {
  font-size: 24px;
  font-weight: 500;
}

.camping a {
  color: #00DC82;
}
</style>
