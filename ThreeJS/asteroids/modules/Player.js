// ThreeJS
import * as THREE from 'three';

// Custom
import Vector2D from './Vector2D.js';
import CollisionObject from './CollisionObject.js';

export default class Player extends CollisionObject{
    constructor(gameScene) {
        super(gameScene, new Vector2D(0, 0), 1);
        this.rotation = 0;

        // Constants
        this.moveSpeed = 3;
        this.rotationSpeed = 1;
    }

    rotate(rotationInput, deltaTime) {
        this.object.rotation.z += rotationInput * this.rotationSpeed * deltaTime;
    }

    move(moveInput, deltaTime) {
        moveInput = moveInput.normalize();
        const newPosition = this.position.add(moveInput.multiply(this.moveSpeed * deltaTime));
        this.setPosition(newPosition);
    }

    update(deltaTime, moveInput, rotationInput) {
        this.move(moveInput, deltaTime);
        this.rotate(rotationInput, deltaTime);

        this.gameScene.asteroids.forEach(asteroid => {
            if (this.checkCollision(asteroid)) {
                console.log('Collision detected');
                // gameScene.removeAsteroid(asteroid);
                // gameScene.removeBullet(this);
            }
        });
    }
}