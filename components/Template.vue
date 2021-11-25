<template>
  <div></div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
     
    };
  },
  computed: {
    ...mapState({
      item: (state) => state.player.item,
     
    }),
    
    
  },

  mounted() {},
  watch: {},
  beforeDestroy() {},
  methods: {
    
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";

</style>
