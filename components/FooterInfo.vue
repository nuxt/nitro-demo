<template>
  <section class="section">
    <div class="container">
      <div class="info-footer">
        {{ footerText }}
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      item: (state) => state.player.item,
    }),
    footerText() {
      const year = new Date().getFullYear();
      return `Copyright Plan8 ${year}`;
    },
  },

  mounted() {},
  watch: {},
  beforeDestroy() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";

.info-footer {
  color: var(--primaryColor);
}
</style>
