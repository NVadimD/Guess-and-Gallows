import { WORDS } from "./consts"

const gameDiv = document.getElementById('game');

const createPlaceholdersHTML = () => {
    const word = sessionStorage.getItem('word');

    const wordArray = Array.from(word);
    // const arr2 = Array.from('_'.repeat(word.length));

    const placeholdersHTML = wordArray.reduce((acc, curr, i) => acc + `<h1 id="letter_${i}" class='letter'>_</h1>`, '')

    // let placeholdersHTML = '';
    // for (let i = 0; i < word.length; i++){
    //     placeholdersHTML += `<h1 id="letter_${i}" class='letter'>_</h1>`;
    // }
    return `<div id='placeholders' class='placeholders-wrapper'>${placeholdersHTML}</div>`
}

export const startGame = () => {
    const randomInd = Math.floor(Math.random()*WORDS.length);
    const wordToGuess = WORDS[randomInd];
    sessionStorage.setItem('word', wordToGuess);
    gameDiv.innerHTML = createPlaceholdersHTML();
}