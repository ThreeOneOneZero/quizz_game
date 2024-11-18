import { Question } from "../models/Question";

export const mockQuestions: Question[] = [
  {
    id: 1,
    questionText: "Qual é a capital da França?",
    options: ["Paris", "Londres", "Berlim", "Madri", "Roma"],
  },
  {
    id: 2,
    questionText: "Qual é o maior planeta do sistema solar?",
    options: ["Marte", "Júpiter", "Saturno", "Vênus", "Mercúrio"],
  },
  {
    id: 3,
    questionText: "Quem pintou a Mona Lisa?",
    options: [
      "Vincent van GoghVincent van GoghVincent van GoghVincent van GoghVincent van GoghVincent van GoghVincent van GoghVincent van GoghVincent van GoghVincent van GoghVincent van GoghVincent van Gogh",
      "Leonardo da Vinci",
      "Pablo Picasso",
      "Michelangelo",
      "Rafael",
    ],
  },
];

export const mockSecondQuestions: Question[] = [
  {
    id: 4,
    questionText: "Qual é o elemento químico representado pelo símbolo 'O'?",
    options: ["Oxigênio", "Ouro", "Osmio", "Ósmio", "Óxido"],
  },
  {
    id: 5,
    questionText: "Quem escreveu 'Dom Quixote'?",
    options: [
      "Miguel de Cervantes",
      "William Shakespeare",
      "Dante Alighieri",
      "Homer",
      "J.K. Rowling",
    ],
  },
  {
    id: 6,
    questionText: "Qual é a fórmula química da água?",
    options: ["H2O", "CO2", "NaCl", "O2", "H2SO4"],
  },
  {
    id: 7,
    questionText: "Qual é a velocidade da luz no vácuo?",
    options: [
      "299.792.458 m/s",
      "150.000.000 m/s",
      "300.000.000 m/s",
      "299.792.458 km/h",
      "150.000.000 km/h",
    ],
  },
  {
    id: 8,
    questionText: "Quem foi o primeiro presidente dos Estados Unidos?",
    options: [
      "George Washington",
      "Thomas Jefferson",
      "Abraham Lincoln",
      "John Adams",
      "James Madison",
    ],
  },
];
