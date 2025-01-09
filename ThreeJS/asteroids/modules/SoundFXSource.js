import AudioSource from "./AudioSource.js";

/* ### This file is untested ### */
export default class SoundFXSource extends AudioSource {
    static subfolder = 'soundFX';
    static soundFXVolume = 1;

    constructor(filename, looping, volume) { // Need to sort out how we imput the volume and other settings
        volume *= SoundFXSource.soundFXVolume;

        super(SoundFXSource.subfolder, filename, volume);

        this.audio.loop = looping;
        this.audio.preservesPitch = false;
    }

    playWithRandomPitch(variation) {
        this.audio.playbackRate = 1 + (Math.random() - 0.5) * variation;
        this.playFromStart();
    }
}