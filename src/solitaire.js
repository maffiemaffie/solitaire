import { Board } from "./board.js";

export class Solitaire {
    board;

    constructor(parent) {
        this.board = new Board();
        parent.insertAdjacentElement('afterbegin', this.board.element);
    }
}