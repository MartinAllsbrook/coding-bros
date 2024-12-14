export default class Word {
    constructor(word, direction,  x, y) {
        this.word = word;
        this.x = x;
        this.y = y;
        
        this.direction = direction;
    
        this.length = word.length;
    }   

    
}