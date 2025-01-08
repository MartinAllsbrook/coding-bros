/* ### This file is untested ### */
export default class AudioSource {
	constructor(subfolder, filename) {
		this.path = this.createPath(subfolder, filename);

		this.audio = new Audio(this.path);
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
		return `./assets/audio/${subfolder}/${filename}.mp4`;
	}
}