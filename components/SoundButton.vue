<template>
  <div class="sound-button-wrapper">
    <div class="sound-button">
      <div class="controls">
        <PlayButton :itemdata="item" />
      </div>
      <div class="info">
        <p>{{ item.originalName }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import PlayButton from "./Player/PlayButton.vue";

export default {
  props: ["item"],
  mounted() {},
  components: { PlayButton },
};
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";
.sound-button-wrapper {
  display: inline-block;
  margin-bottom: 1rem;
  width: 100%;
  //   transition: all 1.4s ease-in-out;

  @include breakpoint(sm) {
    width: calc(50% - 1rem);
  }

  @include breakpoint(md) {
    width: calc(25% - 1rem);
  }

  &:not(:last-child) {
    margin-right: 1rem;
  }

  .sound-button {
    display: flex;

    background-color: var(--primaryColor);

    background-color: var(--primaryColor);
    height: 80px;
    border-radius: 50px;
    align-items: center;

    .controls {
      display: flex;
      width: 66px;
      align-items: center;
      justify-content: center;
      @include breakpoint(sm) {
        width: 80px;
      }
    }

    .info {
      white-space: nowrap;
      max-width: 60%;

      p {
        overflow: hidden;
        text-overflow: ellipsis;
        color: var(--primaryContrast);
        // font-family: monospace;
        font-size: 1rem;
      }
    }
  }
}
</style>
