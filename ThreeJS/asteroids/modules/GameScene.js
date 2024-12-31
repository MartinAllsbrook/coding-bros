import * as THREE from 'three';

import LoopTimer from './LoopTimer.js';

export default class GameScene {
    constructor() {
        const windowToScene = 110;
        
        this.windowArea = {
            width: window.innerWidth,
            height: window.innerHeight,
        }

        this.gameArea = {
            width: this.windowArea.width / windowToScene,
            height: this.windowArea.height / windowToScene,

            // width: windowToScene,
            // height: windowToScene * this.window.height / this.window.width,
        }

        this.basics = this.createThreeJSScene();
    }

    createThreeJSScene() {
        // Create scene 
        const scene = new THREE.Scene();
        
        // Create a camera
        const camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.1, 1000 );
        camera.position.z = 5;
        camera.translateZ( 5 );
        
        // Create a renderer
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( this.windowArea.width, this.windowArea.height );

        // Event listener for window resizing
        window.addEventListener('resize', () => {
            this.windowArea.width = window.innerHeight;
            this.windowArea.height = window.innerWidth;
            camera.aspect = this.windowArea.width / this.windowArea.height;
            camera.updateProjectionMatrix();
            renderer.setSize( this.windowArea.width, this.windowArea.height );
        });

        
        // Start render loop and time it
        const animationLoopTimer = new LoopTimer(document.getElementById('renderLoopTime'), "Render");
        renderer.setAnimationLoop( () => {
            renderer.render( scene, camera );
            animationLoopTimer.loop();
        } ); 
        
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
        
        // Store these objects for later
        const sceneBasics = {
            scene: scene,
            camera: camera,
            renderer: renderer,
            animationLoopTimer: animationLoopTimer,
            directionalLight: directionalLight,
            directionalLightTarget: directionalLightTarget,
            ambientLight: ambientLight,
        }

        return sceneBasics;
    }
    
}