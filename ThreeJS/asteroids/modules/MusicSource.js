import AudioSource from "./AudioSource.js";
import Settings from "./Settings.js";

export default class MusicSource extends AudioSource {
    static musicVolume = 1;

    constructor(filename) {
        super('music', filename, 1);

        this.name = filename;
        this.audio.loop = true;

        Settings.instance.audioSettings.musicVolume.subscribe((newValue) => {
            MusicSource.musicVolume = newValue;
            this.updateVolume();
        });
    }

    // TODO: This needs to be done better
    updateVolume() {
        this.audio.volume = AudioSource.masterVolume * this.volume * MusicSource.musicVolume;
    }
}