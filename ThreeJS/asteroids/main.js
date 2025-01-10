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
import InputManager from './modules/InputManager.js';
import AsteroidManager from './modules/AsteroidManager.js';
import MusicManager from './modules/MusicManager.js';
import Settings from './modules/Settings.js';

let windowWith = window.innerWidth;
let windowHeight = window.innerHeight;

// get test

// Create singletons
new Settings(document.getElementById('settings'));
new GameScene();
new Scoreboard(document.getElementById('scoreboard'));
new ObjectManager();
new CollisionManager();
new InputManager();
new AsteroidManager();
new MusicManager();

// Create plaer object
const player = new Player();

// Some globals TODO: move these to a class
let deltaTime = 0;

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
                        
            // console.log('Game Loop');
            deltaTime = gameLoopTimer.loop() / 1000;     
            logicUpdate();       
        }
    }, tickSpeed); // TODO: make this get shorter or longet based on how much time it look to calculate the last frame
}