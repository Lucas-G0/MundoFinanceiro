const $startGameButton = document.querySelector(".start-quiz");
const $nextQuestionButton = document.querySelector(".next-question");
const $questionsContainer = document.querySelector(".questions-container");
const $questionText = document.querySelector(".question");
const $answersContainer = document.querySelector(".answers-container");
const $characterImage = document.querySelector("#character-image");
const $textContainer = document.querySelector("#hide_start");
const $closeModal = document.querySelector("#close-modal");
const $openModal = document.querySelector("#open-modal");


var som1 = document.getElementById("som1");
var som2 = document.getElementById("som2");
var som3 = document.getElementById("som3");
document.getElementById("som4").volume=(0.2);
let playerName = document.querySelector('#name');
let currentQuestionIndex = 0;
let totalCorrect = 0;

const characterImages = [
  'assets/images/monstro1.png',
  'assets/images/monstro2.png',
  'assets/images/monstro3.png',
  'assets/images/monstro4.png',
  'assets/images/monstro5.png',
  'assets/images/monstro6.png',
  'assets/images/monstro7.png',
  'assets/images/monstro8.png'
];

$startGameButton.addEventListener("click", startGame);
$nextQuestionButton.addEventListener("click", displayNextQuestion);
$(".button").click(function(){
  som1.pause();
  som1.currentTime= 0;
  som1.play();
})

$closeModal.addEventListener("click", function(){
  if(document.querySelector("#exampleModal").style.display=='none'){
    document.querySelector("#exampleModal").style.display='flex';
  }
    document.querySelector("#exampleModal").style.display='none';
});

$openModal.addEventListener("click", function(){
  if(document.querySelector("#exampleModal").style.display=='flex'){
    document.querySelector("#exampleModal").style.display='none';
  }
    document.querySelector("#exampleModal").style.display='flex';
});

function startGame() {
  $startGameButton.classList.add("hide");
  $questionsContainer.classList.remove("hide");
  $textContainer.classList.add('hide');
  document.getElementById("som4").volume=(0.1);
  displayNextQuestion();
}

function displayNextQuestion() {
  resetState();
  
  if (questions.length === currentQuestionIndex) {
    return finishGame();
  }

  const currentImage = characterImages[currentQuestionIndex % characterImages.length];
  $characterImage.src = currentImage;
  console.log("Imagem atual:", currentImage);  // Adicionado para depuração
  $questionText.textContent = questions[currentQuestionIndex].question;
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAnswer = document.createElement("button");
    newAnswer.classList.add("button", "answer");
    newAnswer.textContent = answer.text;
    if (answer.correct) {
      newAnswer.dataset.correct = answer.correct;
    }
    $answersContainer.appendChild(newAnswer);

    newAnswer.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild);
  }

  document.body.removeAttribute("class");
  $nextQuestionButton.classList.add("hide");
}

function selectAnswer(event) {
  const answerClicked = event.target;

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct");
    totalCorrect++;
    som3.pause();
    som3.currentTime=0;
    som3.play();
    let params = {
      particleCount: 500, 
      spread: 90,
      startVelocity: 70,
      origin: { x: 0, y: 0.5 },
      angle: 45
    };
    confetti(params);
    params.origin.x = 1;
    params.angle = 135;
    confetti(params);
  } else {
    document.body.classList.add("incorrect");
    som2.pause();
    som2.currentTime=0;
    som2.play();
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true;

    if (button.dataset.correct) {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
  });
  
  $nextQuestionButton.classList.remove("hide");
  currentQuestionIndex++;
}

