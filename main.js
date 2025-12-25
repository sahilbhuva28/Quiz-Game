//variables
let currentQuestions = 0;
let userAnswers = [];
let timeLeft = 0;
let timerInterval = null;
let skipCount = 0;
const question_time = 5;

//get elements
const questionName = document.querySelector(".question-name p");
const questionCount = document.querySelector(".question-count p");
const optionNames = document.querySelectorAll(".option-name p");
const optionButtons = document.querySelectorAll(".option-button-button");
const nextButton = document.querySelector('.next-submit-button button');
const timerDisplay = document.querySelector('.timer-count p');
const loader = document.querySelector('.loader');

//quiz initialization
function initQuiz() {
    currentQuestions = 0;
    userAnswers = [];
    skipCount = 0;

    for (let i = 0; i < questions.length; i++) {
        userAnswers.push(-1);
    }
    displayQuestion();
}

//display questions
function displayQuestion() {
    const q = questions[currentQuestions];

    questionName.textContent = `Q. ${q.question}`;
    questionCount.textContent = `${currentQuestions + 1}/${questions.length}`;

    optionNames[0].textContent = `(A). ${q.options[0]}`;
    optionNames[1].textContent = `(B). ${q.options[1]}`;
    optionNames[2].textContent = `(C). ${q.options[2]}`;
    optionNames[3].textContent = `(D). ${q.options[3]}`;

    optionButtons.forEach(btn => btn.checked = false);

    if (userAnswers[currentQuestions] !== -1) {
        optionButtons[userAnswers[currentQuestions]].checked = true;
    }

    if (currentQuestions === questions.length - 1) {
        nextButton.textContent = 'Submit';
    } else {
        nextButton.textContent = 'Next';
    }

    startTimer();
}

//timer
function startTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    timeLeft = question_time;
    updateTimerDisplay();

    timerInterval = setInterval(function () {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            timeUp();
        }
    }, 1000);
}

//update timer
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    const percentage = ((question_time - timeLeft) / question_time) * 100;

    if (timeLeft <= 5) {
        loader.style.background = `linear-gradient(red 0 0) 0/${percentage}% no-repeat lightblue`;
        timerDisplay.style.color = 'red';
        timerDisplay.style.fontWeight = 'bold';
    } else if (timeLeft <= 10) {
        loader.style.background = `linear-gradient(orange 0 0) 0/${percentage}% no-repeat lightblue`;
        timerDisplay.style.color = 'orange';
        timerDisplay.style.fontWeight = 'bold';
    } else {
        loader.style.background = `linear-gradient(orangered 0 0) 0/${percentage}% no-repeat lightblue`;
        timerDisplay.style.color = 'black';
        timerDisplay.style.fontWeight = 'normal';
    }
}

//time up
function timeUp() {
    clearInterval(timerInterval);
    alert("Time Up!");
    
    if (currentQuestions === questions.length - 1) {
        submitQuiz();
    } else {
        skip();
    }
}

//skip
function skip() {
    skipCount++;
    currentQuestions++;
    displayQuestion();
}

//option button 
optionButtons.forEach((btn, index) => {
    btn.addEventListener('change', function () {
        optionButtons.forEach((b, i) => {
            if (i !== index) {
                b.checked = false;
            }
        });
        userAnswers[currentQuestions] = index;
    });
});

// Next button 
nextButton.addEventListener('click', function () {
    clearInterval(timerInterval);
    
    if (userAnswers[currentQuestions] === -1) {
        if (currentQuestions === questions.length - 1) {
            submitQuiz();
        } else {
            skip();
        }
        return;
    }
    
    if (currentQuestions === questions.length - 1) {
        submitQuiz();
    } else {
        currentQuestions++;
        displayQuestion();
    }
});

// Submit quiz
function submitQuiz() {
    clearInterval(timerInterval);
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    localStorage.setItem('skipCount', skipCount);
    window.location.href = 'result.html';
}

initQuiz();