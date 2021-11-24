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

    height: 80px;

    align-items: center;

    .controls {
      display: flex;
      width: 80px;
      align-items: center;
      justify-content: center;
      @include breakpoint(sm) {
        width: 80px;
      }
    }

    .wf {
      width: 100%;
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
