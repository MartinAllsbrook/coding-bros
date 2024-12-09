export default class GameBoard {
    constructor(width, height) {
        this.width = width;
        this.height = height;        
    }

    createBoard() {
        let gameboard = document.getElementById("gameboard")
        
        
        for(let y = 0; y<=this.height; y++){
           let row = document.createElement('div');
           row.className = "row"
           row.id = "row" + y;
           gameboard.appendChild(row);
           console.log("added row");
           for(let x = 0; x<=this.width; x++){
            let column = document.createElement('div');
            column.className ="column"
            column.id = "row_" + y+ "_column" +x;
            row.appendChild(column);
            console.log("added column");
             
 
 
 
         }



        }
        
    }
    
}