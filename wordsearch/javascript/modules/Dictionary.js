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

    // Returns a random word from the words array
    getRandomWord() {
        const randomIndex = Math.floor(Math.random() * this.words.length);
        return this.words[randomIndex];
    }

    // Returns a random character from the characters string
    getRandomCharacter(characters) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        return characters.charAt(randomIndex);
    }
}