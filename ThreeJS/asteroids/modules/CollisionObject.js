import CollisionManager from './CollisionManager.js';
import RenderedObject from './RenderedObject.js';

export default class CollisionObject extends RenderedObject {
    constructor(position, radius, collisionLayer) {
        super(position, radius);
        this.radius = radius;
        this.collisionLayer = collisionLayer;

        CollisionManager.instance.add(this, collisionLayer);
    }

    checkCollision(otherObject) {
        const distance = this.position.subtract(otherObject.position).magnitude();
        return (distance < this.radius + otherObject.radius);
    }

    onCollision(otherObject) {
        // Override this method
    }

    destroy() {
        CollisionManager.instance.remove(this, this.collisionLayer);
        super.destroy();
    }
}