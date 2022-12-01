
'use strict';

import { onEvent, select } from "./functions.js";
import { Score } from "./classes.js";

const timer = select('.time-para');
const feedBackForTime = select('.time-left');
const btn = select('.btn');
const givenWord = select('.question');
const userInput = select('.input');
const points = select('.point-para');
const body = select('.body');
const head = select('.head');
const feedSection = select('.feedback');
const restartBtn = select('.restart-btn');

const bgMusic = new Audio('./assets/media/bg-music.mp3');
bgMusic.type = 'audio/mp3';

const bgMusic2 = new Audio('./assets/media/bg-music-2.mp3');
bgMusic2.type = 'audio/mp3';

// =======================================================================================

const words = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population',
    'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute',
    'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle',
    'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy',
    'database', 'periodic', 'capitalism', 'abominable', 'component', 'future',
    'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency',
    'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician',
    'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution',
    'banana', 'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music',
    'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button',
    'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
    'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery',
    'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
    'keyboard', 'window'];

let wordsLength = words.length;

function producingWords() {
    for (let i = 0; i < wordsLength; i++) {
        let k = Math.floor(Math.random() * words.length);
        givenWord.innerText = words[k];
    }
}


// =======================================================================================

const array = [];
function test() {
    let userAnswer = givenWord.innerText;
    let answer = userInput.value.trim().toLowerCase();
    if (userAnswer === answer) {

        userInput.value = '';
        array.push(userAnswer);
        points.innerText = array.length;
    }
}

onEvent('keyup', userInput, function () {
    test();
    if (userInput.value == '') {
        producingWords();
    }
});



// =======================================================================================



function progress() {
    const now = new Date();
    let date = now.toString().substring(0, 15);
    let hits = array.length;
    let percent = (100 * hits) / words.length;
    let percentage = percent.toFixed(1)

    const score = new Score(date, hits, percentage);
    const dateP = score.getDate();
    const hitsP = score.getHits();
    const percentP = score.getPercentage();

    btn.innerText = 'Restart';
    const progessDiv = document.createElement('div');
    feedSection.appendChild(progessDiv);

    const paraOne = document.createElement('p');
    progessDiv.appendChild(paraOne)
    paraOne.innerHTML = `<h2>Date:</h2>
    <p>${dateP}</p>`;

    const paraTwo = document.createElement('p');
    progessDiv.appendChild(paraTwo)
    paraTwo.innerHTML = `<h2>Hits:</h2>
    <p>${hitsP}</p>`;

    const paraThree = document.createElement('p');
    progessDiv.appendChild(paraThree)
    paraThree.innerHTML = `<h2>Progress:</h2>
    <p>${percentP}%</p>`;

    body.style.visibility = 'hidden';
    head.style.visibility = 'hidden';
    feedSection.style.visibility = 'visible';

}


let timeLeft = 99;
onEvent('click', btn, function () {
    userInput.focus();
    bgMusic.play();
    const countDown = setInterval(() => {
        if (timeLeft <= 0) clearInterval(countDown)
        timer.innerText = timeLeft;
        timeLeft -= 1;
        if (timer.innerText == 0) {
            feedBackForTime.innerText = 'Game Over';
            progress();
            bgMusic.pause();
            bgMusic2.play();
        }
    }, 1000)

    producingWords();

});


onEvent('click', restartBtn, function () {
    bgMusic2.pause();
    window.location.reload();
});


















