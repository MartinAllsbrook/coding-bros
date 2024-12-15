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

        this.directions = ['horizontal', 'vertical', 'diagonal'];
        
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        //this.characters = 'a';
    }
    // Returns a random word from the words array
    getRandomWord() {
        const randomIndex = Math.floor(Math.random() * this.words.length);
        return this.words[randomIndex];
    }

    getRandomDirection() {
        const randomIndex = Math.floor(Math.random() * this.directions.length);
        return this.directions[randomIndex];
    }

    // Returns a random character from the characters string
    getRandomCharacter() {
        const randomIndex = Math.floor(Math.random() * this.characters.length);
        return this.characters.charAt(randomIndex);
    }
}
