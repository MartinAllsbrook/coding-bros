import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// Create Loader
const loader = new GLTFLoader();

// List of objects that should look at the cursor
let objectsToLookAtCursor = [];

let suzzane;
loadObjectFromFile('idcard', './public/passport/passport.gltf', true, testCallback);

// color test
let color1 = new THREE.Color(0xff0000);
let color2 = new THREE.Color(0x00ff00);
let color3 = new THREE.Color(0x0000ff);


// Materials
let mp_green = {
    color: 0x00ff00,
};
let mp_blue = {
    color: 0x0000ff,
};
let mp_red = {
    color: 0xff0000,
};

let mp_default = {
    color: color3,
}

// Create scene 
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate ); 
document.body.appendChild( renderer.domElement );

renderer.setClearColor(0x000000, 1); // The second argument is the alpha value (0 for fully transparent)

// Basic Box Geometry
const geometry = new THREE.BoxGeometry( 1, 1, 1 );

// Create a directional light
const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
const directionalLightTarget = directionalLight.target;
scene.add( directionalLight );
scene.add( directionalLightTarget );   
directionalLightTarget.position.set(1, -1, -1);

const ambientLight = new THREE.AmbientLight( 0x404040, 10 ); // soft white light scene.add( light );
scene.add( ambientLight );

// Little testing function lol
// testingCubes();

// ### Functions ###

// Basic animation function for the cube 
function animate() {
	renderer.render( scene, camera );
}

function lookAtScreenPos(object, x, y){
    const divisor = 210;
    const sensitivity = 10;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    x = (x - windowHalfX) / divisor;
    y = -(y - windowHalfY) / divisor; // This /10 is impersice I wonder if there's a better weay to do it

    const objectPosition = object.position; 
    const cursorPosition = new THREE.Vector3(x, y, sensitivity);

    const lookPosition = cursorPosition.sub(objectPosition);

    object.lookAt(lookPosition);
}

function loadObjectFromFile(objectName, filePath, addObjectToScene = true, callback = null) {
    let loadedObject;

    loader.load(filePath, 
    (gltf) => { 
        // Access the loaded model here
        const gltfScene = gltf.scene;

        if (addObjectToScene)
            scene.add(gltfScene); 
    
        // Access specific objects by name
        loadedObject = gltf.scene.getObjectByName(objectName);
        console.log(loadedObject);

        if (callback != null)
            callback(loadedObject);
    }, 
    (xhr) => {
        // Optional: Progress callback
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }, 
    (error) => {
        // Optional: Error callback
        console.error('An error happened', error);
    });
}

function testCallback(object){
    objectsToLookAtCursor.push(object);
}

function testingCubes(){
    const material = new THREE.MeshPhongMaterial( mp_red );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.x = 2;
    scene.add( cube );

    const material2 = new THREE.MeshPhysicalMaterial( mp_blue );
    const cube2 = new THREE.Mesh( geometry, material2 );
    cube2.position.x = -2;
    scene.add( cube2 );

    const material3 = new THREE.MeshMatcapMaterial( mp_green );
    const cube3 = new THREE.Mesh( geometry, material3 );
    cube3.position.y = 2;
    scene.add( cube3 );
}

// ### Event Listeners ###

// Event listener for window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
});

// Event listener for mouse movement
document.addEventListener('mousemove', (event) => {
    let x = event.clientX;
    let y = event.clientY;
    // console.log(x, y);
    
    objectsToLookAtCursor.forEach((object) => {
        lookAtScreenPos(object, x, y);
    });

    
});