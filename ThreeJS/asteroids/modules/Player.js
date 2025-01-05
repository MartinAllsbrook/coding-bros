// ThreeJS
import * as THREE from 'three';

// Custom
import Vector2D from './Vector2D.js';
import CollisionObject from './CollisionObject.js';
import Bullet from './Bullet.js';
import GameScene from './GameScene.js';
import InputManager from './InputManager.js';

export default class Player extends CollisionObject{
    moveInput = new Vector2D(0, 0);
    rotationInput = 0;
    fireInput = false;
    
    constructor() {
        super(new Vector2D(3, 3), 0.5, 0);
        this.rotation = 0;

        // Constants
        this.moveSpeed = 3;
        this.rotationSpeed = 1;

        this.bulletSpeed = 5;
        this.lastFireTime = performance.now();
        this.fireRate = 1000;
    }

    rotate(rotationInput, deltaTime) {
        this.rotation += rotationInput * this.rotationSpeed * deltaTime;
        this.object.rotation.z = this.rotation;
    }

    move(moveInput, deltaTime) {
        moveInput = moveInput.normalize();
        const newPosition = this.position.add(moveInput.multiply(this.moveSpeed * deltaTime));
        this.setPosition(newPosition);
    }

    setInputs(moveInput, rotationInput, fireInput){
        this.moveInput = moveInput;
        this.rotationInput = rotationInput;
        this.fireInput = fireInput;
    }
a
    update(deltaTime) {
        this.move(InputManager.instance.getMoveInput(), deltaTime);
        this.rotate(InputManager.instance.getRotationInput(), deltaTime);

        if (InputManager.instance.getShootInput() && (performance.now() - this.lastFireTime > this.fireRate)) {
            this.fire();
            this.lastFireTime = performance.now();
        }
    }

    fire() {
        const direction = Vector2D.fromAngle(this.rotation);

        const bullet = new Bullet(this.position, direction.multiply(this.bulletSpeed));

        console.log(this.rotation)
        GameScene.instance.addBullet(bullet);
    }

    createObject(scene, radius) {
        console.log('Creating player object override');
        const newObject = super.createObject(scene, radius);    
        
        const coneHeight = 1;

        const geometry = new THREE.ConeGeometry( radius, coneHeight, 32 ); 
        const material = new THREE.MeshPhysicalMaterial( {color: 0xffffff} ); 
        const cone = new THREE.Mesh(geometry, material ); 

        scene.add( cone );
        scene.add( newObject );

        newObject.attach( cone );

        console.log(this.radius);
        cone.position.y += coneHeight / 2;



        return newObject;
    }

    onCollision(otherObject) {
        console.log('Game Over');

        this.destroy();
    }
} 