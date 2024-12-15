export default class Word {
    constructor(word, direction,  x, y) {
        this.word = word;
        this.x = x;
        this.y = y;
        
        this.direction = direction;
    
        this.length = word.length;

        this.letterPositions = [];
    }   

    addLetterPositions(xPositions, yPositoins){
        for(let i = 0; i<this.length; i++){
            const position = {
                x: xPositions[i], 
                y: yPositoins[i]
            };

            this.letterPositions.push(position);
        }
    }

    addLetterPosition(xPos, yPos){
        const position = {
            x: xPos, 
            y: yPos
        };

        this.letterPositions.push(position);
    }
}