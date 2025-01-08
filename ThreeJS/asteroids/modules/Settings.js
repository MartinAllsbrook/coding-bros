export default class Settings {
    constructor(DOMElement) {
        this.DOMElement = DOMElement;
        this.audio = {
            soundFXVolume: 1,
            musicVolume: 1,
            masterVolume: 1
        };
        this.controls = {
            movementScheme: 0
        };
    }

    
}
