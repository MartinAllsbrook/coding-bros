export default class GameBoard {
    constructor(width, height) {
        this.width = width;
        this.height = height; 
        this.display_grid = [];
        this.position_grid = [];       
    }

    createBoard() {
        let gameboard = document.getElementById("gameboard")
        
        for(let x = 0; x<this.width; x++){
            let column = document.createElement('div');
            column.className = "column"
            column.id = "column" + x;
            gameboard.appendChild(column);
            // console.log("added row");
            this.display_grid[x] = [];
            this.position_grid[x] = [];

            
            for(let y = 0; y<this.height; y++){
                let row = document.createElement('div');
                row.className ="row"
                row.id = "row_" + y+ "_column" +x;
                column.appendChild(row);
                // console.log("added column");
                this.display_grid[x][y] = row;
                this.position_grid[x][y] = true;
            }
        }
    }

    addLetters(word) {
        // If row is not available, return, skipping the rest of the function
        // ! = not, so if checkIfAvailable returns false, then the if statement is true
        if(!this.checkIfAvailable(word)){
            console.warn("No space for word: " + word.word);
            return;
        }

        console.log("Generating " + word.word);
        
        // setting separate variables to track current x and y for each letter
        let x_pos = word.x;
        let y_pos = word.y;

        // if this.display_grid[x_pos][y_pos].innerHTML != 
        for(let i =0; i<word.word.length; i++){

            //adding each letter to a particular square depending on the direction
            this.display_grid[x_pos][y_pos].innerHTML = word.word[i];
            this.position_grid[x_pos][y_pos] = false;

            // Increment the position based on the direction
            [x_pos, y_pos] = this.getIncrementedPosition(x_pos, y_pos, word.direction);
            
        }
    }
    
    // Returns true if the word can be added to the grid, false otherwise
    checkIfAvailable(word){
        let x_pos = word.x;
        let y_pos = word.y;
        let empty = true;

        for(let i = 0; i<word.word.length; i++){
            // Check if the position to be tested is within the grid
            if (x_pos >= this.width || y_pos >= this.height){
                empty = false;
                break;
            }
            
            // Check if the position to be tested is already occupied
            if(this.position_grid[x_pos][y_pos] == false){
                empty = false;
            }

            // Increment the position based on the direction
            [x_pos, y_pos] = this.getIncrementedPosition(x_pos, y_pos, word.direction);
        }

        return empty;
    }

    // Returns an array with the next position based on the direction
    getIncrementedPosition(x, y, direction){
        switch(direction){
            case "horizontal":
                return [x+1, y];
            case "vertical":
                return [x, y+1];
            case "diagonal":
                return [x+1, y+1];
            default:
                console.log("epic fail, " + direction + " is not a valid direction"); 
        }
    }
}
