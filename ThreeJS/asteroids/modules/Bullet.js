import CollisionObject from './CollisionObject.js';
import Scoreboard from './Scoreboard.js';
import GameScene from './GameScene.js';
import ObjectManager from './ObjectManager.js';

export default class Bullet extends CollisionObject {
    constructor(position, velocity) {
        super(position, 0.1, 2);
        this.velocity = velocity;

        this.creationTime = performance.now();
        this.lifetime = 2500;
    }

    update(deltaTime) {
        this.position = this.position.add(this.velocity.multiply(deltaTime));
    
        if (performance.now() - this.creationTime > this.lifetime) {
            this.destroy();
        }

        super.update(deltaTime);
    }

    onCollision(otherObject) {
        Scoreboard.singleton.increment();

        this.destroy();
    }
}