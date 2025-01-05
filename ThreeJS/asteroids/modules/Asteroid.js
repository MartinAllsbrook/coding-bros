import * as THREE from 'three';

import Vector2D from './Vector2D.js';
import GameScene from './GameScene.js';
import CollisionObject from './CollisionObject.js';
import ObjectManager from './ObjectManager.js';

export default class Asteroid extends CollisionObject{
    constructor(startPosition, size) {        
        const maxSpeed = 4 - size;
        const radius = size / 4;

        super(startPosition, radius, 1);

        this.asteroidSize = size;

        GameScene.instance.addAsteroid(this);

        const direction = Vector2D.normalRandom();
        direction.normalize();
        this.velocity = direction.multiply(maxSpeed);

        this.xBondary = 10;
        this.yBondary = 5;
    }

    update(deltaTime) {
        let newPosition = this.position;

        const xBoundary = GameScene.instance.gameArea.width / 2;
        const yBoundary = GameScene.instance.gameArea.height / 2;

        if (newPosition.x > xBoundary || newPosition.x < -xBoundary) {
            newPosition.x *= -1;
        }
        if (newPosition.y > yBoundary || newPosition.y < -yBoundary) {
            newPosition.y *= -1;
        }

        newPosition = newPosition.add(this.velocity.multiply(deltaTime));

        this.setPosition(newPosition);
    }

    onCollision(otherObject) {
        this.destroy();
    }

    destroy() {
        const numChildren = 5 - this.asteroidSize;

        if (this.asteroidSize > 1) {
            for (let i = 0; i < numChildren; i++) {
                new Asteroid(this.position, this.asteroidSize - 1);
            }
        }

        ObjectManager.instance.remove(this);

        super.destroy();
    }
}