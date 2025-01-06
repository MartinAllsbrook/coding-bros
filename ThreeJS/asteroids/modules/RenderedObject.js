import * as THREE from 'three';
import GameObject from './GameObject.js';
import GameScene from './GameScene.js';

export default class RenderedObject extends GameObject {
    constructor(position, radius) {
        super();

        this.position = position;
        this.radius = radius;

        this.object = this.createObject(GameScene.instance.basics.scene, radius);
        this.setPosition();
    }

    update(deltaTime) {
        const xBoundary = GameScene.instance.gameArea.width / 2;
        const yBoundary = GameScene.instance.gameArea.height / 2;

        if (this.position.x > xBoundary || this.position.x < -xBoundary || this.position.y > yBoundary || this.position.y < -yBoundary) {
            this.onOutsideBoundary();
        }

        this.setPosition();
    }

    onOutsideBoundary() {
        const epsilon = 0.1;

        const xBoundary = GameScene.instance.gameArea.width / 2; // stop calculating this every time
        const yBoundary = GameScene.instance.gameArea.height / 2;

        if (this.position.x > xBoundary) {
            this.position.x = -xBoundary + epsilon;
        }
        if (this.position.x < -xBoundary) {
            this.position.x = xBoundary - epsilon;
        }
        if (this.position.y > yBoundary) {
            this.position.y = -yBoundary + epsilon;
        }
        if (this.position.y < -yBoundary) {
            this.position.y = yBoundary - epsilon;
        }

    }

    createObject(scene, radius) {
        const geometry = new THREE.SphereGeometry( radius, 32, 32 ); 
        const material = new THREE.MeshPhysicalMaterial( {color: 0xffffff} ); 
        const object = new THREE.Mesh(geometry, material ); 

        scene.add( object );

        return object;
    }

    setPosition() { // TODO: This should not have an argument
        this.object.position.x = this.position.x;
        this.object.position.y = this.position.y;
    }

    destroy() {
        GameScene.instance.basics.scene.remove(this.object); // This should be the gameScene
        this.object.geometry.dispose();
        this.object.material.dispose();
    }
}