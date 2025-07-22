const quizData = [
  {
    number: 1,
    title: 'На какую сумму вы рассчитываете?',
    answer_alias: 'money',
    answers: [
      {
        answer_title: '500 рублей',
        type: 'checkbox',
      },
      {
        answer_title: '5000 рублей',
        type: 'checkbox',
      },
      {
        answer_title: 'Введу текстом',
        type: 'text',
      },
    ],
  },
  {
    number: 2,
    title: 'Какой именно вам нужен сайт?',
    answer_alias: 'great',
    answers: [
      {
        answer_title: 'Лендинг-пейдж',
        type: 'radio',
      },
      {
        answer_title: 'Корпоративный сайт',
        type: 'radio',
      },
      {
        answer_title: 'Интернет-магазин',
        type: 'radio',
      },
    ],
  },
  {
    number: 3,
    title: 'Сколько дней вы готовы выделить на выплнение работы?',
    answer_alias: 'deadline',
    answers: [
      {
        answer_title: 'Минимальное количество дней',
        type: 'range',
        value: '30',
        index: '0',
      },
      {
        answer_title: 'Максимальное количество дней',
        type: 'range',
        value: '30',
        index: '1',
      },
    ],
  },
  {
    number: 4,
    title: 'Оставьте свой телефон, мы вам перезвоним',
    answer_alias: 'phone',
    answers: [
      {
        answer_title: 'Введите телефон',
        type: 'tel',
      },
    ],
  },
];
