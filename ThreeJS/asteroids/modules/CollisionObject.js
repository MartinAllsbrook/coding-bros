import RenderedObject from './RenderedObject.js';

export default class CollisionObject extends RenderedObject {
    constructor(position, radius) {
        super(position, radius);
        this.radius = radius;
    }

    checkCollision(otherObject) {
        const distance = this.position.subtract(otherObject.position).magnitude();
        return (distance < this.radius + otherObject.radius);
    }
}