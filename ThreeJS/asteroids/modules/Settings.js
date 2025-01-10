import Setting from "./Setting.js";

export default class Settings {
    static instance;

    constructor(DOMElement) {
        if (Settings.instance == null){
            Settings.instance = this;
        } else {
            console.error('Cannot create multiple instances of Settings');
        }


        this.DOMElement = DOMElement;

        this.audioSettings = {
            soundFXVolume: new Setting(0.5),
            musicVolume: new Setting(0.5),
            masterVolume: new Setting(0.5)
        };

        this.createEventListeners();
    }

    createEventListeners() {
        this.masterVolumeSlider = this.DOMElement.querySelector('#masterVolumeSlider'); // Ewwww I hate querySelector
        this.masterVolumeSlider.addEventListener('input', (event) => {
            this.audioSettings.masterVolume.changeSetting(event.target.value);
        });

        this.soundFXVolumeSlider = this.DOMElement.querySelector('#sfxVolumeSlider');
        this.soundFXVolumeSlider.addEventListener('input', (event) => {
            this.audioSettings.soundFXVolume.changeSetting(event.target.value);
        });

        this.musicVolumeSlider = this.DOMElement.querySelector('#musicVolumeSlider');
        this.musicVolumeSlider.addEventListener('input', (event) => {
            this.audioSettings.musicVolume.changeSetting(event.target.value);
        });
    }
}
