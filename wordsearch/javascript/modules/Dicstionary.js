export default class Dictionary {
    constructor() {
        this.words = [
            'JAVASCRIPT',
            'HTML',
            'CSS',
            'CODE',
            'WEBSITE',
            'DEVELOPER',
            'PROGRAMMER',
            'COMPUTER',
            'MOUSE',
            'KEYBOARD',
            'MONITOR',
            'SCREEN',
            'INTERNET',
            'NETWORK',
            'WIFI',
            'ETHERNET'
        ];
    }

    getRandomWord() {
        const randomIndex = Math.floor(Math.random() * this.words.length);
        return this.words[randomIndex];
    }
}