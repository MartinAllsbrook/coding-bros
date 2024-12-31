import * as THREE from 'three';

export default class RenderedObject {
    constructor(gameScene, position, radius) {
        this.position = position;
        this.gameScene = gameScene;
        this.radius = radius;

        this.object = this.createObject(gameScene.basics.scene, radius);
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
        this.gameScene.basics.scene.remove(this.object); // This should be the gameScene
        this.object.geometry.dispose();
        this.object.material.dispose();
    }
}