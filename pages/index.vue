<template>
  <div>
    Hello Nuxt!
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
}
</script>
