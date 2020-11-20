<template>
  <div>
    <p>
      This GraphQL Server is powered by Nuxt, <a role="noopener" target="_blank" href="https://www.apollographql.com/docs/apollo-server/">apollo-server-express</a>
      and {{ sigmaPreset }}
    </p>
    <iframe src="/api/graphql" />
  </div>
</template>

<style scoped>
iframe {
  border: 0;
  align-self: stretch;
  flex: 1;
}
</style>

<script>
export default {
  computed: {
    sigmaPreset () {
      return process.env.SIGMA_PRESET || 'sigma'
    }
  }
}
</script>
