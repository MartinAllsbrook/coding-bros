import MusicSource from "./MusicSource.js";

export default class MusicManager {
    static instance = null;
    
    gameOverSong = new MusicSource('GameOver');
    SpaceFighterLoop = new MusicSource('Space Fighter Loop');

    currentSong = null;

    musicStarted = false;

    constructor() {
        if(MusicManager.instance == null){
            MusicManager.instance = this;
        } else {
            console.error('Cannot create more than one MusicManager instance');
            return;
        }

        document.addEventListener('keydown', (event) => {
            this.startMusic();
        });
    }

    startMusic(){
        if(this.musicStarted){
            return;
        }
        this.musicStarted = true;
        this.playSong('SpaceFighterLoop');
    }

    playSong(song){
        if(this.currentSong != null){
            this.currentSong.pauseIfPlaying();
        }

        if (song == 'GameOver'){
            this.gameOverSong.playFromStart();
            this.gameOverSong.loop = true;
            this.currentSong = this.gameOverSong;
        }

        if (song == 'SpaceFighterLoop'){
            this.SpaceFighterLoop.playFromStart();
            this.SpaceFighterLoop.volume = 0.5;
            this.SpaceFighterLoop.loop = true;
            this.currentSong = this.SpaceFighterLoop;
        }
    }
}