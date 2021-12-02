<template>
  <div class="sound-button-wrapper">
    <div class="sound-button" ref="item" :class="{ 'is-active': isActiveItem }">
      <div class="controls onlycontrol" @click="handleControls">
        <svg
          class="onlycontrol"
          v-if="!isPlaying"
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.75 8.70096C17.75 9.27831 17.75 10.7217 16.75 11.299L3.25 19.0933C2.25 19.6706 1 18.9489 1 17.7942L1 2.20577C1 1.05107 2.25 0.329382 3.25 0.906733L16.75 8.70096Z"
            fill="white"
            stroke="white"
          />
        </svg>
        <svg
          v-else
          class="onlycontrol"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="18" height="18" rx="3" fill="white" />
        </svg>
      </div>
      <div class="right" @mousedown="handleMouse" @touchstart="handleTouch">
        <div v-if="isLoaded" class="item-info">
          {{ itemData.originalName }}
        </div>
        <div v-else>
          <div class="item-info">Loading</div>
        </div>
      </div>

      <div class="progress" :style="{ width: `${progress}%` }"></div>
    </div>
  </div>
</template>

<script>
import { Player, getContext, gainToDb, start, now } from "tone";
import { mapState } from "vuex";

export default {
  props: ["itemData"],
  data() {
    return {
      isDownloaded: false,
      show: false,
      isPlaying: false,
      duration: 0,
      progress: 0,
      isLooped: false,
      isLoaded: false,
      startTime: 0,
      progressTimer: null,
      controls: {
        volume: {
          value: 1,
          min: 0,
          max: 1,
          step: 0.01,
          // onInput: this.setVolume,
        },
      },
      volume: 1,
    };
  },
  computed: {
    ...mapState({
      project: (state) => state.project,
      item: (state) => state.player.item,
      useTone: (state) => state.player.useTone,
    }),
    isActiveItem() {
      return this.item.id == this.itemData.id;
    },

    buttonVolume() {
      return this.project.settings.toneOptions.individualVolume;
    },

    soloMode() {
      return this.project.settings.toneOptions.soloMode;
    },

    // isDownloaded() {
    //   return this.estore.get(this.itemData.id);
    // },
  },
  beforeDestroy() {
    this.clearTimer();

    if (this.tonePlayer) {
      this.tonePlayer.stop();
      this.tonePlayer.dispose();
    }
  },

  mounted() {
    if (this.useTone) {
      this.tonePlayer = new Player({
        url: `${this.$config.previewURL}${this.itemData.key}.mp3`,

        onload: () => {
          this.isLoaded = true;
        },
        onstop: () => {
          //this.clearTimer();
          //this.progress = 0;
        },
        onstart: () => {
          // this.clearTimer();
          //this.progress = 0;

          this.isPlaying = true;
        },
      }).connect(this.$masterChannel.master);

      this.$nuxt.$on("stop-all", this.stop);

      this.$nuxt.$on("nowplaying", (item) => {
        if (this.isPlaying && this.itemData.id != item.id) {
          if (this.soloMode) {
            this.stop();
          }
        }
      });
    } else {
      this.isLoaded = true;
    }
    //this.estore = new EStore();
    //this.isDownloaded = this.estore.get(this.itemData.id);
    // this.estore.clear()
  },
  methods: {
    setTimer() {
      this.progressTimer = setInterval(() => {
        let now = getContext().now();
        let duration = this.tonePlayer.buffer.duration;
        this.progress = ((now - this.startTime) / duration) * 100;
        if (this.progress > 100) {
          this.isPlaying = false;
        }
        if (this.isLooped && this.progress > 100) {
          this.startTime = now;
        }
      }, 20);
    },
    clearTimer() {
      clearInterval(this.progressTimer);
    },
    async setItem(e) {
      console.log("target: ", e.target.className);

      if (this.useTone) {
        await start();
        this.play(e);
      } else {
        this.$store.commit("player/SET_ITEM", this.itemData);
      }
    },
    handleControls(e) {
      e.preventDefault();
      e.stopPropagation();
      // e.stopPropagation();
      // e.preventDefault()

      if (this.isPlaying) {
        this.stop();
      } else {
        this.play(e);
      }
    },
    handleMouse(e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.type != "mousedown") return;

      this.setItem(e);
    },
    handleTouch(e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.type == "click") return;
      console.log("handle touch");
      this.setItem(e);
    },
    toggleLoop(e) {
      if (this.isLooped) {
        this.tonePlayer.loop = false;
        this.isLooped = false;
      } else {
        this.tonePlayer.loop = true;
        this.isLooped = true;
      }
    },

    togglePlay(e) {},

    play() {
      if (!this.isLoaded) return;

      this.clearTimer();

      this.startTime = getContext().now();
      console.log("this.startTime: ", this.startTime);

      this.tonePlayer.start(now());
      this.$nuxt.$emit("nowplaying", this.itemData);

      this.setTimer();
      this.isPlaying = true;
    },

    stop(e) {
      this.tonePlayer.stop();
      this.isPlaying = false;
      this.progress = 0;
      this.clearTimer();
    },

    setVolume(val) {
      this.tonePlayer.volume.rampTo(gainToDb(val), 0.2);
    },

    stopButton(e) {
      this.stop();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";
@import "@/assets/scss/typography.scss";

.sound-button-wrapper {
  margin-bottom: 0.5rem;
  position: relative;
  overflow: hidden;
  background-color: var(--primaryColor);
  color: var(--primaryContrast);
  border-radius: 30px;
  height: 60px;
  // font-family: Mono;

  font-size: 1rem;
  display: inline-block;
  cursor: pointer;

  width: 100%;

  &:not(:last-child) {
    margin-right: 0.5rem;
  }

  @include breakpoint(sm) {
    width: calc((100% / 2) - 0.5rem);
  }

  @include breakpoint(md) {
    width: calc((100% / 4) - 0.5rem);
  }

  .sound-button {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    font-family: Mono;
    transition: 0.4s;

    .controls {
      z-index: 3;
      position: relative;
      width: 80px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: auto;
        height: 20px;
      }
    }

    .right {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      z-index: 10;

      .item-info {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        @include breakpoint(sm) {
          max-width: 280px;
        }

        @include breakpoint(md) {
          max-width: 140px;
        }
      }
    }

    .progress {
      height: 100%;
      width: 0;
      z-index: 0;
      position: absolute;
      background-color: var(--primaryColorDarker);
      top: 0;
      left: 0;
      opacity: 1;
    }
  }
}
</style>
