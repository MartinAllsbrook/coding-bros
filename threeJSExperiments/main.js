import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// Create Loader
const loader = new GLTFLoader();

// List of objects that should look at the cursor
let objectsToLookAtCursor = [];

let suzzane;
loadObjectFromFile('Suzanne', './models/monkeyHead.gltf', false, testCallback);

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

// Basic Box Geometry
const geometry = new THREE.BoxGeometry( 1, 1, 1 );

// Green Matcap Material cube
const material = new THREE.MeshPhongMaterial( mp_red );
const cube = new THREE.Mesh( geometry, material );
cube.position.x = 2;
scene.add( cube );

const material2 = new THREE.MeshPhysicalMaterial( mp_blue );
const cube2 = new THREE.Mesh( geometry, material2 );
cube2.position.x = -2;
scene.add( cube2 );

console.log(cube2);

const material3 = new THREE.MeshMatcapMaterial( mp_green );
const cube3 = new THREE.Mesh( geometry, material3 );
cube3.position.y = 2;
scene.add( cube3 );
// Create a directional light
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );

// ### Functions ###

// Basic animation function for the cube 
function animate() {
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

    cube2.rotation.x -= 0.01;
	cube2.rotation.y -= 0.01;

	renderer.render( scene, camera );
}

function lookAtScreenPos(object, x, y){
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    x = (x - windowHalfX) / (windowHalfX / 10);
    y = -(y - windowHalfY) / (windowHalfY / 10); // This /10 is impersice I wonder if there's a better weay to do it

    const objectPosition = object.position; 
    const cursorPosition = new THREE.Vector3(x, y, 5);

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
    const grid = createGrid(object, 5, 2);
    const children = grid.children;

    children.forEach(child => {
        objectsToLookAtCursor.push(child);
    });

    // let objectDuplicate = object.clone();

    // scene.add(object);
    // objectsToLookAtCursor.push(object);
    // object.position.x = -2;

    // scene.add(objectDuplicate);
    // objectsToLookAtCursor.push(objectDuplicate);
}

function createGrid(object, size, spacing) {
    const grid = new THREE.Group();
    const halfSize = (size - 1) / 2;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const objectClone = object.clone();
            objectClone.position.set(
                (i - halfSize) * spacing,
                (j - halfSize) * spacing,
                0
            );
            grid.add(objectClone);
        }
    }

    scene.add(grid);
    return grid;
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