export default class WordTracker {
    constructor() {
        this.words = [];
        this.selectedCells = [];

        this.wordList = document.getElementById("wordList");
        const trySelectButton = document.getElementById("trySelectionButton");

        trySelectButton.addEventListener('click', () => this.trySelection());
    }
    
    addWord(word) {
        this.words.push(word);

        let listItem = document.createElement('li');
        listItem.textContent = word.word;
        this.wordList.appendChild(listItem);
    }
    
    getWords() {
        return this.words;
    }

    selectTile(Cell){
        let length = this.selectedCells.length;

        // the case for 2 or mroe will always be the same
        if (length >= 2) {
            length = 2;
        }

        let cellAdded = false;

        switch(length){
            case 0:
                this.selectedCells.push(Cell);
                cellAdded = true;
                break;
            case 1:
                // Check if the cell is adjacent to the previous cell
                if (Math.abs(this.selectedCells[0].x - Cell.x) <= 1 && Math.abs(this.selectedCells[0].y - Cell.y) <= 1) {
                    this.selectedCells.push(Cell);
                    cellAdded = true;
                }
                break;    
            case 2:
                if ((this.selectedCells[0].x === this.selectedCells[1].x && this.selectedCells[1].x === Cell.x) ||
                    (this.selectedCells[0].y === this.selectedCells[1].y && this.selectedCells[1].y === Cell.y) ||
                    (Math.abs(this.selectedCells[0].x - this.selectedCells[1].x) === Math.abs(this.selectedCells[0].y - this.selectedCells[1].y) &&
                     Math.abs(this.selectedCells[1].x - Cell.x) === Math.abs(this.selectedCells[1].y - Cell.y))) {
                    this.selectedCells.push(Cell);
                    cellAdded = true;
                }
                break;
            default:
                console.error("epic fail"); 
        }

        return cellAdded;
    }

    deselectCell(){
        // deselect all cells
        this.selectedCells.forEach(selectedCell => {
            selectedCell.deselect();
        });

        // clear the selectedCells array
        this.selectedCells = [];
    }

    trySelection(){
        console.log("Trying selection");
        let selectedWord = "";
        this.selectedCells.forEach(cell => {
            selectedWord += cell.element.textContent;
        });

        this.words.forEach(word => {
            if (word.word === selectedWord) {
                console.log("Found word: " + selectedWord);
                // word.found = true;
                // this.selectedCells.forEach(cell => {
                //     cell.element.classList.add('found');
                // });
            }
        });

        this.deselectCell();
    }
}