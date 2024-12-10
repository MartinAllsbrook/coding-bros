import GameBoard from "./modules/GameBoard.js";
import Word from "./modules/Word.js";
import Dictionary from "./modules/Dictionary.js";

let board = new GameBoard(13, 15)
let dictionary = new Dictionary()

board.createBoard()

let test_word = new Word(dictionary.getRandomWord(), 8, 2, "diagonal");
let test_word_2 = new Word(dictionary.getRandomWord(), 11, 4, "vertical");

console.log(test_word);
board.addLetters(test_word);
board.addLetters(test_word_2);
console.log(board.display_grid[1][1].innerHTML);
// console.log('main.js loaded');

console.log(board.position_grid)

