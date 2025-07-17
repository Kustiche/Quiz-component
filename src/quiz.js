function quizTemplate(data, dataLength, options) {
  const { number, title } = data;
  const { nextBtnText, backBtnText } = options;

  const answers = data.answers.map((item) => {
    return `
      <label class="quiz-question__label">
        <input class="quiz-question__answer" type=${item.type} name=${data.answer_alias} ${
      item.type === 'text' || item.type === 'tel' ? 'placeholder="Введите ваш ответ"' : ''
    } value="${item.type !== 'text' && item.type !== 'tel' ? item.answer_title : ''}" data-valid="false">
        <span>${item.answer_title}</span>
      </label>
    `;
  });

  return `
    <div class="quiz-content">
      <div class="quiz-questions">${number} из ${dataLength}</div>
      <div class="quiz-question">
        <h3 class="quiz-question__title">${title}</h3>
        <div class="quiz-question__answers">
          ${answers.join('')}
        </div>
        <div class="quiz-question__btns">
          <button class="quiz-question__btn" type="button" data-back-btn>${backBtnText}</button>
          <button class="quiz-question__btn" type="button" data-next-btn>${nextBtnText}</button>  
        </div>
      </div>
    </div>
  `;
}

class Quiz {
  constructor(selector, data, options) {
    this.el = document.querySelector(selector);
    this.options = options;
    this.data = data;
    this.dataLength = this.data.length;
    this.counter = 0;
    this.resultArray = [];
    this.tmp = [];

    this.init();
    this.events();
  }

  init() {
    this.el.innerHTML = quizTemplate(this.data[this.counter], this.dataLength, this.options);
  }

  events() {
    this.el.addEventListener('click', (e) => {
      if (e.target === document.querySelector('[data-next-btn]')) {
        this.addToSend();
        this.nextQuestion();
      }

      if (e.target === document.querySelector('[data-back-btn]')) {
        this.backQuestion();
      }

      if (e.target === document.querySelector('[data-send]')) {
        this.send();
      }
    });

    this.el.addEventListener('change', (e) => {
      if (e.target.tagName === 'INPUT') {
        let elements = this.el.querySelectorAll('input');

        if (e.target.type !== 'checkbox' && e.target.type !== 'radio') {
          elements.forEach((el) => {
            el.checked = false;
          });
        } else if (e.target.type === 'checkbox' || e.target.type === 'radio') {
          elements.forEach((el) => {
            if (el.type === 'text') {
              el.value = '';
            }
          });
        }

        this.tmp = this.serialize(this.el);
      }
    });
  }

  nextQuestion() {
    if (this.valid()) {
      if (this.counter + 1 < this.dataLength) {
        this.counter++;

        this.init();

        if (this.counter + 1 === this.dataLength) {
          this.el
            .querySelector('.quiz-question__btns')
            .insertAdjacentHTML(
              'beforeEnd',
              `<button class="quiz-question__btn" type="button" data-send>${this.options.sendBtnText}</button>`
            );
          this.el.querySelector('[data-next-btn]').remove();
        }
      }
    }
  }

  backQuestion() {
    if (this.counter - 1 > -1) {
      this.counter--;

      this.init();
    }
  }

  valid() {
    let isValid = false;
    let elements = this.el.querySelectorAll('input');

    elements.forEach((el) => {
      switch (el.type) {
        case 'text':
          el.value ? (isValid = true) : el.classList.add('error');
          break;
        case 'tel':
          el.value ? (isValid = true) : el.classList.add('error');
          break;
        case 'checkbox':
          el.checked ? (isValid = true) : el.classList.add('error');
          break;
        case 'radio':
          el.checked ? (isValid = true) : el.classList.add('error');
          break;
      }
    });

    return isValid;
  }

  addToSend() {
    this.resultArray.push(this.tmp);
  }

  send() {
    if (this.valid()) {
      const formData = new FormData();

      for (let item of this.resultArray) {
        for (let obj in item) {
          formData.append(obj, item[obj].substring(0, item[obj].length - 1));
        }
      }

      const response = fetch('mail.php', {
        method: 'POST',
        body: formData,
      });
    }
  }

  serialize(form) {
    let field,
      s = {};
    let valueString = '';
    if (typeof form == 'object' && form.nodeName == 'FORM') {
      let len = form.elements.length;
      for (let i = 0; i < len; i++) {
        field = form.elements[i];

        if (
          field.name &&
          !field.disabled &&
          field.type != 'file' &&
          field.type != 'reset' &&
          field.type != 'submit' &&
          field.type != 'button'
        ) {
          if (field.type == 'select-multiple') {
            for (j = form.elements[i].options.length - 1; j >= 0; j--) {
              if (field.options[j].selected)
                s[s.length] = encodeURIComponent(field.name) + '=' + encodeURIComponent(field.options[j].value);
            }
          } else if ((field.type != 'checkbox' && field.type != 'radio' && field.value) || field.checked) {
            valueString += field.value + ',';

            s[field.name] = valueString;
          }
        }
      }
    }
    return s;
  }
}

window.quiz = new Quiz('.quiz', quizData, {
  nextBtnText: 'Далее',
  backBtnText: 'Назад',
  sendBtnText: 'Отправить',
});
