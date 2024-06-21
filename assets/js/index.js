const $startGameButton = document.querySelector(".start-quiz");
const $nextQuestionButton = document.querySelector(".next-question");
const $questionsContainer = document.querySelector(".questions-container");
const $questionText = document.querySelector(".question");
const $answersContainer = document.querySelector(".answers-container");
const $characterImage = document.querySelector("#character-image");

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

function startGame() {
  $startGameButton.classList.add("hide");
  $questionsContainer.classList.remove("hide");
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
  } else {
    document.body.classList.add("incorrect");
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
  const performance = Math.floor(totalCorrect * 100 / totalQuestions);
  
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
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
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
      { text: "Gastar todo o dinheiro", correct: false },
      { text: "Guardar dinheiro para o futuro", correct: true },
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
      { text: 'Para encontrar o melhor preço', correct: true },
      { text: 'Para ganhar prêmios', correct: false },
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
    question: 'O que é um salário?',
    answers: [
      { text: 'Dinheiro que ganhamos por trabalhar', correct: true },
      { text: 'Um presente de aniversário', correct: false },
      { text: 'Um jogo de tabuleiro', correct: false },
      { text: 'Um tipo de comida', correct: false }
    ]
  },
  {
    question: 'O que significa fazer um orçamento?',
    answers: [
      { text: 'Planejar como gastar o dinheiro', correct: true },
      { text: 'Gastar dinheiro sem pensar', correct: false },
      { text: 'Esconder o dinheiro', correct: false },
      { text: 'Dar dinheiro para os amigos', correct: false }
    ]
  },
  {
    question: 'Por que é importante guardar dinheiro no banco?',
    answers: [
      { text: 'Para gastar mais rápido', correct: false },
      { text: 'Para manter o dinheiro seguro', correct: true },
      { text: 'Para perder o dinheiro', correct: false },
      { text: 'Para fazer amigos', correct: false },
    ]
  },
  {
    question: 'O que é uma "conta poupança" e para que serve?',
    answers: [
      { text: 'Uma conta poupança é usada para gastar dinheiro em compras impulsivas.', correct: false },
      { text: 'Uma conta poupança é usada para guardar dinheiro e ganhar juros sobre ele', correct: true },
      { text: 'Uma conta poupança é usada para investir em ações.', correct: false },
      { text: 'Uma conta poupança é usada para doar dinheiro para instituições de caridade', correct: false },
    ]
  },
  {
    question: 'O que é o sistema PIX e como ele funciona?',
    answers: [
      { text: 'O PIX é uma rede social para compartilhamento de fotos.', correct: false },
      { text: 'O PIX é um sistema de pagamento que permite transferências instantâneas de dinheiro entre contas bancárias, disponível 24 horas por dia, todos os dias da semana.', correct: true },
      { text: 'O PIX é uma forma de comprar pizzas online.', correct: false },
      { text: 'O PIX é um tipo de jogo de computador.', correct: false },
    ]
  },
  {
    question: 'O que é um cartão de crédito e como ele funciona?',
    answers: [
      { text: 'Um cartão de crédito é usado apenas para sacar dinheiro em caixas eletrônicos.', correct: false },
      { text: 'Um cartão de crédito é uma forma de desconto em lojas específicas.', correct: false },
      { text: 'Um cartão de crédito permite que você faça compras agora e pague por elas depois, geralmente com a possibilidade de parcelar o pagamento.', correct: true },
      { text: 'Um cartão de crédito é um cartão que só pode ser usado para compras online.', correct: false },
    ]
  }
];

characterImages.forEach(src => {
  const img = new Image();
  img.src = src;
  img.onload = () => console.log(`Imagem carregada: ${src}`);
  img.onerror = () => console.error(`Erro ao carregar a imagem: ${src}`);
});
