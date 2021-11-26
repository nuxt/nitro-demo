<template>
  <section class="section top">
    <div class="container top-header">
      <div class="is-size-3 title">{{ project.name }}</div>
      <div class="logo">
        <svg
          width="34"
          height="56"
          viewBox="0 0 34 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="4.53882"
            y="20.749"
            width="23.9911"
            height="14.265"
            fill="#1B785E"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M28.5913 27.8771C25.575 31.0933 21.2891 33.1022 16.5344 33.1022C11.7797 33.1022 7.49381 31.0933 4.47751 27.8771C7.49381 24.661 11.7797 22.652 16.5344 22.652C21.2891 22.652 25.575 24.661 28.5913 27.8771ZM28.5913 27.8771C31.368 24.9164 33.0688 20.9326 33.0688 16.5511C33.0688 7.41019 25.6661 0 16.5344 0C7.40271 0 0 7.41019 0 16.5511C0 20.9326 1.70078 24.9164 4.47751 27.8771C1.70078 30.8379 0 34.8217 0 39.2031C0 48.3441 7.40271 55.7543 16.5344 55.7543C25.6661 55.7543 33.0688 48.3441 33.0688 39.2031C33.0688 34.8217 31.368 30.8379 28.5913 27.8771Z"
            fill="#00B683"
          />
        </svg>
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
      project: (state) => state.project,
    }),
  },

  mounted() {},
  watch: {},
  beforeDestroy() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";

.top-header {
  display: flex;
  justify-content: space-between;
  

  .logo {
      svg {
          path {
              fill: var(--primaryColor);
          }
          rect {
              fill: var(--primaryColorDarker);
          }
      }
  }
}
</style>
