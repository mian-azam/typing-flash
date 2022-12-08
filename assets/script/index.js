
'use strict';

import { onEvent, select } from "./functions.js";
import { Score } from "./classes.js";

const timer = select('.time-para');
const feedBackForTime = select('.time-left');
const btn = select('.btn');
const btnTwo = select('.btn-two');
const btnBack = select('.back');
const givenWord = select('.question');
const userInput = select('.input');
const points = select('.point-para');
const body = select('.game-body');
const head = select('.head');
const feedSection = select('.feedback');
const restartBtn = select('.restart-btn');
const dialog = select('.dialog');
const scoreList = select('.score-list');


const bgMusic = new Audio('./assets/media/bg-music.mp3');
bgMusic.type = 'audio/mp3';

const bgMusic2 = new Audio('./assets/media/bg-music-2.mp3');
bgMusic2.type = 'audio/mp3';

const backVideo = select('.back-video');



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
        producingWords();
        userInput.value = '';
        array.push(userAnswer);
        points.innerText = array.length;
    }
}

onEvent('keyup', userInput, function () {
    test();
});


//==============================================================================

function gettingScore() {
    const now = new Date();
    const hits = array.length;
    const percent = (100 * hits) / words.length;
    const percentage = percent.toFixed(1)

    const score = {
        score: hits,
        percent: percentage
    }

    let empty = []
    const hScores = localStorage.getItem('highScores');
    const highScores = JSON.parse(hScores) || empty;

    highScores.push(score);

    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(9);

    localStorage.setItem('highScores', JSON.stringify(highScores));



    onEvent('click', btnTwo, function () {
        scoreList.innerHTML = highScores.map(score => {
            return `<li> ${highScores.indexOf(score) + 1} ${score.score} | ${score.percent}`;
        })
    });

}
gettingScore();





// =======================================================================================



function progress() {

    const now = new Date();
    const date = now.toString().substring(0, 15);
    const hits = array.length;
    const percent = (100 * hits) / words.length;
    const percentage = percent.toFixed(1);

    gettingScore();

    //==============================================================================
    btn.innerText = 'Restart';
    const progessDiv = document.createElement('div');
    feedSection.appendChild(progessDiv);


    const paraOne = document.createElement('p');
    progessDiv.appendChild(paraOne)
    paraOne.innerHTML = `<h2>Date:</h2>
    <p>${date}</p>`;

    const paraTwo = document.createElement('p');
    progessDiv.appendChild(paraTwo)
    paraTwo.innerHTML = `<h2>Hits:</h2>
    <p>${hits}</p>`;

    const paraThree = document.createElement('p');
    progessDiv.appendChild(paraThree)
    paraThree.innerHTML = `<h2>Progress:</h2>
    <p>${percentage}%</p>`;



    body.style.visibility = 'hidden';
    head.style.visibility = 'hidden';
    feedSection.style.visibility = 'visible';

}


let timeLeft = 10;
onEvent('click', btn, function () {
    userInput.focus();
    bgMusic.play();
    const countDown = setInterval(() => {
        if (timeLeft <= 0) clearInterval(countDown)
        timer.innerText = timeLeft;
        timeLeft -= 1;
        if (timer.innerText == 0) {
            feedBackForTime.innerText = 'Game Over';
            head.classList.remove('animation');
            body.classList.remove('animation');
            progress();
            bgMusic.pause();
            bgMusic2.play();
        }
    }, 1000)
    btn.style.visibility = 'hidden';
    userInput.disabled = false;
    userInput.focus();
    producingWords();

});





//==============================================================================


//===============


onEvent('click', restartBtn, function () {

    bgMusic2.pause();
    window.location.reload();
});

function animation() {
    head.classList.add('animation');
    body.classList.add('animation');
    backVideo.classList.add('video');
}

onEvent('click', btnTwo, function () {

    dialog.showModal();
});

onEvent('click', btnBack, function () {
    dialog.close();
});

onEvent('click', dialog, function (event) {
    const rect = this.getBoundingClientRect();

    if (event.clientY < rect.top || event.clientY > rect.bottom ||
        event.clientX < rect.left || event.clientX > rect.right) {
        dialog.close();
    }
});

window.addEventListener('load', () => {
    animation();
});


















