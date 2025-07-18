const container = document.getElementById('container');
const question = document.getElementById('question');
const gif = document.getElementById('gif');
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const timerDisplay = document.getElementById('timer');

let noClickCount = 0;
let canMove = false;
let countdownInterval;

const noResponses = [
    { text: "Humm...! Are u sure?", gif: "images/areusure.gif" },
    { text: "Don't do this to me ...", gif: "images/couple-upset.gif" },
    { text: "I'm gonna cry..", gif: "images/cry.gif" }
];

const moveButton = () => {
    const containerRect = container.getBoundingClientRect();
    const noBtnRect = noBtn.getBoundingClientRect();
    const maxX = containerRect.width - noBtnRect.width;
    const maxY = containerRect.height - noBtnRect.height;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
};

const startTimer = () => {
    let timeLeft = 15;
    timerDisplay.style.display = 'block';
    timerDisplay.textContent = `${timeLeft}s`;

    countdownInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            timerDisplay.style.display = 'none';
            yesBtn.click();
        }
    }, 1000);
};

noBtn.addEventListener('click', () => {
    if (canMove) {
        moveButton();
        return;
    }
    if (noClickCount < noResponses.length) {
        question.textContent = noResponses[noClickCount].text;
        gif.src = noResponses[noClickCount].gif;
        
        const currentYesSize = window.getComputedStyle(yesBtn).transform;
        
        const matrix = new DOMMatrix(currentYesSize); 
        
        const currentScale = matrix.m11;
        yesBtn.style.transform = `scale(${currentScale + 0.2})`;
        noBtn.style.transform = `scale(${1 - (noClickCount * 0.1)})`;
        
        noClickCount++;
        
        if (noClickCount === noResponses.length) {
            canMove = true;
            moveButton();
            startTimer();
        }
    }
});

noBtn.addEventListener('touchstart', (e) => {
    if (canMove) {
        e.preventDefault();
        moveButton();
    }
});

noBtn.addEventListener('mouseover', () => {
    if (canMove) {
        moveButton();
    }
});

yesBtn.addEventListener('click', () => {
    clearInterval(countdownInterval);
    timerDisplay.style.display = 'none';

    question.innerHTML = "Heehee ..!! I love u too &lt;3 Arbwarrrrr Mwahhhhh";
    gif.src = "images/peach-goma-kiss-peach-and-goma.gif";
    
    noBtn.style.display = 'none';
    yesBtn.style.display = 'none';
});