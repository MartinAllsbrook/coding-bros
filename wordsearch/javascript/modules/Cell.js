export default class Cell {
    constructor(x, y, element) {
        this.x = x;
        this.y = y;
        this.element = element;
        this.selected = false;
    }

    clickCell() {
        if (this.selected) {
            this.deselect();
        } else {
            this.select();
        }
    }

    // Selects the cell
    select() {
        this.selected = true;
        this.element.classList.add('selected');
    }

    // Deselects the cell
    deselect() {
        this.selected = false;
        this.element.classList.remove('selected');
    }
}