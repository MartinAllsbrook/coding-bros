import GameBoard from "./modules/GameBoard.js";


let board = new GameBoard(10, 10)

board.createBoard()
board.addLetters()
console.log('main.js loaded');

console.log(board.grid)