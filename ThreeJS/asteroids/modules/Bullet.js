import CollisionObject from './CollisionObject.js';
import Scoreboard from './Scoreboard.js';
import GameScene from './GameScene.js';

export default class Bullet extends CollisionObject {
    constructor(position, velocity) {
        super(position, 0.1);
        this.velocity = velocity;

        this.creationTime = performance.now();
        this.lifetime = 2500;
    }

    update(deltaTime) {
        this.setPosition(this.position.add(this.velocity.multiply(deltaTime)));
    
        if (performance.now() - this.creationTime > this.lifetime) {
            this.destroy();
        }

        GameScene.instance.asteroids.forEach(asteroid => {
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

        GameScene.instance.removeBullet(this);
        // this = null; // IDK if this works
    }
}