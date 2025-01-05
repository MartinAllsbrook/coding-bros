import CollisionObject from "./CollisionObject.js";

export default class CollisionManager {
    static instance = null;



    constructor() {
        // Create Singleton
        if (CollisionManager.instance == null) {
            CollisionManager.instance = this;
        } else {
            console.error('Cannot create more than one CollisionManager instance');
            return;
        }

        // 2D array to store which layers can collide with each other
        // 0 = player
        // 1 = asteroids
        // 2 = bullets
        this.collisionMatix = [
            //   0  1  2    
                [0],        // 0
                [1, 0],     // 1
                [0, 1, 0]   // 2
            ]

            console.log(this.collisionMatix[0][0]);

        this.colliders = [];
        for (let i = 0; i < this.collisionMatix.length; i++) {
            this.colliders.push([]);
        }
    }

    add(collider, layer) {
        this.colliders[layer].push(collider);
    }

    remove(collider, layer) {
        const index = this.colliders[layer].indexOf(collider);
        if (index > -1) {
            this.colliders[layer].splice(index, 1);
        }
    }

    checkCollisions() {
        // For each layer
        for (let i = 0; i < this.colliders.length; i++) {
            // For each other layer
            for (let j = 0; j <= i; j++) {
                // If the layers can collide
                if (this.collisionMatix[i][j]) {
                    this.checkLayerCollions(i, j);
                }
            }
        }

        // console.log(`Checking collisions for ${this.colliders.length} layers with ${this.colliders.flat().length} colliders`);s
        // console.log(`i = ${i}, j = ${j}, this.collisionMatix[i][j] = ${this.collisionMatix[i][j]}`);
        // console.log(`Checking collisions between layer ${i} and layer ${j}`);
    }

    checkLayerCollions(layer1, layer2) {
        for (let i = 0; i < this.colliders[layer1].length; i++) {
            for (let j = 0; j < this.colliders[layer2].length; j++) {

                const collider1 = this.colliders[layer1][i];
                const collider2 = this.colliders[layer2][j];

                if(collider1 === collider2 || !collider1 || !collider2){
                    continue;
                }

                const collision = this.colliders[layer1][i].checkCollision(this.colliders[layer2][j]);
                if (collision) {
                    this.colliders[layer1][i].onCollision(this.colliders[layer2][j]);
                    this.colliders[layer2][j].onCollision(this.colliders[layer1][i]);
                }
            }
        }

        // console.log(`Checking collisions between ${layer1}, ${i}, ${this.colliders[layer1][i]} and ${layer2} ${j} ${this.colliders[layer2][j]}`);

    }
}
