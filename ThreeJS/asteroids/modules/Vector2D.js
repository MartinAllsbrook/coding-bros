export default class Vector2D {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    // Adds two vectors
    add(vector) {
        return new Vector2D(this.x + vector.x, this.y + vector.y);
    }

    // Subtracts two vectors
    subtract(vector) {
        return new Vector2D(this.x - vector.x, this.y - vector.y);
    }

    // Returns a new vector with the same direction but with a magnitude multiplied by a scalar
    multiply(scalar) {
        return new Vector2D(this.x * scalar, this.y * scalar);
    }

    // Returns the magnitude of the vector
    magnitude() {
        return Math.sqrt((Math.pow(Math.abs(this.x), 2)) + (Math.pow(Math.abs(this.y), 2)));
    }

    // Returns a new vector with the same direction but with a magnitude of 1
    normalize() {
        const mag = this.magnitude();
        if (mag === 0) {
            return new Vector2D(0, 0);
        }
        return new Vector2D(this.x / mag, this.y / mag);
    }

    // Rotate the vector by an angle in radians
    rotate(angle) {
        return new Vector2D(
            this.x * Math.cos(angle) - this.y * Math.sin(angle),
            this.x * Math.sin(angle) + this.y * Math.cos(angle)
        );
    }

    // Static methods

    // Returns a unit vector from an angle in radians
    static fromAngle(angle) {
        return new Vector2D(-Math.sin(angle), Math.cos(angle)).normalize();
    }

    // Returns a random vector
    static random() {
        return new Vector2D(Math.random() * 2 - 1, Math.random() * 2 - 1);
    }

    // Returns a random vector with a magnitude of 1
    static normalRandom() {
        return new Vector2D(Math.random() - 0.5, Math.random() - 0.5).normalize();
    }
}