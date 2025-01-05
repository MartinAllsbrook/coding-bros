import ObjectManager from "./ObjectManager.js";

export default class GameObject {
    constructor() {
        ObjectManager.instance.add(this);
    }

    update(deltaTime) {

    }

    destroy() {
        ObjectManager.instance.remove(this);
    }
}