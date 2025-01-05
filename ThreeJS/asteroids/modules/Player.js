// ThreeJS
import * as THREE from 'three';

// Custom
import Vector2D from './Vector2D.js';
import CollisionObject from './CollisionObject.js';
import Bullet from './Bullet.js';
import GameScene from './GameScene.js';
import InputManager from './InputManager.js';

export default class Player extends CollisionObject{
    // Movement schemes
    // 0 => W / Forward Only
    // 1 => W & D / Forward and Backward
    // 2 => WASD / Full Movement
    movementScheme = 1; 

    constructor() {
        super(new Vector2D(3, 3), 0.5, 0);
        this.rotation = 0; // In radians

        // Constants
        this.moveSpeed = 3;
        this.rotationSpeed = 1;

        this.bulletSpeed = 5;
        this.lastFireTime = performance.now();
        this.fireRate = 1000;
    }

    update(deltaTime) {
        this.move(InputManager.instance.getMoveInput(), deltaTime);
        this.rotate(InputManager.instance.getRotationInput(), deltaTime);

        if (InputManager.instance.getShootInput() && (performance.now() - this.lastFireTime > this.fireRate)) {
            this.fire();
            this.lastFireTime = performance.now();
        }
    }

    move(moveInput, deltaTime) {
        switch (this.movementScheme) {
            case 0:
                this.moveForward(moveInput, deltaTime);
                break;
            case 1:
                this.moveForwardBackward(moveInput, deltaTime);
                break;
            case 2:
                this.moveFull(moveInput, deltaTime);
                break;
            default:
                break;
        }
    }

    moveForward(moveInput, deltaTime) {
        // Only move forward
        moveInput.x = 0;
        if (moveInput.y < 0) {
            moveInput.y = 0;
        }

        moveInput = moveInput.rotate(this.rotation);

        const newPosition = this.position.add(moveInput.multiply(this.moveSpeed * deltaTime));
        this.setPosition(newPosition);
    }

    moveForwardBackward(moveInput, deltaTime) {
        moveInput.x = 0;

        moveInput = moveInput.rotate(this.rotation);

        const newPosition = this.position.add(moveInput.multiply(this.moveSpeed * deltaTime));
        this.setPosition(newPosition);
    }

    moveFull(moveInput, deltaTime) {
        moveInput = moveInput.normalize();

        moveInput = moveInput.rotate(this.rotation);

        const newPosition = this.position.add(moveInput.multiply(this.moveSpeed * deltaTime));
        this.setPosition(newPosition);
    }

    rotate(rotationInput, deltaTime) {
        this.rotation += rotationInput * this.rotationSpeed * deltaTime;
        this.object.rotation.z = this.rotation;
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