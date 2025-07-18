const container = document.getElementById('container');
const question = document.getElementById('question');
const gif = document.getElementById('gif');
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');

let noClickCount = 0;
let canMove = false;

const noResponses = [
    { text: "Humm...! Are u sure?", gif: "images/areusure.gif" },
    { text: "Don't do this to me ...", gif: "images/couple-upset.gif" },
    { text: "I'm gonna cry..", gif: "images/cry.gif" }
];

// --- "Uncatchable" Button Logic ---
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

noBtn.addEventListener('click', () => {
    // If button is already in "run away" mode, just move it and stop.
    if (canMove) {
        moveButton();
        return;
    }

    // Normal sequence of changing text and GIFs
    if (noClickCount < noResponses.length) {
        question.textContent = noResponses[noClickCount].text;
        gif.src = noResponses[noClickCount].gif;
        
        const currentYesSize = window.getComputedStyle(yesBtn).transform;
        const matrix = new DOMMatrix(currentYesSize);
        const currentScale = matrix.m11;
        yesBtn.style.transform = `scale(${currentScale + 0.2})`;
        noBtn.style.transform = `scale(${1 - (noClickCount * 0.1)})`;

        noClickCount++;

        // If it's the last step, enable moving and move it IMMEDIATELY.
        if (noClickCount === noResponses.length) {
            canMove = true;
            moveButton(); // No more delay!
        }
    }
});

noBtn.addEventListener('mouseover', () => {
    if (canMove) {
        moveButton();
    }
});

yesBtn.addEventListener('click', () => {
    question.innerHTML = "Heehee ..!! I love u too &lt;3 Arbwarrrrr Mwahhhhh";
    gif.src = "images/peach-goma-kiss-peach-and-goma.gif";
    
    noBtn.style.display = 'none';
    yesBtn.style.display = 'none';

    // Hide background animation if you want a clean final screen
    document.body.style.animation = 'none';
    const bgBefore = document.querySelector('body::before');
    if (bgBefore) {
        bgBefore.style.display = 'none';
    }
});

// No need for JS-based animation anymore, CSS handles the background.