import Vector2D from './Vector2D.js';

export default class InputManager {
    static instance = null;

    // Movement
    move = {
        up: false,
        down: false,
        left: false,
        right: false,
    }
    moveValue = new Vector2D(0, 0);

    // Rotation
    rotate = {
        left: false,
        right: false,
    }
    rotationValue = 0;
    
    // Shooting
    shoot = false;

    constructor() {
        if (InputManager.instance == null) {
            InputManager.instance = this;
        } else {
            console.error('Cannot create more than one InputManager instance');
            return;
        }

        this.setUpEvents();
    }

    // Getters
    getMoveInput(){
        return this.moveValue;
    }

    getRotationInput(){
        return this.rotationValue;
    }

    getShootInput(){
        return this.shoot;
    }

    // Updating
    updateValues() {
        this.calcMoveValue();
        this.calcRotationValue();
    }

    calcMoveValue(){
        this.moveValue = new Vector2D(0, 0);
    
        if (this.move.up) {
            this.moveValue.y += 1;
        }
        if (this.move.down) {
            this.moveValue.y += -1;
        }
        if (this.move.left) {
            this.moveValue.x += -1;
        }
        if (this.move.right) {
            this.moveValue.x += 1;
        }
    }

    calcRotationValue(){
        this.rotationValue = 0;
    
        if (this.rotate.left) {
            this.rotationValue += 1;
        }
        if (this.rotate.right) {
            this.rotationValue += -1;
        }    
    }

    // Event Listeners
    setUpEvents() {
        window.addEventListener('keydown', (event) => {
            this.onKeyDown(event);
        });
        window.addEventListener('keyup', (event) => {
            this.onKeyUp(event);
        });
    }

    onKeyDown(event) {
        // console.log(event.key + ' down');

        // Movement
        if (event.key === 'w' || event.key === 'W' || event.key === 'ArrowUp') {
            this.move.up = true;
        }
        if (event.key === 's' || event.key === 'S' || event.key === 'ArrowDown') {
            this.move.down = true;
        }
        if (event.key === 'a' || event.key === 'A' || event.key === 'ArrowLeft') {
            this.move.left = true;
        }
        if (event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight') {
            this.move.right = true;
        }
    
        // Rotation
        if (event.key === 'q' || event.key === 'Q' || event.key === ',' || event.key === '<') {
            this.rotate.left = true;
        }
        if (event.key === 'e' || event.key === 'E' || event.key === '.' || event.key === '>') {
            this.rotate.right = true;
        }
    
        // Shooting
        if (event.key === ' ') {
            this.shoot = true;
        }

        // Update the values to be used in the game
        this.updateValues();
    }

    onKeyUp(event) {
        // console.log(event.key + ' up');

        // Movement
        if (event.key === 'w' || event.key === 'W' || event.key === 'ArrowUp') {
            this.move.up = false;
        }
        if (event.key === 's' || event.key === 'S' || event.key === 'ArrowDown') {
            this.move.down = false;
        }
        if (event.key === 'a' || event.key === 'A' || event.key === 'ArrowLeft') {
            this.move.left = false;
        }
        if (event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight') {
            this.move.right = false;
        }
    
        // Rotation
        if (event.key === 'q' || event.key === 'Q' || event.key === ',' || event.key === '<') {
            this.rotate.left = false;
        }
        if (event.key === 'e' || event.key === 'E' || event.key === '.' || event.key === '>') {
            this.rotate.right = false;
        }
    
        // Shooting
        if (event.key === ' ') {
            this.shoot = false;
        }

        // Update the values to be used in the game
        this.updateValues();
    }
}