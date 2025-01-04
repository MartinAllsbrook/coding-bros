export default class Scoreboard {
    static singleton = null;

    constructor(displayElement) {
        if (Scoreboard.singleton == null){
            Scoreboard.singleton = this;
        } else {
            console.error('Cannot create more than one Scoreboard');
            return;
        }

        this.score = 0;
        this.displayElement = displayElement;
        this.update();
    }

    increment() {
        this.score++;
        this.update();
    }

    update() {
        this.displayElement.innerHTML = `Score: ${this.score}`;
    }
}