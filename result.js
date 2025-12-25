// get data from localStorage
const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];
const userName = localStorage.getItem('userName') || 'Player';

// calculate scores
let correct = 0;
let wrong = 0;

for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
        correct++;
    } else {
        wrong++;
    }
}

// display scores
document.querySelector('.user-name span').textContent = userName;
document.querySelector('.total .score-value').textContent = questions.length;
document.querySelector('.right .score-value').textContent = correct;
document.querySelector('.wrong .score-value').textContent = wrong;

// display question cards
const questionMain = document.querySelector('.question-main');
questionMain.innerHTML = '';

for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const userAns = userAnswers[i];
    const isCorrect = userAns === q.answer;
    const isSkipped = userAns === -1 || userAns === undefined;
    
    const card = document.createElement('div');
    card.className = `question-card ${isCorrect ? 'correct-card' : isSkipped ? 'skipped-card' : 'wrong-card'}`;
    
    let optionsHTML = '';
    for (let j = 0; j < q.options.length; j++) {
        let optClass = '';
        let mark = '';
        
        if (j === q.answer) {
            optClass = 'correct';
            mark = ' ✓';
        } else if (j === userAns && userAns !== q.answer) {
            optClass = 'wrong';
            mark = ' ✗';
        }
        
        const letter = String.fromCharCode(65 + j); 
        optionsHTML += `<p class="${optClass}">(${letter}). ${q.options[j]}${mark}</p>`;
    }
    
    let statusText = isSkipped ? '⊘ Skipped' : isCorrect ? '✓ Correct' : '✗ Wrong';
    let statusClass = isSkipped ? 'skipped-status' : isCorrect ? 'correct-status' : 'wrong-status';
    
    card.innerHTML = `
        <div class="question">
            <div class="question-name"><p>Q${i + 1}. ${q.question}</p></div>
            <div class="question-count"><p>${i + 1}/${questions.length}</p></div>
        </div>
        <div class="option-card">
            <div class="option-name">${optionsHTML}</div>
        </div>
        <div class="status ${statusClass}">
            ${statusText}
        </div>
    `;
    
    questionMain.appendChild(card);
}

// button events
document.querySelector('.retry-btn').addEventListener('click', function() {
    localStorage.removeItem('userAnswers');
    window.location.href = 'main.html';
});

document.querySelector('.home-btn').addEventListener('click', function() {
    localStorage.removeItem('userAnswers');
    localStorage.removeItem('userName');
    window.location.href = 'index.html';
});