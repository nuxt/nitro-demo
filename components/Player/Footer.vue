<template>
  <div class="footer-main" :class="{ 'active': isActive }">
    <section class="section">
      <div class="container no-padding">
        <PlayerAudioPlayer />
        <div class="footer-inner">
          <div class="controls">
            <PlayerPlayButton :itemdata="item" :isFooter="true" />
          </div>
          <div class="wf">
            <PlayerWaveForm
              :mediaItemKey="currentStem.key"
              :isFooter="true"
              :bars="100"


            />
          </div>
          
        
          <div class="footer-info client">
            {{ item.originalName }}
          </div>

         
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import { Player, JCReverb, Tone } from "tone";

const clamp = function (min, number, max) {
  return Math.min(Math.max(number, min), max);
};

export default {
  data() {
    return {
      reverbValue: 0,
      seekValue: 0,
      isPlaying: false,
    };
  },
  computed: {
    ...mapState({
      item: (state) => state.player.item,
      currentStem: (state) => state.player.currentStem,
      // useTone: (state) => state.player.useTone,
      previewapiURL: (state) => state.previewapiURL,
      showFooter: (state) => state.player.showFooter
    }),
    isActive(){
      
      return this.showFooter && this.item.id
    },
    // useTone: {
    //   get() {
    //     return this.$store.state.player.useTone;
    //   },

    //   set(val) {
    //     this.$store.commit("player/SET_USETONE", val);
    //   },
    // },
    
  },
  props: {
    settings: {
      type: Object,
      required: false,
    },
  },
  mounted() {},
  watch: {},
  beforeDestroy() {},
  methods: {
    changeEffect() {
      //this.reverb.wet.value = this.reverbValue
      this.player.playbackRate = this.reverbValue;
      //
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";

.stem-wrapper {
  margin: 0 0.5rem;
}

.footer-main {
  position: fixed;
  transform: translateY(80px);
  bottom: 0;
  border-top: 1px solid var(--primaryColor);
  width: 100%;
  background: var(--bgColor);
  height: 80px;
  display: flex;
  align-items: center;
  z-index: 4;
  transition: transform 0.4s cubic-bezier(0.77, 0.2, 0.05, 1);

  .section {
    width: 100%;
    // padding: 0 0.6rem;
  }

  &.active {
    transform: translateY(0);
  }

  .footer-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .footer-info {
      // width: 100%;
      color: var(--textColor);
      margin-left: auto;
    max-width: 104px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

   

      @include breakpoint(sm) {
        margin-left: auto;
        max-width: 300px;
      }
    }

    .wf {
      padding-right: 1rem;
      width: 50%;
    }

    .controls {
      flex: 0 0 40px;
      display: flex;
      align-items: center;
      margin-right: var(--gap);
    }
  }
}
</style>
