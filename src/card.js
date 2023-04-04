export class Card {
    value;
    suit;
    face;
    static back;

    state;
    element;

    static State = Object.freeze({
        'DOWN'  : 0,
        'UP'    : 1
    });

    static Suit = Object.freeze({
        'Hearts'    : 0,
        'Spades'    : 1,
        'Diamonds'  : 2,
        'Clubs'     : 3
    });

    constructor(value, suit, face) {
        this.value = value;
        this.suit = suit;
        this.face = face;
        this.state = Card.State.DOWN;

        this.element = document.createElement('div');
        const thisBack = Card.back.cloneNode();
        this.element.insertAdjacentElement('afterbegin', thisBack);

        this.element.setAttribute('draggable', true);
        this.element.classList.add('sol-card');
    }

    flip() {
        this.state = !this.state;
    }
}