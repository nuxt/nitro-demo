<template>
  <div class="wf-wrapper" :class="{ 'is-revision': isRevision }">
    <div class="waveform" v-show="dataLoaded">
      <svg
        viewBox="0 0 100 100"
        class="waveform-container"
        preserveAspectRatio="none"
        @click="handleClick"
        @mousemove="handleMove"
        @mouseenter="mouseEnter"
        @mouseleave="mouseLeave"
      >
        <rect
          class="waveform-bg"
          ref="wfbg"
          x="0"
          y="0"
          height="100"
          width="100"
        />
        <rect
          id="waveform-progress"
          class="waveform-progress"
          ref="progress"
          x="0"
          y="0"
          height="100"
          width="0"
        />
        <rect
          class="waveform-navigate"
          ref="navigate"
          x="0"
          y="0"
          height="100"
          width="0"
        />
        <!-- <rect
            id="waveform-progress"
            class="waveform-indicator"
            ref="indicator"
            x="0"
            y="0"
            height="100"
            width="0"
        />-->
      </svg>
    </div>
    <!-- <div v-show="!dataLoaded" class="waveform-info">
      <p>Creating Waveform</p>
    </div> -->

    <svg height="0" width="0" v-show="dataLoaded">
      <defs>
        <clipPath ref="wfmask" :id="wfMaskUrl" />
      </defs>
    </svg>
  </div>
</template>

<script>
import { mapState } from "vuex";

const normalizeData = (filteredData) => {
  const multiplier = Math.pow(Math.max(...filteredData), -1);
  
  
  return filteredData.map((n) => n * multiplier);
};

export default {
  name: "WaveForm",
  props: {
    isFooter: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 300,
    },
    height: {
      type: Number,
      default: 30,
    },
    bars: {
      type: Number,
      default: 30,
    },
    isRevision: {
      type: Boolean,
      default: false,
      required: false,
    },
    mediaItemKey: {
      type: String,
    },
  },
  data() {
    return {
      jsonData: null,
      dataLoaded: false,
    };
  },
  computed: {
    ...mapState({
      previewapiURL: (state) => state.previewapiURL,
      playerItem: (state) => state.player.item,
    }),
    jsonUrl() {
      return this.$config.previewURL + this.mediaItemKey + ".json";
    },
    wfMaskUrl() {
      if (this.isFooter) {
        return this.mediaItemKey + "footer";
      } else {
        return this.mediaItemKey;
      }
    },
    isActiveItem() {
      return this.mediaItemKey === this.playerItem.key;
    },
  },
  created() {},
  mounted() {
    this.setupWaveform();
    this.addListeners();
  },
  beforeDestroy() {
    this.$nuxt.$off("audio-playing", this.updateWaveForm);
    this.$nuxt.$off("audio-loading");
  },
  watch: {
    mediaItemKey(val) {
      this.dataLoaded = false;
      this.mediaItemKey = val;
      this.setupWaveform();
    },
  },
  methods: {
    addListeners() {
      this.$nuxt.$on("audio-playing", this.updateWaveForm);

      this.$nuxt.$on("audio-loading", (audio) => {
        // if (this.isActiveItem) {
        //   // this.waveformUpdater.whileloading.call(audio)
        // }
      });
    },
    updateWaveForm(progressObj) {
      let progressValue = progressObj.progress;
      if (this.isActiveItem) {
        if (!isNaN(progressValue) && this.$refs.progress) {
          this.$refs.progress.setAttribute("width", progressValue);
        }
      }
    },
    handleClick(e) {
      let rect = this.$refs.wfbg.getBoundingClientRect();
      var relative = (e.clientX - rect.left) / rect.width;

      this.seek(relative);
      this.mouseLeave();
    },
    mouseEnter() {
      if (!this.isActiveItem) return;
      this.$refs.navigate.style.opacity = 0.6;
    },

    mouseLeave() {
      this.isSeeking = false;
      this.$refs.navigate.style.opacity = 0;
    },

    handleMove(e) {
      if (!this.isActiveItem) return;
      this.mouseEnter();

      let rect = this.$refs.wfbg.getBoundingClientRect();
      var relative = Math.max(0, (e.clientX - rect.left) / rect.width);

      this.$refs.navigate.setAttribute("width", relative * 100);
    },
    setupWaveform() {
      //

      this.$refs.progress.setAttribute("width", 0);
      if (this.isFooter) {
        this.$nuxt.$off("audio-playing", this.updateWaveForm);

        this.addListeners();
      }

      if (this.mediaItemKey) {
        fetch(this.jsonUrl)
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            this.isLoading = false;
            this.jsonData = response.left ? response.left : response.data;

            this.drawWaveform();
          })
          .catch((err) => {});
      }
    },
    seek(pos) {
      if (this.isActiveItem) this.$nuxt.$emit("audio-seek", pos);
    },

    drawWaveform() {
      this.dataLoaded = true;
      const NUMBER_OF_BUCKETS = this.bars; // number of "bars" the waveform should have
      const SPACE_BETWEEN_BARS = 0.1; // from 0 (no gaps between bars) to 1 (only gaps - bars won't be visible)
      let decodedAudioData = normalizeData(this.jsonData);
      

      let bucketDataSize = Math.floor(
        decodedAudioData.length / NUMBER_OF_BUCKETS
      );
        
        
      let buckets = [];

      for (var i = 0; i < NUMBER_OF_BUCKETS; i++) {
        let startingPoint = i * bucketDataSize;
        let endingPoint = i * bucketDataSize + bucketDataSize;
        
        let max = 0;

        for (var j = startingPoint; j < endingPoint; j++) {
          
          if (decodedAudioData[j] > max) {
            max = decodedAudioData[j];
          }
        }
        let size = Math.abs(max);
        
        
        buckets.push(size);
      }
  

      let clipMask = buckets
        .map((bucket, i) => {
          
          let bucketSVGWidth = 100.0 / buckets.length;
          let bucketSVGHeight = bucket * 100;
          let division = 2;

          return `<rect
                            x=${
                              bucketSVGWidth * i + SPACE_BETWEEN_BARS / division
                            }
                            y=${(100 - bucketSVGHeight) / division}
                            width=${bucketSVGWidth - SPACE_BETWEEN_BARS}
                            height=${bucketSVGHeight} />`;
        })
        .join("");

      this.$refs.wfmask.innerHTML = clipMask;

      this.$refs.wfbg.style.clipPath = `url(#${this.wfMaskUrl})`;
      this.$refs.progress.style.clipPath = `url(#${this.wfMaskUrl})`;
      this.$refs.navigate.style.clipPath = `url(#${this.wfMaskUrl})`;
    },
  },
};
</script>

<style lang="scss" scoped>
$secondary: var(--secondaryColor);

.wf-wrapper {
  height: 40px;
  position: relative;
  cursor: col-resize;
  min-width: 100px;
  width: 100%;

  &.is-revision {
    height: 30px;
  }

  .waveform-info {
    position: absolute;
    height: 100%;
    display: flex;
    align-items: center;
  }
}
.waveform {
  width: 100%;
  height: 100%;

  .waveform-container {
    width: 100%;
    height: 100%;
  }
}

.waveform-bg {
  // clip-path: url('#testClip');
  fill: var(--primaryColorDarker);
}

.waveform-navigate {
  // clip-path: url('#testClip');
  pointer-events: none;
  fill: var(--primaryColor);

  //fill: green;
}

.waveform-progress {
  // clip-path: url('#testClip');
  pointer-events: none;
  fill: var(--primaryColor);
}
</style>
