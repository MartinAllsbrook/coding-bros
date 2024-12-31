import * as THREE from 'three';

import Vector2D from './Vector2D.js';
import GameScene from './GameScene.js';

export default class Asteroid {
    constructor(scene, startPosition, maxSpeed) {
        this.position = startPosition;
        this.radius = 0.5;
        this.scene = scene;

        const direction = new Vector2D(Math.random() * 2 - 1, Math.random() * 2 - 1);
        direction.normalize();
        this.velocity = direction.multiply(maxSpeed);
    
        this.object = this.createObject(scene.basics.scene);

        this.xBondary = 10;
        this.yBondary = 5;

    }

    createObject(scene) {
        const geometry = new THREE.SphereGeometry( this.radius, 32, 32 ); 
        const material = new THREE.MeshPhysicalMaterial( {color: 0xffffff} ); 
        const object = new THREE.Mesh(geometry, material ); 
        scene.add( object );
        return object;
    }

    update(deltaTime) {
        this.position = this.position.add(this.velocity.multiply(deltaTime));

        const xBoundary = this.scene.gameArea.width / 2;
        const yBoundary = this.scene.gameArea.height / 2;

        if (this.position.x > xBoundary || this.position.x < -xBoundary) {
            this.position.x *= -1;
        }
        if (this.position.y > yBoundary || this.position.y < -yBoundary) {
            this.position.y *= -1;
        }

        this.object.position.x = this.position.x;
        this.object.position.y = this.position.y;
    }
}