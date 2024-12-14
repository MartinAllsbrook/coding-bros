export default class WordTracker {
    constructor() {
        this.words = [];
        this.selectedTiles = [];
    }
    
    addWord(word) {
        this.words.push(word);
    }
    
    getWords() {
        return this.words;
    }

    selectTile(Cell){
        const length = this.selectedTiles.length;

        // the case for 2 or mroe will always be the same
        if (length >= 2) {
            this.length = 2;
        }

        switch(length){
            case 0:
                this.selectedTiles.push(Cell);
                break;
            case 1:
                // Check if the cell is adjacent to the previous cell
                if (Math.abs(this.selectedTiles[0].x - Cell.x) <= 1 && Math.abs(this.selectedTiles[0].y - Cell.y) <= 1) {
                    this.selectedTiles.push(Cell);
                }
                break;    
            case 2:
                if ((this.selectedTiles[0].x === this.selectedTiles[1].x && this.selectedTiles[1].x === Cell.x) ||
                    (this.selectedTiles[0].y === this.selectedTiles[1].y && this.selectedTiles[1].y === Cell.y) ||
                    (Math.abs(this.selectedTiles[0].x - this.selectedTiles[1].x) === Math.abs(this.selectedTiles[0].y - this.selectedTiles[1].y) &&
                     Math.abs(this.selectedTiles[1].x - Cell.x) === Math.abs(this.selectedTiles[1].y - Cell.y))) {
                    this.selectedTiles.push(Cell);
                }
                
            default:
                console.error("epic fail"); 
        }
    }
}