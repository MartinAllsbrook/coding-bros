import GameBoard from "./modules/GameBoard.js";
import Word from "./modules/Word.js";

let board = new GameBoard(13, 15)

board.createBoard()

let test_word = new Word("Coder", 4, 4, "diagonal");

let test_word_2 = new Word("Bro", 9, 9, "vertical");

console.log(test_word);
board.addLetters(test_word);
board.addLetters(test_word_2);
console.log(board.display_grid[1][1].innerHTML);
// console.log('main.js loaded');

console.log(board.position_grid)
