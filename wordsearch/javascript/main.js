import GameBoard from "./modules/GameBoard.js";
import Word from "./modules/Word.js";
import Dictionary from "./modules/Dictionary.js";




let board = new GameBoard(13, 15);
let dictionary = new Dictionary();

// initialize the amount of words we are adding
const num_words = 15;

// word list for the words we will be adding to the board

let words_to_add = [];

// display the board by using this function
board.createBoard()



let word_counter = num_words;

// pick random words and add to the array that we created above
for(let i = 0; i<num_words; i++){
    // initialize x position and y position of each word based on dimensions of gameboard
    let x_pos = getRandomInt(0, board.width);
    let y_pos = getRandomInt(0, board.height);
    let current_word = new Word(dictionary.getRandomWord(), dictionary.getRandomDirection(), x_pos, y_pos);
    if(board.checkIfAvailable(current_word) == true){
        board.addWord(current_word);
        word_counter -= 1;
        console.log("Added word to the board")
    }
}

board.addFiller();
    
console.log(board.position_grid); 

