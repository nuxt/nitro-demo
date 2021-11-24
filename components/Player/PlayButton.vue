<template>
  <div
    class="play-button-wrapper"
    @click="toggle"
    :class="{ active: isActiveItem }"
  >
    <!-- {{playbackState}} -->
    <!-- {{ state }} -->
    <!-- <div v-if="state == 'loading'" class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div> -->
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 37 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="18.5" cy="18.5" r="18.5" fill="#8577F5" />

      <path
        v-if="isPlaying"
        d="M13 12.7647C13 12.3424 13.3762 12 13.8403 12H14.7569C15.221 12 15.5972 12.3424 15.5972 12.7647V24.2353C15.5972 24.6576 15.221 25 14.7569 25H13.8403C13.3762 25 13 24.6576 13 24.2353V12.7647Z"
        fill="white"
      />
      <path
        v-if="isPlaying"
        d="M21.4028 12.7647C21.4028 12.3424 21.779 12 22.2431 12H23.1597C23.6238 12 24 12.3424 24 12.7647V24.2353C24 24.6576 23.6238 25 23.1597 25H22.2431C21.779 25 21.4028 24.6576 21.4028 24.2353V12.7647Z"
        fill="white"
      />
      <path
        v-if="isPaused"
        d="M26.5 17.634C27.1667 18.0189 27.1667 18.9811 26.5 19.366L15.25 25.8612C14.5833 26.2461 13.75 25.765 13.75 24.9952L13.75 12.0048C13.75 11.235 14.5833 10.7539 15.25 11.1388L26.5 17.634Z"
        fill="white"
      />
      <circle
        class="loading-dot"
        v-if="isLoading"
        cx="18.5"
        cy="18.5"
        r="7.5"
        fill="white"
      />
    </svg>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ['itemdata'],
  data() {
    return {
      // isPlaying: false,
    };
  },
  computed: {
    ...mapState({

      playerItem: (state) => state.player.item,
      playbackState: (state) => state.player.playBackState,
      playbackStates: (state) => state.player.playbackStates,
    }),
    isActiveItem() {
      return this.itemdata.id == this.playerItem.id;
    },
    isPlaying() {
      return this.state == this.playbackStates.PLAYING;
    },
    isPaused() {
      return this.state == this.playbackStates.PAUSED;
    },
    isLoading() {
      if (this.isActiveItem) {
        return this.state == this.playbackStates.LOADING;
      }
    },
    state() {
      if (this.isActiveItem) {
        //return Object.keys(this.playbackStates).find(key => this.playbackStates[key] === this.playbackState);
        return this.playbackState;
      } else {
        return this.playbackStates.PAUSED;
      }
    },
  },
  props: {
    itemdata: {
      type: Object,
    },
    isFooter: {
      type: Boolean,
    },
    size: {
      type: Number,
      default: 37,
    },
  },
  mounted() {},

  methods: {
    toggle() {
      if (this.isFooter) {
        this.$emit("play");
      } else {
        this.$store.commit("player/SET_ITEM", this.itemdata);
      }

      switch (this.playbackState) {
        case this.playbackStates.LOADING:
          break;
        case this.playbackStates.STOPPED:
          this.$nuxt.$emit("player-play", this.itemdata);
          break;
        case this.playbackStates.PAUSED:
          this.$nuxt.$emit("player-play", this.itemdata);
          break;
        case this.playbackStates.PLAYING:
          if (this.isActiveItem) {
            this.$nuxt.$emit("player-pause", this.itemdata);
          } else {
            this.$nuxt.$emit("player-play", this.itemdata);
          }
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";

$size: 44px;

.play-button-wrapper {
  width: $size;
  height: $size;
  // margin-right: var(--gap);
  cursor: pointer;
  display: flex;
  margin-right: .5rem;


  // flex-basis: $size;
  // flex-shrink: 0;

  &:hover {
    svg {
      circle {
        fill: var(--primaryColor);
      }
    }
  }

  &.active {
    svg {
      circle {
        fill: var(--primaryColor);
      }
    }
  }

  svg {
    width: 100%;
    height: 100%;
    circle {
      transition: all 0.4s;
      fill: var(--primaryColorDarker);

      &.loading-dot {
        fill: var(--bgColor);
        transform-origin: center;
        animation: pulse 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      }
    }
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.5);
    opacity: 0.2;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(0.5);
    opacity: 0.2;
  }
}
</style>
