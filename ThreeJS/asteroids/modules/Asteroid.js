import * as THREE from 'three';

import Vector2D from './Vector2D.js';
import GameScene from './GameScene.js';
import CollisionObject from './CollisionObject.js';

export default class Asteroid extends CollisionObject{
    constructor(gameScene, startPosition, size) {        
        const maxSpeed = 4 - size;
        const radius = size / 4;

        super(gameScene, startPosition, radius);

        this.asteroidSize = size;

        gameScene.addAsteroid(this);

        const direction = Vector2D.normalRandom();
        direction.normalize();
        this.velocity = direction.multiply(maxSpeed);

        this.xBondary = 10;
        this.yBondary = 5;
    }

    update(deltaTime) {
        let newPosition = this.position;

        const xBoundary = this.gameScene.gameArea.width / 2;
        const yBoundary = this.gameScene.gameArea.height / 2;

        if (newPosition.x > xBoundary || newPosition.x < -xBoundary) {
            newPosition.x *= -1;
        }
        if (newPosition.y > yBoundary || newPosition.y < -yBoundary) {
            newPosition.y *= -1;
        }

        newPosition = newPosition.add(this.velocity.multiply(deltaTime));

        this.setPosition(newPosition);
    }

    destroy() {
        if (this.asteroidSize > 1) {
            new Asteroid(this.gameScene, this.position, this.asteroidSize - 1);
            new Asteroid(this.gameScene, this.position, this.asteroidSize - 1);
        }

        this.gameScene.removeAsteroid(this);

        super.destroy();
    }
}