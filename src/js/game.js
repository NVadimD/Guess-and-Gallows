import { WORDS, KEYBOARD_LETTERS } from "./consts";

const gameDiv = document.getElementById("game");
const logoH1 = document.getElementById("logo");

let triesLeft;

const createPlaceholdersHTML = () => {
    const word = sessionStorage.getItem("word");
    const wordArray = Array.from(word);
    const placeholdersHTML = wordArray.reduce((acc, curr, i) => {
        return acc + `<h1 id='letter_${i}' class='letter'>_</h1>`;
    }, "");

    return `<div id='placeholders' class='placeholders-wrapper'>${placeholdersHTML}</div>`;
};

const createKeyboard = () => {
    const keyboard = document.createElement("div");
    keyboard.id = "keyboard";
    keyboard.classList.add("keyboard");

    const keyboardHTML = KEYBOARD_LETTERS.reduce((acc, curr) => {
        return (
            acc +
            `<button id='${curr}' class='button-primary keyboard-button'>${curr}</button>`
        );
    }, "");

    keyboard.innerHTML = keyboardHTML;
    return keyboard;
};

const createGallowsImg = () => {
    const image = document.createElement("img");
    image.src = "images/hg-0.png";
    image.alt = "gallows image";
    image.id = "gallows-img";
    image.classList.add("gallows-img");

    return image;
};


const checkLetter = (letter) => {
    const word = sessionStorage.getItem('word');
    const inputLetter = letter.toLowerCase();
    if (!word.includes(inputLetter)) {
        const triesCounter = document.getElementById('tries-left');
        triesLeft -= 1;
        triesCounter.innerText = triesLeft;

        const gallowsImg = document.getElementById('gallows-img');
        gallowsImg.src = `images/hg-${10 - triesLeft}.png`;
    } else {
        const wordArray = Array.from(word);
        wordArray.forEach((currentLetter, i) => {
            if (currentLetter === inputLetter) {
                document.getElementById(`letter_${i}`).innerText = inputLetter.toUpperCase();
            }
        })
    }
}


export const startGame = () => {
    triesLeft = 10;

    logoH1.classList.add("logo-sm");
    const randomInd = Math.floor(Math.random() * WORDS.length);
    const wordToGuess = WORDS[randomInd];
    sessionStorage.setItem("word", wordToGuess);

    gameDiv.innerHTML = createPlaceholdersHTML();

    gameDiv.innerHTML += `<p id='tries' class='mt-2'>TRIES LEFT: <span id='tries-left' class='font-medium text-red-600'>10</span></p>`;

    const keyboardDiv = createKeyboard();
    keyboardDiv.addEventListener("click", function (event) {
        if (event.target.tagName === 'BUTTON'){
            event.target.disabled = true;
            checkLetter(event.target.id);
        }
    });

    const gallowsImg = createGallowsImg();
    gameDiv.prepend(gallowsImg);

    gameDiv.appendChild(keyboardDiv);
};
