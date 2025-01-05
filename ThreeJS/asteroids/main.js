// ThreeJS
import * as THREE from 'three';

// Custom
import GameScene from './modules/GameScene.js';
import LoopTimer from './modules/LoopTimer.js';
import Vector2D from './modules/Vector2D.js';
import Player from './modules/Player.js';
import Asteroid from './modules/Asteroid.js';
import Scoreboard from './modules/Scoreboard.js';
import ObjectManager from './modules/ObjectManager.js';
import CollisionManager from './modules/CollisionManager.js';

let windowWith = window.innerWidth;
let windowHeight = window.innerHeight;

// Create singletons
new GameScene();
new Scoreboard(document.getElementById('scoreboard'));
new ObjectManager();
new CollisionManager();

// Create plaer object
const player = new Player();

// Some globals TODO: move these to a class
let deltaTime = 0;

// Create some asteroids for testing
new Asteroid(new Vector2D(0, 0), 1);
new Asteroid(new Vector2D(0, 0), 2);
new Asteroid(new Vector2D(0, 0), 3);

// Game loop
let gameOver = false;
const tickSpeed = 16;
const gameLoopTimer = new LoopTimer(document.getElementById('gameLoopTime'), "Game");
logicUpdate();

// Main game loop
function logicUpdate() {  // What happens each gametick
    setTimeout (() => { // Recursive call with setTimeout() calls the method every tickSpeed milisecconds
        if (!gameOver) {
            ObjectManager.instance.update(deltaTime);
            CollisionManager.instance.checkCollisions();
            // Move player
            let moveInput = calcMoveInput();
            let rotationInput = calcRotationInput();

            player.setInputs(moveInput, rotationInput, inputs.shoot);
            
            // console.log('Game Loop');
            deltaTime = gameLoopTimer.loop() / 1000;     
            logicUpdate();       
        }
    }, tickSpeed); // TODO: make this get shorter or longet based on how much time it look to calculate the last frame
}

function calcMoveInput(){
    let moveInput = new Vector2D(0, 0);

    if (inputs.move.up) {
        moveInput.y += 1;
    }
    if (inputs.move.down) {
        moveInput.y += -1;
    }
    if (inputs.move.left) {
        moveInput.x += -1;
    }
    if (inputs.move.right) {
        moveInput.x += 1;
    }

    return moveInput;
}

function calcRotationInput(){
    let rotationInput = 0;

    if (inputs.rotate.left) {
        rotationInput += 1;
    }
    if (inputs.rotate.right) {
        rotationInput += -1;
    }

    return rotationInput;
}

// ### Event Listeners ###

// Movement
const inputs = {
    move: {
        up: false,
        down: false,
        left: false,
        right: false,
    },

    rotate: {
        left: false,
        right: false,
    },

    shoot: false
}

document.addEventListener('keydown', (event) => {
    // console.log('Key pressed:', event.key);

    // Movement
    if (event.key === 'w' || event.key === 'W' || event.key === 'ArrowUp') {
        inputs.move.up = true;
    }
    if (event.key === 's' || event.key === 'S' || event.key === 'ArrowDown') {
        inputs.move.down = true;
    }
    if (event.key === 'a' || event.key === 'A' || event.key === 'ArrowLeft') {
        inputs.move.left = true;
    }
    if (event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight') {
        inputs.move.right = true;
    }

    // Rotation
    if (event.key === 'q' || event.key === 'Q' || event.key === ',' || event.key === '<') {
        inputs.rotate.left = true;
    }
    if (event.key === 'e' || event.key === 'E' || event.key === '.' || event.key === '>') {
        inputs.rotate.right = true;
    }

    // Shooting
    if (event.key === ' ') {
        inputs.shoot = true;
    }
});

document.addEventListener('keyup', (event) => {
    // console.log('Key released:', event.key);

    if (event.key === 'w' || event.key === 'W' || event.key === 'ArrowUp') {
        inputs.move.up = false;
    }
    if (event.key === 's' || event.key === 'S' || event.key === 'ArrowDown') {
        inputs.move.down = false;
    }
    if (event.key === 'a' || event.key === 'A' || event.key === 'ArrowLeft') {
        inputs.move.left = false;
    }
    if (event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight') {
        inputs.move.right = false;
    }

    // Rotation
    if (event.key === 'q' || event.key === 'Q' || event.key === ',' || event.key === '<') {
        inputs.rotate.left = false;
    }
    if (event.key === 'e' || event.key === 'E' || event.key === '.' || event.key === '>') {
        inputs.rotate.right = false;
    }

    // Shooting
    if (event.key === ' ') {
        inputs.shoot = false;
    }
});


