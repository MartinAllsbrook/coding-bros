// USed for timing how long it takes for each loop to run
export default class LoopTimer {
    constructor(displayElement, name) {
        this._time = 0;
        this._delta = 0;
        this._lastTime = 0;

        this._displayElement = displayElement;
        this.name = name;

        this.start();
    }

    start() {
        this._lastTime = performance.now();
    }

    loop() {
        this._time = performance.now();
        this._delta = this._time - this._lastTime;
        this._lastTime = this._time;

        this._displayElement.innerHTML = `${this.name} Loop Time: ${this._delta}ms`;

        return this._delta;
    }
}