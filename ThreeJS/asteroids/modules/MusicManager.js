export default class MusicManager {
    static instance = null;
    
    gameOverSong = new Audio('./audio/music/GameOver.mp3');
    SpaceFighterLoop = new Audio('./audio/music/Space Fighter Loop.mp3');

    currentSong = null;

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
        this.playSong('SpaceFighterLoop');
    }

    playSong(song){
        if(this.currentSong != null){
            this.currentSong.pause();
        }

        if (song == 'GameOver'){
            this.gameOverSong.play();
            this.gameOverSong.loop = true;
            this.currentSong = this.gameOverSong;
        }

        if (song == 'SpaceFighterLoop'){
            this.SpaceFighterLoop.play();
            this.SpaceFighterLoop.volume = 0.5;
            this.SpaceFighterLoop.loop = true;
            this.currentSong = this.SpaceFighterLoop;
        }
    }
}