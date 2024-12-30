// ThreeJS
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Custom
import LoopTimer from './modules/LoopTimer.js';
import Vector2D from './modules/Vector2D.js';

// Create Loader
const loader = new GLTFLoader();

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
const geometry = new THREE.ConeGeometry( 0.5, 2, 32 ); 
const material = new THREE.MeshPhysicalMaterial( {color: 0xffff00} ); 
const playerObject = new THREE.Mesh(geometry, material ); 
scene.add( playerObject );

// Spme globals
const moveInput = new Vector2D(0, 0);
const moveSpeed = 5;
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
            calcMoveInput();
            playerObject.position.x += moveInput.x * moveSpeed * deltaTime;
            playerObject.position.y += moveInput.y * moveSpeed * deltaTime;

            console.log('Game Loop');
            deltaTime = gameLoopTimer.loop() / 1000;     
            logicUpdate();       
        }
    }, tickSpeed); // TODO: make this get shorter or longet based on how much time it look to calculate the last frame
}

function calcMoveInput(){
    moveInput.x = 0;
    moveInput.y = 0;

    if (inputs.up) {
        moveInput.y = 1;
    }
    if (inputs.down) {
        moveInput.y = -1;
    }
    if (inputs.left) {
        moveInput.x = -1;
    }
    if (inputs.right) {
        moveInput.x = 1;
    }
}

// Basic animation function for the cube 
function animate() {
	renderer.render( scene, camera );
    animationLoopTimer.loop();
}

// ### Event Listeners ###

// Movement
const inputs = {
    up: false,
    down: false,
    left: false,
    right: false,
}

document.addEventListener('keydown', (event) => {
    console.log('Key pressed:', event.key);

    if (event.key === 'w' || event.key === 'W' || event.key === 'ArrowUp') {
        inputs.up = true;
    }
    if (event.key === 's' || event.key === 'S' || event.key === 'ArrowDown') {
        inputs.down = true;
    }
    if (event.key === 'a' || event.key === 'A' || event.key === 'ArrowLeft') {
        inputs.left = true;
    }
    if (event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight') {
        inputs.right = true;
    }
});

document.addEventListener('keyup', (event) => {
    console.log('Key released:', event.key);

    if (event.key === 'w' || event.key === 'W' || event.key === 'ArrowUp') {
        inputs.up = false;
    }
    if (event.key === 's' || event.key === 'S' || event.key === 'ArrowDown') {
        inputs.down = false;
    }
    if (event.key === 'a' || event.key === 'A' || event.key === 'ArrowLeft') {
        inputs.left = false;
    }
    if (event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight') {
        inputs.right = false;
    }
});

// Event listener for window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
});
