import { Card } from "./card.js";

export class Board {
    cards = [];
    element;

    constructor() {
        this.element = document.createElement('div');
        this.element.id = "board";

        Card.back = new Image();
        Card.back.src = 'https://d2ph5fj80uercy.cloudfront.net/04/cat2972.jpg';

        for (let suit of Object.keys(Card.Suit)) {
            for (let i = 1; i <= 13; i++) {
                const face = new Image();
                // face.src = `media/cards/${suit}-${i}.png`;
                face.src = 'https://d2ph5fj80uercy.cloudfront.net/04/cat2972.jpg';
                this.cards.push(new Card(i, suit, face));
            }
        }

        this.cards = this.#shuffle(this.cards);

        const cardsCopy = [...this.cards];
        for (let col = 0; col < 7; col++) {
            const thisCol = document.createElement('div');
            thisCol.classList.add("column");
            this.element.insertAdjacentElement('afterbegin', thisCol);
            for (let _ = 0; _ <= col; _++) {
                const thisCard = cardsCopy.splice(0, 1)[0];
                thisCol.insertAdjacentElement('beforeend', thisCard.element);
            }
        }
    }

    #shuffle(arr) {
        const shuffled = [];
        const arrCopy = [...arr];

        while (arrCopy.length > 0) {
            const thisCard = arrCopy.splice(this.#pickRandom(arrCopy), 1)[0];
            shuffled.push(thisCard);
        }

        return shuffled;
    }

    #pickRandom(arr) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }
}