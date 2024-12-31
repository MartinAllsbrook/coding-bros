import CollisionObject from './CollisionObject.js';

export default class Bullet extends CollisionObject {
    constructor(gameScene, position, velocity) {
        super(gameScene, position, 0.1);
        this.velocity = velocity;
    }

    update(deltaTime) {
        this.setPosition(this.position.add(this.velocity.multiply(deltaTime)));
    
        this.gameScene.asteroids.forEach(asteroid => {
            if (this.checkCollision(asteroid)) {
                console.log('Collision detected');
                
                asteroid.destroy();

                this.destroy();
            }
        });
    }

    destroy() {
        super.destroy();
        // this = null; // IDK if this works
    }


}