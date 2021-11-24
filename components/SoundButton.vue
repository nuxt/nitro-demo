<template>
  <div class="sound-button-wrapper">
    <div
      class="sound-button"
      ref="item"
      :class="{ 'is-active': isActiveItem }"
      @mousedown="setItem"
      @touchstart="setItem"
    >
      <div class="progress" :style="{ left: `${progress}%` }"></div>
      <div class="controls" v-if="!useTone">
        <PlayerPlayButton :itemdata="itemData" />
      </div>

      <div v-if="isLoaded">
        <div class="item-info">
          {{ itemData.originalName  }}
        </div>
        
      </div>
      <div v-else>
        <div class="item-info">Loading</div>
      </div>
      <div class="button-footer" v-if="useTone">
        <div class="stop" @click="stopButton">
          <svg
            width="39"
            height="39"
            viewBox="0 0 39 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <!-- <rect x="11" y="11" width="17" height="17" fill="#C4C4C4" /> -->
            <rect
              x="1.5"
              y="1.5"
              width="36"
              height="36"
              stroke="#C4C4C4"
              stroke-width="0"
            />
          </svg>
        </div>
        <!-- <div class="volume-wrapper" v-if="buttonVolume">
          <b-slider
            v-model="volume"
            :min="controls.volume.min"
            :max="controls.volume.max"
            :step="controls.volume.step"
            @input="setVolume"
            :tooltip="false"
            rounded
            size="is-small"
          ></b-slider>
        </div> -->

      </div>
    </div>
  </div>
</template>

<script>
import { Player, getContext, gainToDb } from "tone";
import { mapState } from "vuex";


export default {
  props: ["itemData"],
  data() {
    return {
      isDownloaded: false,
      show: false,
      isPlaying: false,
      duration: 0,
      progress: 110,
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
      console.log('this.useTone: ', this.useTone,this.itemData);
      this.tonePlayer = new Player({
        url: `${this.$config.previewURL}${this.itemData.key}.mp3`,

        onload: () => {
          this.isLoaded = true;
        },
        onstop: () => {
          
          // this.clearTimer();
          this.progress = 110;
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
    setItem(e) {
      if (this.useTone) {
        this.togglePlay(e);
      } else {
        this.$store.commit("player/SET_ITEM", this.itemData);
      }
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
      this.isPlaying = true;
      this.clearTimer();

      this.tonePlayer.start();
      this.$nuxt.$emit("nowplaying", this.itemData);

      this.startTime = getContext().now();

      this.setTimer();

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
      this.isPlaying = false;
      this.progress = 110;
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
  background: var(--bgColor);
  color: var(--textColor);
  border: 3px solid var(--textColor);
  
  font-size: 1rem;
  display: inline-block;
  cursor: pointer;

  width: 100%;

  svg {
    width: 100%;
    height: auto;
  }

  @include breakpoint(sm) {
    width: calc((100% / 4) - 0.5rem);
  }

  transition: 0.4s;

  .info {
    user-select: none;
  }

  .button-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .volume-wrapper {
      width: 80%;
      z-index: 2;

      .b-slider {
        width: 40%;
        margin: 0;
      }
    }
  }

  &.small {
    font-size: 0.6rem;
    padding: 0.4rem;
    margin-right: 0;
    margin-bottom: 0;
  }



  .controls {
    // background-color: #eee;
    // display: flex;
    // align-items: center;
    // padding: 4px;
    // justify-content: space-between;
  }

  .like {
    position: absolute;
    top: 5px;
    left: 5px;
    font-size: 0.8rem;

    &.is-liked {
      svg {
        path {
          fill: red;
          stroke: none;
        }
      }
    }

    svg {
      height: 16px;
      width: 16px;

      path {
        fill: none;
      }
    }
  }



  .loop {
    height: 19px;
    width: 19px;

    // position: absolute;
    background-color: none;
    // bottom: 6px;
    // right: 6px;
    opacity: 1;

    &.active {
      svg {
        path {
          fill:  var(--textColor);
        }
      }
    }

    svg {
      path {
        fill:  var(--textColor);
      }
    }
  }

  .stop {
    height: 16px;
    width: 16px;

    // position: absolute;
    background-color: none;
    // bottom: 6px;
    // left: 6px;
    opacity: 1;

    svg {
      transition: 0.2s all;
    }

    &:hover {
      svg {
        rect {
          fill: var(--textColor);
        }
      }
    }

    svg {
      rect {
        fill: var(--textColor);
      }
    }
  }

  .progress {
    height: 100%;
    width: 2px;

    position: absolute;
    background-color: var(--textColor);
    top: 0;
    left: 0;
    opacity: 1;
  }
}

// .item-button {
//   @include round-border;
//   cursor: pointer;

//   display: flex;
//   align-items: center;
//   height: 60px;
//   width: 100%;
//   --wfWidth: 200px;
//   padding: 8px 12px;
//   //justify-content: space-between;
//   &.is-downloaded {
//     color: var(--primaryColor);
//   }

//   &:hover {
//     @include active-mi;
//   }

//   &.is-active {
//     @include active-mi;
//   }

//   .controls {
//     flex: 0 0 40px;
//     display: flex;
//     align-items: center;
//     margin-right: var(--gap);
//   }

//   .item-wf {
//     flex: 1 1 var(--wfWidth);
//     max-width: var(--wfWidth);
//   }

//   .item-info {
//     display: flex;
//     flex-direction: column;
//     .item-title {
//       display: inline;
//     }
//   }

//   .item-actions {
//     margin-left: auto;
//   }

//   .no-preview {
//     text-decoration: line-through;
//   }
// }
</style>
