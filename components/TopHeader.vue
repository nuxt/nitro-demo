<template>
  <section class="section top">
    <div class="container top-header">
      <div>
        <p class="is-size-3 title is-bold">{{ project.name }}</p>
        <p class="subtitle">Created by {{ project.uid.name }}</p>

        <div class="actions">
          <div class="icon" v-if="showSettingsButton" @click="toggleSettings()">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="24"
                cy="24"
                r="23"
                stroke="#006D4F"
                stroke-width="2"
              />
              <line
                x1="14"
                y1="12"
                x2="14"
                y2="36"
                stroke="#006D4F"
                stroke-width="2"
                stroke-linecap="round"
              />
              <line
                x1="24"
                y1="12"
                x2="24"
                y2="36"
                stroke="#006D4F"
                stroke-width="2"
                stroke-linecap="round"
              />
              <line
                x1="34"
                y1="12"
                x2="34"
                y2="36"
                stroke="#006D4F"
                stroke-width="2"
                stroke-linecap="round"
              />
              <circle cx="24" cy="23" r="3" fill="#006D4F" />
              <circle cx="34" cy="31" r="3" fill="#006D4F" />
              <circle cx="14" cy="27" r="3" fill="#006D4F" />
            </svg>
          </div>

          <div class="icon" @click="download()">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25 11C25 10.4477 24.5523 10 24 10C23.4477 10 23 10.4477 23 11L25 11ZM23.2929 37.7071C23.6834 38.0976 24.3166 38.0976 24.7071 37.7071L31.0711 31.3431C31.4616 30.9526 31.4616 30.3195 31.0711 29.9289C30.6805 29.5384 30.0474 29.5384 29.6569 29.9289L24 35.5858L18.3431 29.9289C17.9526 29.5384 17.3195 29.5384 16.9289 29.9289C16.5384 30.3195 16.5384 30.9526 16.9289 31.3431L23.2929 37.7071ZM23 11L23 37L25 37L25 11L23 11Z" fill="#006D4F"/>
<circle cx="24" cy="24" r="23" stroke="#006D4F" stroke-width="2"/>
</svg>

          </div>
        </div>
      </div>

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
import Compress from "@/modules/compress";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      project: (state) => state.project,
    }),
    showSettingsButton(){
      return this.$route.name == 'buttons-id'
    }
  },

  mounted() {
    console.log(this.$route);
  },
  watch: {},
  beforeDestroy() {},
  methods: {
    download() {
      this.isZipping = true;
      console.log(this.project);
      Compress.generateZipFile(this.project, () => {
        this.isZipping = false;
      });
    },
    toggleSettings(){
      this.$store.commit('TOGGLE_SETTINGS')
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";

.top-header {
  display: flex;
  justify-content: space-between;

  .actions {
    display: flex;

    .icon {
      padding-right: 1rem;
      padding-top: 1rem;
      cursor: pointer;
      

      svg {
        width: 40px;
        path, circle, line {
          stroke: var(--primaryColor);
        }
      }
    }
  }

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
