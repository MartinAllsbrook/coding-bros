import Settings from "./Settings.js";

export default class AudioSource {
	static basePath = './audio/';

	static masterVolume = 1;

	constructor(subfolder, filename, volume) {
		this.path = this.createPath(subfolder, filename);

		this.audio = new Audio(this.path);

		this.volume = volume;
		this.audio.volume = AudioSource.masterVolume * volume;

		Settings.instance.audioSettings.masterVolume.subscribe((newValue) => {
			console.log(newValue);
			AudioSource.masterVolume = newValue; 
			this.updateVolume();
		});
	}

	playFromStart() {
		this.audio.currentTime = 0;
		this.playIfPaused();
	}

	playIfPaused() {
		if (this.audio.paused) {
			this.audio.play();
		}
	}

	pauseIfPlaying() {
		if (!this.audio.paused) {
			this.audio.pause();
		}
	}

	createPath(subfolder, filename) {
		return `${AudioSource.basePath}${subfolder}/${filename}.mp3`;
	}

	// TODO: This needs to be done better
	updateVolume(){
	}
}