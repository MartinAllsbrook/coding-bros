import * as THREE from 'three';
import GameObject from './GameObject.js';
import GameScene from './GameScene.js';

export default class RenderedObject extends GameObject {
    constructor(position, radius) {
        super();

        this.position = position;
        this.radius = radius;

        this.object = this.createObject(GameScene.instance.basics.scene, radius);
        this.setPosition(this.position);
    }

    createObject(scene, radius) {
        const geometry = new THREE.SphereGeometry( radius, 32, 32 ); 
        const material = new THREE.MeshPhysicalMaterial( {color: 0xffffff} ); 
        const object = new THREE.Mesh(geometry, material ); 

        scene.add( object );

        return object;
    }

    setPosition(position) {
        this.position = position;
        this.object.position.x = position.x;
        this.object.position.y = position.y;
    }

    destroy() {
        GameScene.instance.basics.scene.remove(this.object); // This should be the gameScene
        this.object.geometry.dispose();
        this.object.material.dispose();
    }
}