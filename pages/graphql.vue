<template>
  <div>
    <p>
      This GraphQL Server is powered by Nuxt, <a role="noopener" target="_blank" href="https://www.apollographql.com/docs/apollo-server/">apollo-server-express</a>
      and {{ nitroPreset }}
    </p>
    <iframe src="/api/graphql" />
  </div>
</template>

<script>
export default {
  computed: {
    nitroPreset () {
      return process.env.NITRO_PRESET || 'nitro'
    }
  }
}
</script>

<style scoped>
iframe {
  border: 0;
  align-self: stretch;
  flex: 1;
}
</style>
