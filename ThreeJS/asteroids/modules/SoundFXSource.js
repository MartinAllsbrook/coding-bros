import AudioSource from "./AudioSource.js";

/* ### This file is untested ### */
export default class SoundFXSource extends AudioSource {
    constructor(filename, looping, volume) { // Need to sort out how we imput the volume and other settings
        super('soundFX', filename);

        this.audio.loop = looping;
        this.audio.volume = volume;
        this.audio.preservesPitch = false;
    }

    playWithRandomPitch(variation) {
        this.audio.playbackRate = 1 + (Math.random() - 0.5) * variation;
        this.playFromStart();
    }
}