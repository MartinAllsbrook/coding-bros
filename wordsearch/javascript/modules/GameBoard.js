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
        let x_pos = Word.x;
        let y_pos = Word.y;
        
        for(let i =0; i<Word.word.length; i++){
            // setting separate variables to track current x and y for each letter
            
            // console.log(this.grid[x_pos][y_pos]);
            console.log(i);

            //adding each letter to a particular square depending on the direction
            
            if (Word.direction == "horizontal"){
                this.grid[x_pos][y_pos].innerHTML = Word.word[i];
                console.log("x position is " + x_pos + "y position is" + y_pos);
                x_pos+=1;
            
            
            } else if(Word.direction == 'vertical'){
                this.grid[x_pos][y_pos].innerHTML = Word.word[i];
                console.log("x position is " + x_pos + "y position is" + y_pos);
                y_pos+=1;
           
           
            } else if(Word.direction == 'diagonal'){
                this.grid[x_pos][y_pos].innerHTML = Word.word[i];
                console.log("x position is " + x_pos + "y position is" + y_pos);
                y_pos+=1;
                x_pos-=1;   
            
            
            }  else{
                console.log("epic fail");
            }
            
        }
    }
        

}
