export default class GameBoard {
    constructor(width, height) {
        this.width = width;
        this.height = height; 
        this.display_grid = [];
        this.position_grid = [];       
    }

    createBoard() {
        let gameboard = document.getElementById("gameboard")
        
        for(let y = 0; y<this.height; y++){
            let row = document.createElement('div');
            row.className = "row"
            row.id = "row" + y;
            gameboard.appendChild(row);
            // console.log("added row");
            this.display_grid[y] = [];
            this.position_grid[y] = [];

            
            for(let x = 0; x<this.width; x++){
                let column = document.createElement('div');
                column.className ="column"
                column.id = "row_" + y+ "_column" +x;
                row.appendChild(column);
                // console.log("added column");
                this.display_grid[y][x] = column;
                this.position_grid[y][x] = true;
            }
        }
    }

    addLetters(Word) { 
        // setting separate variables to track current x and y for each letter
        let x_pos = Word.x;
        let y_pos = Word.y;

        // if this.display_grid[x_pos][y_pos].innerHTML != 
        
        for(let i =0; i<Word.word.length; i++){

            //adding each letter to a particular square depending on the direction
            
            if (Word.direction == "horizontal"){
                //adds letters by square in our grid, then moves one square to the right
                this.display_grid[x_pos][y_pos].innerHTML = Word.word[i];
                this.position_grid[x_pos][y_pos] = false;
                x_pos+=1;
            
            
            } else if(Word.direction == 'vertical'){
                //adds letters by square in our grid, then moves one square down
                this.display_grid[x_pos][y_pos].innerHTML = Word.word[i];
                this.position_grid[x_pos][y_pos] = false;
                y_pos+=1;
           
           
            } else if(Word.direction == 'diagonal'){
                // adds letters by square in our grid, then movies one square up and one square to the right
                this.display_grid[x_pos][y_pos].innerHTML = Word.word[i];
                this.position_grid[x_pos][y_pos] = false;
                y_pos+=1;
                x_pos-=1;   
            
            
            }  else{
                console.log("epic fail");
            }
            
        }
    }
        

}
