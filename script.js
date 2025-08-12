const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

function buildQuiz(){
  const output = [];
  questions.forEach((currentQuestion, questionNumber) => {
    const answers = [];
    for(letter in currentQuestion.answers){
      answers.push(
        `<label>
          <input type="radio" name="question${questionNumber}" value="${letter}">
          ${currentQuestion.answers[letter]}
        </label>`
      );
    }
    output.push(
      `<div class="question"> ${currentQuestion.question} </div>
      <div class="answers"> ${answers.join('')} </div>`
    );
  });
  quizContainer.innerHTML = output.join('');
}

function showResults(){
  const answerContainers = quizContainer.querySelectorAll('.answers');
  let numCorrect = 0;
  questions.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;
    if(userAnswer === currentQuestion.correctAnswer){
      numCorrect++;
      answerContainers[questionNumber].style.color = 'lightgreen';
    }
    else{
      answerContainers[questionNumber].style.color = 'red';
    }
  });
  resultsContainer.innerHTML = `لقد حصلت على ${numCorrect} من ${questions.length} (${Math.round((numCorrect/questions.length)*100)}%)`;
}

buildQuiz();
submitButton.addEventListener('click', showResults);
