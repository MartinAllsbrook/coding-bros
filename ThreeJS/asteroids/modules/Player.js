// ThreeJS
import * as THREE from 'three';

// Custom
import Vector2D from './Vector2D.js';
import CollisionObject from './CollisionObject.js';
import Bullet from './Bullet.js';
import GameScene from './GameScene.js';
import InputManager from './InputManager.js';
import MusicManager from './MusicManager.js';
import SoundFXSource from './SoundFXSource.js';

export default class Player extends CollisionObject{
    // Movement schemes
    // 0 => W / Forward Only
    // 1 => W & D / Forward and Backward
    // 2 => WASD / Full Movement
    movementScheme = 2; 

    // Movement
    velocity = new Vector2D(0, 0);
    maxSpeed = 5;
    acceleration = 5;
    decceleration = 2;
    
    rotation = 0; // In radians

    rotationSpeed = 1;

    bulletSpeed = 5;
    fireRate = 700;

    engineAudio = new SoundFXSource('EngineSound', true, 0.5);
    fireAudio = new SoundFXSource('BasicLaserSound', false, 1);
    destroyAudio = new SoundFXSource('ShipExplosion', false, 1);

    constructor() {
        super(new Vector2D(3, 3), 0.5, 0);

        this.lastFireTime = performance.now();
    }

    update(deltaTime) {
        this.move(InputManager.instance.getMoveInput(), deltaTime);
        this.rotate(InputManager.instance.getRotationInput(), deltaTime);

        if (InputManager.instance.getShootInput() && (performance.now() - this.lastFireTime > this.fireRate)) {
            this.fire();
            this.lastFireTime = performance.now();
        }

        super.update(deltaTime);
    }

    move(moveInput, deltaTime) {
        // Apply movement scheme
        switch (this.movementScheme) {
            case 0:
                moveInput = this.moveForward(moveInput, deltaTime);
                break;
            case 1:
                moveInput = this.moveForwardBackward(moveInput, deltaTime);
                break;
            case 2:
                moveInput = this.moveFull(moveInput, deltaTime);
                break;
            default:
                break;
        }

        if (moveInput.magnitude() > 0) {
            this.engineAudio.playIfPaused();
        } else if (moveInput.magnitude() <= 0) {
            this.engineAudio.pauseIfPlaying();
        }

        this.physicsUpdate(moveInput, deltaTime);
    }

    moveForward(moveInput, deltaTime) {
        moveInput.x = 0;
        // Only move forward
        if (moveInput.y < 0) { 
            moveInput.y = 0; 
        }

        moveInput = moveInput.rotate(this.rotation);

        return moveInput;
    }

    moveForwardBackward(moveInput, deltaTime) {
        moveInput.x = 0;

        moveInput = moveInput.rotate(this.rotation);

        return moveInput;
    }

    moveFull(moveInput, deltaTime) {
        moveInput = moveInput.normalize();

        moveInput = moveInput.rotate(this.rotation);

        return moveInput;
    }

    physicsUpdate(moveInput, deltaTime) {
        // Apply decceleration
        this.velocity = this.velocity.multiply(1 - this.decceleration * deltaTime);

        // Apply acceleration
        this.velocity = this.velocity.add(moveInput.multiply(this.acceleration * deltaTime));

        // Limit speed
        if (this.velocity.magnitude() > this.maxSpeed) {
            this.velocity = this.velocity.normalize().multiply(this.maxSpeed);
        }

        // Update position
        this.position = this.position.add(this.velocity.multiply(deltaTime));
    }

    rotate(rotationInput, deltaTime) {
        this.rotation += rotationInput * this.rotationSpeed * deltaTime;
        this.object.rotation.z = this.rotation;
    }

    fire() {
        // Create bullet
        const direction = Vector2D.fromAngle(this.rotation);
        const bullet = new Bullet(this.position, direction.multiply(this.bulletSpeed));
        GameScene.instance.addBullet(bullet);

        // Play fire sounds
        this.fireAudio.playWithRandomPitch(0.1);
    }

    createObject(scene, radius) {
        console.log('Creating player object override');
        const newObject = super.createObject(scene, radius);    
        
        const coneHeight = 1;

        const geometry = new THREE.ConeGeometry( radius, coneHeight, 32 ); 
        const material = new THREE.MeshPhysicalMaterial( {color: 0xffffff} ); 
        const cone = new THREE.Mesh(geometry, material ); 

        scene.add( cone );
        scene.add( newObject );

        newObject.attach( cone );

        console.log(this.radius);
        cone.position.y += coneHeight / 2;



        return newObject;
    }

    onCollision(otherObject) {
        console.log('Game Over');

        this.destroy();
    }

    destroy() {
        this.engineAudio.pauseIfPlaying();
        this.destroyAudio.playFromStart();

        MusicManager.instance.playSong("GameOver");

        super.destroy();
    }
} 