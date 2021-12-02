<template>
  <div class="item-wrapper">
    <div class="standard-item">
      <div class="controls">
        <PlayButton :itemdata="item" />
      </div>
      <div class="wf">
        <PlayerWaveForm
          :mediaItemKey="item.stems[0].key"
          :isFooter="true"
          :bars="100"
        />
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
.item-wrapper {
  display: inline-block;
  margin-bottom: 1rem;
  width: 100%;
  //   transition: all 1.4s ease-in-out;

  &:not(:last-child) {
    margin-right: 1rem;
  }

  .standard-item {
    display: flex;
    width: 100%;

    height: 60px;

    align-items: center;
    color: var(--textColor);
    //justify-content: space-between;

    .controls {
      display: flex;
      width: 54px;
      align-items: center;
      justify-content: flex-start;
      @include breakpoint(sm) {
        width: 80px;
      }
    }

    .wf {
      width: 200px;

      @include breakpoint(sm) {
        width: 480px;
      }
    }

    .info {
      white-space: nowrap;

      margin-left: 1rem;

      @include breakpoint(sm) {
        margin-left: auto;
        }

      p {
        overflow: hidden;
        text-overflow: ellipsis;
        width: 150px;
        text-align: left;
        // font-family: monospace;
        font-size: 1rem;
        @include breakpoint(sm) {
          text-align: right;
          width: 280px;
        }
      }
    }
  }
}
</style>
