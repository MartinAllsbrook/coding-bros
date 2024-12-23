import * as THREE from 'three';

// Materials
let mp_green = {
    color: 0x00ff00,
    blendAlpha: 0.5
};
let mp_blue = {
    color: 0x0000ff,
    blendAlpha: 0.5
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
const material = new THREE.MeshMatcapMaterial( mp_green );
const cube = new THREE.Mesh( geometry, material );
cube.position.x = 1;
scene.add( cube );

const material2 = new THREE.MeshPhysicalMaterial( mp_blue );
const cube2 = new THREE.Mesh( geometry, material2 );
scene.add( cube2 );

// Create a directional light
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );

// Basic animation function for the cube 
function animate() {

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

    cube2.rotation.x -= 0.01;
	cube2.rotation.y -= 0.01;

	renderer.render( scene, camera );

}