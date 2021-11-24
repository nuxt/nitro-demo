<template>
  <div class="sound-button-wrapper">
    <div
      class="sound-button"
      ref="item"
      :class="{ 'is-active': isActiveItem }"
      @mousedown="handleMouse"
      @touchstart="handleTouch"
    >
      <div class="controls">
        <PlayerPlayButton :itemdata="itemData" v-if="!useTone" />
        <svg
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
        <svg v-else width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.5 2.5L2.5 15.5M11.5 2.5L11.5 15.5" stroke="white" stroke-width="5" stroke-linecap="round"/>
<path d="M2.5 2.5L2.5 15.5M11.5 2.5L11.5 15.5" stroke="white" stroke-width="5" stroke-linecap="round"/>
<path d="M2.5 2.5L2.5 15.5M11.5 2.5L11.5 15.5" stroke="white" stroke-width="5" stroke-linecap="round"/>
</svg>

      </div>

      <div v-if="isLoaded" class="item-info">
        {{ itemData.originalName }}
      </div>
      <div v-else>
        <div class="item-info">Loading</div>
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

    useTone() {
      return this.project.settings.useTone;
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
      console.log("this.useTone: ", this.useTone, this.itemData);
      this.tonePlayer = new Player({
        url: `${this.$config.previewURL}${this.itemData.key}.mp3`,

        onload: () => {
          this.isLoaded = true;
        },
        onstop: () => {
          // this.clearTimer();
          //this.progress = 0;
          console.log(this.tonePlayer);
          this.isPlaying = false;
        },
         onstart: () => {
          // this.clearTimer();
          //this.progress = 0;
          console.log('start');
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
        if (this.isLooped && this.progress > 100) {
          this.startTime = now;
        }
      }, 20);
    },
    clearTimer() {
      clearInterval(this.progressTimer);
    },
    async setItem(e) {
      if (this.useTone) {
        await start();
        this.togglePlay(e);
      } else {
        this.$store.commit("player/SET_ITEM", this.itemData);
      }
    },
    handleMouse(e) {
      if (e.type != "mousedown") return;
      console.log("e: ", e);
      this.setItem(e);
    },
    handleTouch(e) {
      if (e.type == "click") return;
      this.setItem(e);
    },
    toggleLoop(e) {
      e.preventDefault();
      e.stopPropagation();

      if (this.isLooped) {
        this.tonePlayer.loop = false;
        this.isLooped = false;
      } else {
        this.tonePlayer.loop = true;
        this.isLooped = true;
      }
    },

    togglePlay(e) {
      e.preventDefault();
      e.stopPropagation();

      if (!this.isLoaded) return;
      
      this.clearTimer();

      this.startTime = getContext().now();
      console.log("startTime: ", this.startTime);

      this.tonePlayer.start(now());
      this.$nuxt.$emit("nowplaying", this.itemData);

      this.setTimer();
      this.isPlaying = true;

      // if (p) {
      //   if (p.duration > 0 && p.paused)r {
      //     p.currentTime = 0;
      //     p.play();
      //     this.isPlaying = true;
      //   } else {
      //     p.pause();
      //     this.isPlaying = false;
      //   }
      // }
    },

    stop(e) {
      this.tonePlayer.stop();
      //this.isPlaying = false;
      this.progress = 0;
      this.clearTimer();
    },

    setVolume(val) {
      this.tonePlayer.volume.rampTo(gainToDb(val), 0.2);
    },

    stopButton(e) {
      e.preventDefault();
      e.stopPropagation();
      this.stop();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";

.sound-button-wrapper {
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  position: relative;
  overflow: hidden;
  background-color: var(--primaryColor);
  color: var(--primaryContrast);
  border-radius: 30px;
  height: 60px;

  font-size: 1rem;
  display: inline-block;
  cursor: pointer;

  width: 100%;

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

    transition: 0.4s;

    .controls {
      z-index: 1;
      width: 52px;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: auto;
        height: 20px;
      }
    }

    .item-info {
      z-index: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      @include breakpoint(sm) {
        max-width: 280px;
      }

      @include breakpoint(md) {
        max-width: 204px;
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
