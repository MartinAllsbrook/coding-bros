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

        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    }

    getRandomWord() {
        const randomIndex = Math.floor(Math.random() * this.words.length);
        return this.words[randomIndex];
    }

    getRandomCharacter(characters) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        return characters.charAt(randomIndex);
    }
}