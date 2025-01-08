import AudioSource from "./AudioSource.js";

/* ### This file is untested ### */
export default class MusicSource extends AudioSource {
    constructor(filename) {
        super('music', filename);

        this.name = filename;
        this.audio.loop = true;
    }
}