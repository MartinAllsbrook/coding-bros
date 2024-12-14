export default class Cell {
    constructor(x, y, element) {
        this.x = x;
        this.y = y;
        this.element = element;
        this.selected = false;
    }

    clickCell(wordTracker) {
        if (this.selected) {
            wordTracker.deselectCell(this)
        } else {
            this.select(wordTracker);
        }
    }

    // Selects the cell
    select(wordTracker) {
        let selected = wordTracker.selectTile(this);

        if (selected) {
            this.selected = true;
            this.element.classList.add('selected');
        }
    }

    // Deselects the cell
    deselect() {
        this.selected = false;
        this.element.classList.remove('selected');
    }
}