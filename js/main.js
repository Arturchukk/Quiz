/* All answer options */
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

/* All our optios */
const optionElements = document.querySelectorAll('.option')

const question = document.getElementById('question'); //сам вопрос

const numberofQuestion = document.getElementById('number-of-question'), // номер вопроса
      numberofAllQuestions = document.getElementById('number-of-all-questions'); // к-ство всех вопросов

let indexofQuestion, // индекс текущего вопроса
    indexofPage = 0; // индекс страницы

const answersTracker = document.getElementById('answers-tracker'); // обертка дла нашего трекера
const btnNext = document.getElementById('btn-next'); // кнопка далее

let score = 0; // итоговый результат векторины

const correctAnswer = document.getElementById('correct-answer'), // к-ство правильных ответов
      numberofAllQuestions2 = document.getElementById('number-of-all-questions'), // к-ство всех вопросв в модальном окне
      btnTryAgain = document.getElementById('btn-try-again'); // кнопка "начать векторину заново"

const questions = [
   {

   question: 'Верно ли сравнение: "ёжик" > "яблоко"?',
   options: [
           'Нет.',
           'Да.',
           'Зависит от локальных настроек браузера.',
           'Нет правилього ответа',
   ],
    rightAnswer: 1
  },
  {

   question: 'Чему равно 2 && 1 && null && 0 && undefined ?',
   options: [
           'null',
           '1',
           '2',
           '0',
   ],
    rightAnswer: 0
  },
  {

   question: 'Чему равна сумма [] + 1 + 2?',
   options: [
           '1',
           'NaN',
           '12',
           'underfined',
   ],
    rightAnswer: 2
  }
  
];

numberofAllQuestions.innerHTML = questions.length; // к-ство вопросов

const load = () => {
   question.innerHTML = questions[indexofQuestion].question; // сам вопрос

   //мапим ответы
   option1.innerHTML = questions[indexofQuestion].options[0];
   option2.innerHTML = questions[indexofQuestion].options[1];
   option3.innerHTML = questions[indexofQuestion].options[2];
   option4.innerHTML = questions[indexofQuestion].options[3];

  numberofQuestion.innerHTML = indexofPage + 1; // установка номера текущей страницы
  indexofPage++; // увеличение индекса страницы
};

let completedAnswers = [] // массив для уже заданных вопросов

const randomQuestion = () => {
   let randomNumber = Math.floor(Math.random() * questions.length);
   let hitDuplicate = false; // якорь для проверки одинаковых вопросов

   if(indexofPage == questions.length) {
      quizOver()
   }else {
      if (completedAnswers.length > 0) {
         completedAnswers.forEach(item => {
            if(item == randomNumber) {
                hitDuplicate = true;
            }
         });
         if (hitDuplicate) {
            randomQuestion();
         }else {
            indexofQuestion = randomNumber;
            load();
         }
      }
      if (completedAnswers.length == 0) {
         indexofQuestion = randomNumber
         load();
      }
   }
   completedAnswers.push(indexofQuestion);
};

const checkAnswer = el => {
   if (el.target.dataset.id == questions[indexofQuestion].rightAnswer) {
      el.target.classList.add('correct');
      updateAnswerTracker('correct');
      score++;
   }else {
      el.target.classList.add('wrong');
      updateAnswerTracker('wrong');
   }
   disabledOptions()
}

for (option of optionElements) {
   option.addEventListener('click', e => checkAnswer(e));
}

 const disabledOptions = () => {
    optionElements.forEach(item => {
       item.classList.add('disabled')
       if (item.dataset.id == questions[indexofQuestion].rightAnswer) {
         item.classList.add('correct');  
       }
    }) 
 }
//  удалание всех класов со всех ответов
 const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong')
    })   
 }

const answerTracker = () => {
   questions.forEach(() => {
      const div = document.createElement('div');
         answersTracker.appendChild(div);
   })
}

const updateAnswerTracker = status => {
   answersTracker.children[indexofPage -1 ].classList.add(`${status}`);
}

 const validate = () => {
    if(!optionElements[0].classList.contains('disabled')) {
       alert('Вам нужно выбрать один из вариантов ответа');
    }else {
        randomQuestion();
        enableOptions();
    }
 }

const quizOver = () => {
   document.querySelector('.quiz-over-modal').classList.add('active');
   correctAnswer.innerHTML = score;
   numberofAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
   window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
  validate();
})


window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});
