export default class GameBoard {
    constructor(width, height) {
        this.width = width;
        this.height = height; 
        this.grid = [];       
    }

    createBoard() {
        let gameboard = document.getElementById("gameboard")
        
        for(let y = 0; y<this.height; y++){
            let row = document.createElement('div');
            row.className = "row"
            row.id = "row" + y;
            gameboard.appendChild(row);
            console.log("added row");
            this.grid[y] = [];
            
            for(let x = 0; x<this.width; x++){
                let column = document.createElement('div');
                column.className ="column"
                column.id = "row_" + y+ "_column" +x;
                row.appendChild(column);
                console.log("added column");
                this.grid[y][x] = column
            }
        }
    }

    addLetters() {
        for(let row = 0; row < this.height; row++) {
            for (let column = 0; column<this.width; column++){
                this.grid[column][row].innerHTML = 'A';
                console.log("Added letter");
            }
        }
    }
}
