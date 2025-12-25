// background
const bg = document.getElementById('bg');
const dotsContainer = document.getElementById('dots');

// Create scattered question marks
function createQuestionMarks() {
    const count = 25;

    for (let i = 0; i < count; i++) {
        const q = document.createElement('div');
        q.className = 'question-mark';
        q.textContent = '?';

        const size = 18 + Math.random() * 40;
        const opacity = 0.3 + Math.random() * 0.4;
        const rotate = -30 + Math.random() * 60;

        q.style.left = Math.random() * 95 + '%';
        q.style.top = Math.random() * 95 + '%';
        q.style.fontSize = size + 'px';
        q.style.opacity = opacity;
        q.style.setProperty('--rotate', rotate + 'deg');
        q.style.animationDelay = Math.random() * 6 + 's';
        q.style.animationDuration = (2 + Math.random() * 2) + 's';
        q.style.textShadow = `0 0 ${size/4}px rgba(255, 69, 0, 0.1)`;

        bg.appendChild(q);
    }
}

// Create pulsing dots
function createDots() {
    for (let i = 0; i < 20; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.style.left = Math.random() * 100 + '%';
        dot.style.top = Math.random() * 100 + '%';
        dot.style.animationDelay = Math.random() * 3 + 's';
        dotsContainer.appendChild(dot);
    }
}

// Initialize
createQuestionMarks();
createDots();



/*welcome page*/


//get elements
const nameInput = document.querySelector('.name-input');
const startButton = document.querySelector('.start-button button');

nameInput.addEventListener("keydown",function(event){
    if(event.key==="Enter"){
        startButton.click();
    }
});

startButton.addEventListener('click',function(e){
    const userName=nameInput.value.trim();

    if(userName===""){
        e.preventDefault();
        alert("Please enter your name");
        return;
    }

    
    localStorage.setItem("userName",userName);

    localStorage.removeItem("userAnswers");
    localStorage.removeItem("currentQuestions");
});