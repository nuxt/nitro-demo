<template>
  <div class="controls-wrapper">
    <div>
        <button class="btn primary extended"  @click="$nuxt.$emit('stop-all')">Stop All</button>
      </div>

      <div label="Volume">
        <input
          v-model="volume"
          type="range"
          :min="controls.volume.min"
          :max="controls.volume.max"
          :step="controls.volume.step"
          @input="setVolume"
          :tooltip="false"
          rounded
          size="is-medium"
        ></input>
      </div>
      <div label="Reverb">
        <input
        type="range"
          v-model="reverb"
          :min="controls.reverb.min"
          :max="controls.reverb.max"
          :step="controls.reverb.step"
          @input="setReverb"
          :tooltip="false"
          rounded
          size="is-medium"
        ></input>
      </div>

      <div label="Delay">
        <input
        expanded
          v-model="delay"
          type="range"
          :min="controls.delay.min"
          :max="controls.delay.max"
          :step="controls.delay.step"
          @input="setDelay"
          :tooltip="false"
          rounded
          size="is-medium"
        ></input>
      </div>




  </div>
</template>

<script>

import { mapState } from "vuex";


export default {
  data() {
    return {
      controls: {
        volume: {
          value: 1,
          min: 0,
          max: 1,
          step: 0.01,
          onInput: this.setVolume,
        },
        reverb: {
          value: 0,
          min: 0,
          max: 1,
          step: 0.01,
          onInput: this.setReverb,
        },
        delay: {
          value: 0,
          min: 0,
          max: 1,
          step: 0.01,
          onInput: this.setDelay,
        },
      },
      volume: 1,
      reverb: 0,
      delay: 0,
    };
  },
  computed: {
    ...mapState(["awsRoot", "allSounds"]),
  },
  mounted() {
    this.setReverb();
    this.setDelay();
    this.setVolume();
  },
  methods: {
    setVolume() {
      this.$masterChannel.setVolume(this.volume);
    },
    setReverb() {
      this.$masterChannel.setReverb(this.reverb);
    },
    setDelay() {
      this.$masterChannel.setDelay(this.delay);
    },
  },
};
</script>

<style scoped lang="scss">

.controls-wrapper {
  // margin: 0 2rem;
}

</style>
