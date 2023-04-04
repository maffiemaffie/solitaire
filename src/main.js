import { Solitaire } from "./solitaire.js";

(() => {
    const container = document.querySelector("#solitaire-container");
    const solitaire = new Solitaire(container);
})();