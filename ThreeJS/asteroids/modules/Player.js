// ThreeJS
import * as THREE from 'three';

// Custom
import Vector2D from './Vector2D.js';

export default class Player {
    constructor(scene) {
        this.position = new Vector2D();
        this.rotation = 0;

        this.object = this.createObject(scene);

        // Constants
        this.moveSpeed = 3;
        this.rotationSpeed = 1;
    }

    createObject(scene) {
        const geometry = new THREE.ConeGeometry( 0.5, 2, 32 ); 
        const material = new THREE.MeshPhysicalMaterial( {color: 0xffff00} ); 
        const playerObject = new THREE.Mesh(geometry, material ); 
        scene.add( playerObject );
        return playerObject;
    }

    rotate(deltaRotation, deltaTime) {
        this.object.rotation.z += deltaRotation * this.rotationSpeed * deltaTime;
    }

    move(moveVector, deltaTime) {
        const move = moveVector.multiply(this.moveSpeed * deltaTime);
        this.object.position.x += move.x;
        this.object.position.y += move.y;
    }
}