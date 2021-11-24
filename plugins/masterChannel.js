import {PingPongDelay, Gain, Channel, Convolver, gainToDb} from "tone";
class MasterChannel {
  constructor() {
    this.fxBus = new Channel()
    this.master = new Gain().connect(this.fxBus);

    // initializing the convolver with an impulse response

    

    this.convolver = new Convolver("/audio/warmplate.wav").toDestination();
    this.convolverChannel = new Channel({ volume: 0 }).connect(
      this.convolver
    );
    this.convolverChannel.receive("convolverMaster");

    this.pingPong = new PingPongDelay("8n", 0.2).toDestination();
    this.pingPongChannel = new Channel({ volume: -60 }).connect(
      this.pingPong
    );
    this.pingPongChannel.receive("pingPongMaster");

    this.masterOut = new Gain().toDestination();
    this.fxBus.send("convolverMaster");
    this.fxBus.send("pingPongMaster");

    this.master.connect(this.masterOut);
    this.setReverb(0)
    this.setDelay(0)
  }

  setVolume(val) {
    this.master.gain.rampTo(val, 0.2);
  }

  setReverb(val) {
    this.convolverChannel.volume.rampTo(gainToDb(val), 0.2);
  }

  setDelay(val) {
    this.pingPongChannel.volume.rampTo(gainToDb(val), 0.2);
  }
}
const instance = new MasterChannel();
Object.freeze(instance);

export default (context, inject, store) => {


  inject('masterChannel', instance)
  context.$masterChannel = instance
}
