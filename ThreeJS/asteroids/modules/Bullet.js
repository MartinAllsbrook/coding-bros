

import CollisionObject from './CollisionObject.js';
import Scoreboard from './Scoreboard.js';

export default class Bullet extends CollisionObject {
    constructor(gameScene, position, velocity) {
        super(gameScene, position, 0.1);
        this.velocity = velocity;

        this.creationTime = performance.now();
        this.lifetime = 2500;
    }

    update(deltaTime) {
        this.setPosition(this.position.add(this.velocity.multiply(deltaTime)));
    
        if (performance.now() - this.creationTime > this.lifetime) {
            this.destroy();
        }

        this.gameScene.asteroids.forEach(asteroid => {
            if (this.checkCollision(asteroid)) {
                this.asteriodHit(asteroid);
            }
        });
    }

    asteriodHit(asteroid) {
        Scoreboard.singleton.increment();

        console.log('Collision detected');
                
        asteroid.destroy();

        this.destroy();
    }

    destroy() {
        super.destroy();

        this.gameScene.removeBullet(this);
        // this = null; // IDK if this works
    }


}