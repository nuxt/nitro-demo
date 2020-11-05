<template>
  <div>
    <h1>Hello Nuxt</h1>
    <NLink v-if="i>0" :to="`./${i-1}`">
      Previous
    </NLink>
    Page {{ i }}
    <NLink v-if="i<10" :to="`./${i+1}`">
      Next
    </NLink>
    <hr />
    <span>Generated on {{ t }}</span>
  </div>
</template>

<script>
export default {
  asyncData() {
    return {
      t: new Date()
    }
  },
  computed: {
    i () {
      return parseInt(this.$route.params.i) || 0
    }
  }
}
</script>
