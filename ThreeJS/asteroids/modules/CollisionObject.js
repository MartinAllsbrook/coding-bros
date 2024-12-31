import RenderedObject from './RenderedObject.js';

export default class CollisionObject extends RenderedObject {
    constructor(gameScene, position, radius) {
        super(gameScene, position, radius);
        this.radius = radius;
    }

    checkCollision(otherObject) {
        const distance = this.position.subtract(otherObject.position).magnitude();
        return (distance < this.radius + otherObject.radius);
    }
}