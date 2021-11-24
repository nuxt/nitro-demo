<template>
  <div class="">
    <main>
      <nuxt class="page" />
    </main>
    <PlayerFooter :settings="{ isClient: true }" />
  </div>
</template>

<script>
export default {
  head: {
    title: "Nuxt nitro Demo",
    meta: [
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  },
  
};
</script>

<style lang="scss">

</style>
