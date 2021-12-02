<template>
  <div class="">
    <main>
      <nuxt class="page" />
    </main>
    <FooterInfo />
    <PlayerFooter :settings="{ isClient: true }" />
  </div>
</template>

<script>
import { mapState } from "vuex";



export default {
  head() {
    return {
      title: "Nuxt nitro Demo",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],

      htmlAttrs: {
        class: this.currentTheme,
      },
    };
  },
  computed: {
    ...mapState({
      theme: state => state.project.settings.theme
    }),

  

    currentTheme(){
      switch (this.theme) {
        case 0:
          return ''
          break;
          case 1:
          return 'theme-blue'
          break;
      
        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss">

.page {
  margin-bottom: 5rem;
}
</style>
