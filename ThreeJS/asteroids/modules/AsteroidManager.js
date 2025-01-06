import Asteroid from "./Asteroid.js";
import GameScene from "./GameScene.js";
import Vector2D from "./Vector2D.js";

export default class AsteroidManager {
    static instance;
    
    asteroids = [];

    minAstroidValue = 4;
    maxAstroidValue = 12;

    constructor() {
        if(AsteroidManager.instance == null){
            AsteroidManager.instance = this;
        } else {
            console.error('Cannot create more than one AsteroidManager instance');
            return;
        }
        
        this.fillAsteroids();
    }

    add(asteroid) {
        this.asteroids.push(asteroid);
    }

    remove(asteroid) {
        const index = this.asteroids.indexOf(asteroid);
        if (index > -1) {
            this.asteroids.splice(index, 1);
        }

        this.checkAstoridValue();
    }

    totalValue() {
        let total = 0;
        for (let asteroid of this.asteroids) {
            total += asteroid.getAstroidValue();
        }
        return total;
    }

    checkAstoridValue() {
        if (this.totalValue() < this.minAstroidValue) {
            this.fillAsteroids();
        }
    }

    fillAsteroids() {
        while (this.totalValue() < this.maxAstroidValue) {
            this.spawnAsteroid(3);
        }
    }

    spawnAsteroid(maxSize){

        const width = GameScene.instance.gameArea.width;
        const height = GameScene.instance.gameArea.height;

        const x = Math.random() * width - width / 2; 
        const y = Math.random() * height - height / 2;
        
        const position = new Vector2D(x, y);
        
        new Asteroid(position, Math.ceil(Math.random() * maxSize));
    }
}
