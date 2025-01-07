import * as THREE from 'three';

import Vector2D from './Vector2D.js';
import GameScene from './GameScene.js';
import CollisionObject from './CollisionObject.js';
import ObjectManager from './ObjectManager.js';
import AsteroidManager from './AsteroidManager.js';

export default class Asteroid extends CollisionObject{
    explosionSound = new Audio('audio/soundFX/AsteroidExplosion.mp3');

    constructor(startPosition, size) {        
        const maxSpeed = 4 - size;
        const radius = size / 4;

        super(startPosition, radius, 1);

        this.asteroidSize = size;

        AsteroidManager.instance.add(this);

        const direction = Vector2D.normalRandom();
        direction.normalize();
        this.velocity = direction.multiply(maxSpeed);

        this.xBondary = 10;
        this.yBondary = 5;

        console.log(`Asteroid size: ${size} value: ${this.getAstroidValue()}`);
    }

    update(deltaTime) {
        this.position = this.position.add(this.velocity.multiply(deltaTime));

        super.update(deltaTime);
    }

    onCollision(otherObject) {
        this.destroy();
    }

    getAstroidValue(){
        let value = Asteroid.valueOf(this.asteroidSize);
        return value;
    }

    destroy() {
        this.explosionSound.play();

        const numChildren = Asteroid.numChildren(this.asteroidSize);

        if (this.asteroidSize > 1) {
            for (let i = 0; i < numChildren; i++) {
                new Asteroid(this.position, this.asteroidSize - 1);
            }
        }

        AsteroidManager.instance.remove(this);

        super.destroy();
    }

    static valueOf(size){
        let value = 1;
        for (let i = 2; i < size + 1; i++) {
            value *= Asteroid.numChildren(i); 
            value += 1;
        }
        return value;
    }

    static numChildren(size) {
        return 5 - size;
    }
}