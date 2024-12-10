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
            // console.log("added row");
            this.grid[y] = [];
            
            for(let x = 0; x<this.width; x++){
                let column = document.createElement('div');
                column.className ="column"
                column.id = "row_" + y+ "_column" +x;
                row.appendChild(column);
                // console.log("added column");
                this.grid[y][x] = column
            }
        }
    }

    addLetters(Word) { 
        // setting separate variables to track current x and y for each letter
        let x_pos = Word.x;
        let y_pos = Word.y;
        
        for(let i =0; i<Word.word.length; i++){

            //adding each letter to a particular square depending on the direction
            
            if (Word.direction == "horizontal"){
                //adds letters by square in our grid, then moves one square to the right
                this.grid[x_pos][y_pos].innerHTML = Word.word[i];
                x_pos+=1;
            
            
            } else if(Word.direction == 'vertical'){
                //adds letters by square in our grid, then moves one square down
                this.grid[x_pos][y_pos].innerHTML = Word.word[i];
                
                y_pos+=1;
           
           
            } else if(Word.direction == 'diagonal'){
                // adds letters by square in our grid, then movies one square up and one square to the right
                this.grid[x_pos][y_pos].innerHTML = Word.word[i];
                y_pos+=1;
                x_pos-=1;   
            
            
            }  else{
                console.log("epic fail");
            }
            
        }
    }
        

}