function finishGame() {
  const totalQuestions = questions.length;
  const performance = Math.floor(totalCorrect * 1000 / totalQuestions);
  
  let message = "";

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)";
      break;
    case (performance >= 70):
      message = "Muito bom :)";
      break;
    case (performance >= 50):
      message = "Bom";
      break;
    default:
      message = "Pode melhorar :(";
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Parabéns ${playerName.value}!
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Pontuação: ${performance*10}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `;
}



const questions = [
  {
    question: "O que significa economizar dinheiro?",
    answers: [
      { text: "Guardar dinheiro para o futuro", correct: true },
      { text: "Gastar todo o dinheiro", correct: false },
      { text: "Perder o dinheiro", correct: false },
      { text: "Contar o dinheiro", correct: false }
    ]
  },
  {
    question: "João quer comprar um brinquedo que custa R$ 50,00. Ele tem R$ 30,00 guardados e ganha R$ 10,00 por semana de mesada. Quantas semanas João precisa esperar para ter dinheiro suficiente para comprar o brinquedo?",
    answers: [
      { text: "1 semana", correct: false },
      { text: "2 semanas", correct: true },
      { text: "3 semanas", correct: false },
      { text: "4 semanas", correct: false }
    ]
  },
  {
    question: 'Por que é bom comparar preços antes de comprar algo?',
    answers: [
      { text: 'Para gastar mais dinheiro', correct: false },
      { text: 'Para ganhar prêmios', correct: false },
      { text: 'Para encontrar o melhor preço', correct: true },
      { text: "Para se divertir", correct: false }
    ]
  },
  {
    question: 'Maria tem R$ 100,00. Ela quer comprar uma mochila que custa R$ 70,00 e um caderno que custa R$ 20,00. Se ela comprar a mochila e o caderno, quanto dinheiro vai sobrar para Maria?',
    answers: [
      { text: "R$ 10,00", correct: true },
      { text: "R$ 20,00", correct: false },
      { text: "R$ 30,00", correct: false },
      { text: "R$ 40,00", correct: false }
    ]
  },
  {
    question: 'O que é uma mesada?',
    answers: [
      { text: 'Um presente de aniversário', correct: false },
      { text: 'Um jogo de tabuleiro', correct: false },
      { text: 'Um tipo de comida', correct: false },
      { text: 'Dinheiro que ganhamos por ajudar alguém', correct: true },
    ]
  },
  {
    question: 'João tem R$ 150,00. Ele quer comprar um par de tênis que custa R$ 120,00 e uma camiseta que custa R$ 25,00. Se ele comprar os dois, quanto dinheiro vai sobrar para João?',
    answers: [
      { text: "R$ 10,00", correct: false },
      { text: "R$ 20,00", correct: false },
      { text: "R$ 5,00", correct: true },
      { text: "R$ 15,00", correct: false }
    ]
  },
  {
    question: 'Por que é importante guardar dinheiro?',
    answers: [
      { text: 'Para manter o dinheiro seguro', correct: true },
      { text: 'Para gastar mais rápido', correct: false },
      { text: 'Para perder o dinheiro', correct: false },
      { text: 'Para fazer amigos', correct: false }
    ]
  },
  {
    question: 'Isabel tem R$ 55,00. Ela quer comprar um livro que custa R$ 40,00 e um marcador de páginas que custa R$ 8,00. Se ela comprar ambos, quanto dinheiro vai sobrar para Isabel?',
    answers: [
      { text: "R$ 5,00", correct: false },
      { text: "R$ 6,00", correct: false },
      { text: "R$ 7,00", correct: true },
      { text: "R$ 8,00", correct: false }
    ]
  },
  {
    question: 'João tem R$ 200,00. Ele quer comprar uma camiseta que custa R$ 40,00 cada. Quantas camisetas ele pode comprar com esse dinheiro?',
    answers: [
      { text: '3', correct: false },
      { text: '5', correct: true },
      { text: '6', correct: false },
      { text: '4', correct: false },
    ]
  },
  {
    question: 'Fernanda tem R$ 200,00. Ela quer comprar cinco blusas que custam R$ 35,00 cada. Quanto dinheiro vai sobrar para Fernanda?',
    answers: [
      { text: "R$ 15,00", correct: false },
      { text: "R$ 25,00", correct: true },
      { text: "R$ 30,00", correct: false },
      { text: "R$ 35,00", correct: false }
    ]
  },
  {
    question: 'Bruno tem R$ 120,00. Ele quer comprar um boné que custa R$ 15,00 cada. Quantos bonés ele pode comprar com esse dinheiro?',
    answers: [
      { text: "6", correct: false },
      { text: "7", correct: false },
      { text: "8", correct: true },
      { text: "9", correct: false }
    ]
  },
  {
    question: 'André tem R$ 60,00. Ele quer comprar uma caneta que custa R$ 10,00 cada. Quantas canetas ele pode comprar com esse dinheiro?',
    answers: [
      { text: "6", correct: true },
      { text: "4", correct: false },
      { text: "7", correct: false },
      { text: "5", correct: false }
    ]
  },
  {
    question: 'Diego tem R$ 45,00. Ele quer comprar um jogo de tabuleiro que custa R$ 35,00 e um pacote de cartas que custa R$ 8,00. Se ele comprar ambos, quanto dinheiro vai sobrar para Diego?',
    answers: [
      { text: "R$ 0,00", correct: false },
      { text: "R$ 2,00", correct: true },
      { text: "R$ 5,00", correct: false },
      { text: "R$ 45,00", correct: false }
    ]
  },
  {
    question: 'Ana tem R$ 300,00. Ela quer comprar um vestido que custa R$ 75,00 e dois pares de sapatos que custam R$ 85,00 cada. Quanto ela vai gastar no total?',
    answers: [
      { text: "R$ 15,00", correct: false },
      { text: "R$ 25,00", correct: true },
      { text: "R$ 30,00", correct: false },
      { text: "R$ 35,00", correct: false }
    ]
  },
  {
    question: 'Diego tem R$ 180,00. Ele quer comprar um par de tênis que custa R$ 45,00 cada. Quantos pares de tênis ele pode comprar com esse dinheiro?',
    answers: [
      { text: "3", correct: false },
      { text: "6", correct: false },
      { text: "5", correct: false },
      { text: "4", correct: true },
    ]
  },
  {
    question: 'André tem R$ 200,00. Ele quer comprar uma mochila que custa R$ 120,00 e um estojo que custa R$ 30,00. Ele também quer comprar um caderno que custa R$ 25,00. Quanto dinheiro vai sobrar para André?',
    answers: [
      { text: "R$ 30,00", correct: false },
      { text: "R$ 15,00", correct: false },
      { text: "R$ 25,00", correct: true },
      { text: "R$ 35,00", correct: false },
    ]
  },
  {
    question: 'Luísa tem R$ 600,00. Ela quer comprar um vestido que custa R$ 350,00 e dois pares de sapatos que custam R$ 120,00 cada. Quanto dinheiro vai sobrar para Luísa?',
    answers: [
      { text: "R$ 10,00", correct: true },
      { text: "R$ 15,00", correct: false },
      { text: "R$ 5,00", correct: false },
      { text: "R$ 20,00", correct: false },
    ]
  },
  {
    question: 'Sofia tem R$ 450,00. Ela quer comprar uma bolsa que custa R$ 75,00 cada. Quantas bolsas ela pode comprar com esse dinheiro?',
    answers: [
      { text: "4", correct: false },
      { text: "5", correct: false },
      { text: "6", correct: true },
      { text: "7", correct: false }
    ]
  },
  {
    question: 'Roberto tem R$ 75,00. Ele quer comprar um CD que custa R$ 15,00 cada. Quantos CDs ele pode comprar com esse dinheiro?',
    answers: [
      { text: "6", correct: false },
      { text: "5", correct: true },
      { text: "3", correct: false },
      { text: "4", correct: false },
    ]
  },
  {
    question: 'Felipe tem R$ 400,00. Ele quer comprar uma guitarra que custa R$ 300,00 e um afinador que custa R$ 40,00. Ele também quer comprar um conjunto de cordas que custa R$ 50,00. Quanto dinheiro vai sobrar para Felipe?',
    answers: [
      { text: "R$ 0,00", correct: false },
      { text: "R$ 5,00", correct: false },
      { text: "R$ 10,00", correct: true },
      { text: "R$ 15,00", correct: false }
    ]
  }
];

characterImages.forEach(src => {
  const img = new Image();
  img.src = src;
  img.onload = () => console.log(`Imagem carregada: ${src}`);
  img.onerror = () => console.error(`Erro ao carregar a imagem: ${src}`);
});
