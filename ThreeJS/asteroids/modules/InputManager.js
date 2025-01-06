import Vector2D from './Vector2D.js';

export default class InputManager {
    static instance = null;

    // Movement
    moveKeys = {
        up: ['w', 'W', 'ArrowUp'],
        down: ['s', 'S', 'ArrowDown'],
        left: ['q', 'Q', ',', '<'],
        right: ['e', 'E', '.', '>'],
    }

    move = {
        up: false,
        down: false,
        left: false,
        right: false,
    }

    moveValue = new Vector2D(0, 0);

    // Rotation
    rotateKeys = {
        left: ['a', 'A', 'ArrowLeft'],
        right: ['d', 'D', 'ArrowRight'],
    }

    rotate = {
        left: false,
        right: false,
    } 
    rotationValue = 0;
    
    // Shooting
    shootKeys = {
        shoot: [' '],
    }
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

    inputMatch(event, keys) {
        let match = false;
        keys.forEach(key => {
            if (event.key === key) {
                match = true;
            }
        });
        return match;
    }

    onKeyDown(event) {
        // console.log(event.key + ' down');

        // Movement
        if (this.inputMatch(event, this.moveKeys.up)) {
            this.move.up = true;
        }
        if (this.inputMatch(event, this.moveKeys.down)) {
            this.move.down = true;
        }
        if (this.inputMatch(event, this.moveKeys.left)) {
            this.move.left = true;
        }
        if (this.inputMatch(event, this.moveKeys.right)) {
            this.move.right = true;
        }
    
        // Rotation
        if (this.inputMatch(event, this.rotateKeys.left)) {
            this.rotate.left = true;
        }
        if (this.inputMatch(event, this.rotateKeys.right)) {
            this.rotate.right = true;
        }
    
        // Shooting
        if (this.inputMatch(event, this.shootKeys.shoot)) {
            this.shoot = true;
        }

        // Update the values to be used in the game
        this.updateValues();
    }

    onKeyUp(event) {
        // console.log(event.key + ' up');

        // Movement
        if (this.inputMatch(event, this.moveKeys.up)) {
            this.move.up = false;
        }
        if (this.inputMatch(event, this.moveKeys.down)) {
            this.move.down = false;
        }
        if (this.inputMatch(event, this.moveKeys.left)) {
            this.move.left = false;
        }
        if (this.inputMatch(event, this.moveKeys.right)) {
            this.move.right = false;
        }
    
        // Rotation
        if (this.inputMatch(event, this.rotateKeys.left)) {
            this.rotate.left = false;
        }
        if (this.inputMatch(event, this.rotateKeys.right)) {
            this.rotate.right = false;
        }
    
        // Shooting
        if (this.inputMatch(event, this.shootKeys.shoot)) {
            this.shoot = false;
        }

        // Update the values to be used in the game
        this.updateValues();
    }
}