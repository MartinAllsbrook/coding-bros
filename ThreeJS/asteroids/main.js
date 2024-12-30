// ThreeJS
import * as THREE from 'three';

// Custom
import LoopTimer from './modules/LoopTimer.js';
import Vector2D from './modules/Vector2D.js';
import Player from './modules/Player.js';


// Create scene 
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;
camera.translateZ( 5 );

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

// Start render loop and time it
const animationLoopTimer = new LoopTimer(document.getElementById('renderLoopTime'), "Render");
renderer.setAnimationLoop( animate ); 

// Add the renderer to the body
document.body.appendChild( renderer.domElement );
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.top = 0;
renderer.domElement.style.left = 0;
renderer.domElement.style.width = '100%';
renderer.domElement.style.height = '100%';
renderer.domElement.style.zIndex = -1;

// Background color
renderer.setClearColor(0x000000, 1); // The second argument is the alpha value (0 for fully transparent)

// Create a directional light
const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
const directionalLightTarget = directionalLight.target;
scene.add( directionalLight );
scene.add( directionalLightTarget );   
directionalLightTarget.position.set(1, -1, -1);

// Create an ambient light
const ambientLight = new THREE.AmbientLight( 0x404040, 2 ); // soft white light scene.add( light );
scene.add( ambientLight );

// Create plaer object
const player = new Player(scene);

// Some globals TODO: move these to a class
let deltaTime = 0;

// Game loop
let gameOver = false;
const tickSpeed = 16;
const gameLoopTimer = new LoopTimer(document.getElementById('gameLoopTime'), "Game");
logicUpdate();
function logicUpdate() {  // What happens each gametick
    setTimeout (() => { // Recursive call with setTimeout() calls the method every tickSpeed milisecconds
        if (!gameOver) {
            // Move player
            let moveInput = calcMoveInput();
            let rotationInput = calcRotationInput();

            player.move(moveInput, deltaTime);
            player.rotate(rotationInput, deltaTime);

            console.log('Game Loop');
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

// Basic animation function for the cube 
function animate() {
	renderer.render( scene, camera );
    animationLoopTimer.loop();
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
    }
}

document.addEventListener('keydown', (event) => {
    console.log('Key pressed:', event.key);

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
});

document.addEventListener('keyup', (event) => {
    console.log('Key released:', event.key);

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
});

// Event listener for window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
});
