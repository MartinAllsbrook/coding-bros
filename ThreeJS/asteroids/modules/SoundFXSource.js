import AudioSource from "./AudioSource.js";

/* ### This file is untested ### */
export default class SoundFXSource extends AudioSource {
    constructor(filename) {
        super('soundFX', filename);

        this.fireAudio.preservesPitch = false;
    }

    playWithRandomPitch(variation) {
        this.fireAudio.playbackRate = 1 + (Math.random() - 0.5) * variation;
        this.playFromStart();
    }
}