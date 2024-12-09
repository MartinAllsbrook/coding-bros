import GameBoard from "./modules/GameBoard.js";


let board = new GameBoard(15, 15)

board.createBoard()
board.addLetters()
console.log('main.js loaded');

console.log(board.grid)