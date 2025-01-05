import GameObject from "./GameObject.js";

export default class ObjectManager {
    static instance = null;

    constructor() {
        // Create Singleton
        if (ObjectManager.instance == null) {
            ObjectManager.instance = this;
        } else {
            console.error('Cannot create more than one ObjectManager instance');
            return;
        }

        this.objects = [];
    }

    add(object) {
        this.objects.push(object);
    }

    remove(object) {
        this.objects = this.objects.filter(obj => obj !== object);
    }

    update(deltaTime) {
        this.objects.forEach(object => object.update(deltaTime));
    }
}