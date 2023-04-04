import { Card } from "./card.js";

export class Board {
    cards = [];
    element;
    tableau;
    foundations;
    stock;
    waste;

    constructor() {
        this.element = document.createElement('div');
        this.element.id = "sol-board";

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

        this.tableau = new Tableau();
        for (let col = 0; col < 7; col++) {
            for (let _ = 7; _ > col; _--) {
                this.tableau.addCard(col, this.cards.splice(0, 1)[0]);
            }
        }
        this.element.insertAdjacentElement('beforeend', this.tableau.element);

        this.stock = {};
        this.stock.cards = [...this.cards];

        this.foundations = {};
        this.foundations.cards = [[], [], [], []];

        this.waste = {};
        this.waste.cards = [];
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

class Tableau {
    stacks;
    element;

    constructor() {
        this.stacks = [];
        
        this.element = document.createElement('div');
        this.element.id = "sol-tableau";
        for (let i = 0; i < 7; i++) {
            this.stacks[i] = new TableauStack();
            this.element.insertAdjacentElement('beforeend', this.stacks[i].element);
        }
    }

    addCard(stack, card) {
        this.stacks[stack].addCard(card);
    }
}

class TableauStack {
    cards;
    element;

    constructor(cards = []) {
        this.cards = cards;
        
        this.element = document.createElement('div');
        this.element.classList.add('sol-column');
        this.cards.forEach(card => {
            this.element.insertAdjacentElement('beforeend', card.element);
        });
    }

    addCard(card) {
        this.cards.push(card);
        this.element.insertAdjacentElement('beforeend', card.element);
    }
}