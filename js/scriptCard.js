class Box {

  buttonsBox = document.querySelector('.button-basket');
  shadowModalBox = document.querySelector('.shadow-box');
  modalBox = document.querySelector('.section-box');
  buttonExitBox = document.querySelector('.exit-box');
  boxInfo = document.querySelectorAll('.box-info');
  modalTotalPrice = document.querySelector('.sum-icon-box');
  titleBox = document.querySelector('.title-box');
  boxContents = document.querySelector('.collections-row-items');
  buttonDellAllItemInBox = document.querySelector('.del-all-container');
  sumTotalPriceInBox = document.querySelector('.total-price-in-box');
  countInBox = document.querySelector('.count-in-box');
  checkAll = document.querySelector('.check-all');
  sumTotalPrice = 0;
  boxCount = 0;
  itemInBox = [];
  inBoxLS = {};


  addListenerModalBasket() {
    this.buttonsBox.addEventListener('click', () => {
      this.shadowModalBox.style.display = 'block';
      this.modalBox.style.display = 'block';
    });
    this.shadowModalBox.addEventListener('click', () => {
      this.shadowModalBox.style.display = 'none';
      this.modalBox.style.display = 'none';
    });
    this.buttonExitBox.addEventListener('click', () => {
      this.shadowModalBox.style.display = 'none';
      this.modalBox.style.display = 'none';
    })
  }

  addListenerButtonsInBox(infoCards) {
    const ButtonsInBox = document.querySelectorAll('.inBox');
    ButtonsInBox.forEach(button => {
      button.addEventListener('click', () => {
        if (localStorage.getItem('inBox')) {
          this.inBoxLS = JSON.parse(localStorage.getItem('inBox'));
          this.inBoxLS[button.dataset.idcards] ?
            this.inBoxLS[button.dataset.idcards] += 1 :
            this.inBoxLS[button.dataset.idcards] = 1;
          localStorage.setItem('inBox', JSON.stringify(this.inBoxLS));
        } else {
          this.inBoxLS = {};
          this.inBoxLS[button.dataset.idcards] = 1;
          localStorage.setItem('inBox', JSON.stringify(this.inBoxLS));
        }
        this.calculatingBoxCounter(infoCards);
      })
    })
  }

  addListenerDelAllItemInBox() {
    this.buttonDellAllItemInBox.addEventListener('click', () => {
      localStorage.removeItem("inBox");
      this.calculatingBoxCounter();
    });
    this.checkAll.checked = false;
  }

  calculatingBoxCounter(infoCards) {
    this.boxCount = 0;
    if (localStorage.getItem('inBox')) {
      this.inBoxLS = JSON.parse(localStorage.getItem('inBox'));
      for (let elem in this.inBoxLS) {
        this.boxCount += this.inBoxLS[elem];
      }
      this.boxInfo.forEach(elem => elem.textContent = `Корзина(${this.boxCount})`)
    } else {
      this.boxCount = 0;
      this.boxInfo.forEach(elem => elem.textContent = 'Корзина')
    }
    this.calculatingTotalPrice(infoCards);
  }

  calculatingTotalPrice(infoCards) {
    this.sumTotalPrice = 0;
    if (localStorage.getItem('inBox')) {
      for (let elem in this.inBoxLS) {
        this.sumTotalPrice += infoCards[elem].price * this.inBoxLS[elem];
      }
      this.modalTotalPrice.textContent = `на сумму ${this.sumTotalPrice} ₽`
      this.modalTotalPrice.style.display = 'block';
    } else {
      this.modalTotalPrice.style.display = 'none';
    }
    this.fillingModalBasket(infoCards);
  }

  fillingModalBasket(infoCards) {
    document.querySelector('.container-items-in-box').innerHTML = '';
    if (localStorage.getItem('inBox')) {
      this.titleBox.textContent = 'Ваша корзина';
      this.boxContents.style.display = 'block';
      this.countInBox.textContent = `${this.boxCount} `;
      this.sumTotalPriceInBox.textContent = `${this.sumTotalPrice} ₽`;
      for (let elem in this.inBoxLS) {
        const template = document.querySelector('.template-item-in-box').cloneNode(true);
        template.content.querySelector('.photo-pet-box').src = infoCards[elem].img;
        template.content.querySelector('.quantity-breed').textContent = this.inBoxLS[elem];
        template.content.querySelector('.price-box').textContent =
          `${this.inBoxLS[elem] * infoCards[elem].price} ₽`;
        template.content.querySelector('.minus').dataset.idcards = infoCards[elem].id;
        template.content.querySelector('.plus').dataset.idcards = infoCards[elem].id;
        template.content.querySelector('.del-item').dataset.idcards = infoCards[elem].id;
        template.content.querySelector('.checkbox-item-in-box').dataset.idcards = infoCards[elem].id;
        document.querySelector('.container-items-in-box').appendChild(template.content);
      }
    } else {
      this.titleBox.textContent = 'Ваша корзина пуста';
      this.boxContents.style.display = 'none';
    }
    this.dellItemInBox(infoCards);
    this.plusCountItemInBox(infoCards);
    this.minusCountItemInBox(infoCards);
    this.checkedAllInBox();
  }

  dellItemInBox(infoCards) {
    const drlItemsInBox = document.querySelectorAll('.del-item');
    drlItemsInBox.forEach(delItem => {
      delItem.addEventListener('click', () => {
        delete this.inBoxLS[delItem.dataset.idcards];
        if (Object.keys(this.inBoxLS).length) {
          localStorage.removeItem('inBox');
          localStorage.setItem('inBox', JSON.stringify(this.inBoxLS));
        } else {
          localStorage.removeItem('inBox');
        }
        this.calculatingBoxCounter(infoCards);
      });
    });
    this.checkAll.checked = false;
  }

  plusCountItemInBox(infoCards) {
    const plusItems = document.querySelectorAll('.plus');
    plusItems.forEach(plus => {
      plus.addEventListener('click', () => {
        this.inBoxLS[plus.dataset.idcards] += 1;
        localStorage.removeItem('inBox');
        localStorage.setItem('inBox', JSON.stringify(this.inBoxLS));
        this.calculatingBoxCounter(infoCards);
      });
    });
    this.checkAll.checked = false;
  }

  minusCountItemInBox(infoCards) {
    const minusItems = document.querySelectorAll('.minus');
    minusItems.forEach(minus => {
      minus.addEventListener('click', () => {
        this.inBoxLS[minus.dataset.idcards] -= 1;
        if (this.inBoxLS[minus.dataset.idcards]) {
          localStorage.removeItem('inBox');
          localStorage.setItem('inBox', JSON.stringify(this.inBoxLS));
        } else {
          delete this.inBoxLS[minus.dataset.idcards];
          if (Object.keys(this.inBoxLS).length) {
            localStorage.removeItem('inBox');
            localStorage.setItem('inBox', JSON.stringify(this.inBoxLS));
          } else {
            localStorage.removeItem('inBox');
          }
        }
        this.calculatingBoxCounter(infoCards);
      });
    });
    this.checkAll.checked = false;
  }

  checkedAllInBox() {
    const checkboxItems = document.querySelectorAll('.checkbox-item-in-box');
    this.checkAll.addEventListener('change', () => {
      console.log('this.checkAll.checked', this.checkAll.checked);
      if (this.checkAll.checked) {
        checkboxItems.forEach(checkbox => checkbox.checked = true)
      }
    });
    checkboxItems.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        if (!checkbox.checked) this.checkAll.checked = false;
      });
    });
  }
}

const box = new Box();

const diagnosesList = [
  "глухота",
  "паролич гортани",
  "волчанка",
  "бешенство",
  "слепота",
  "облысение"
];
const infoCards = [
  {
    "id": 0,
    "img": "img/dog-1.png",
    "breed": "Айну",
    "price": 12000,
    "hunter": true,
    "companion": true,
    "decorative": true,
    "service": true,
    "noFear": true,
    "barksALittle": true,
    "excellentHealth": true,
    "goodObedience": true,
    "veryDevoted": true,
    "size": 2,
    "intelligence": "50%",
    "frequentIllnesses": [0, 3]
  },
  {
    "id": 1,
    "img": "img/dog-2.png",
    "breed": "Афганская борзая",
    "price": 13000,
    "hunter": true,
    "companion": false,
    "decorative": false,
    "service": false,
    "noFear": false,
    "barksALittle": false,
    "excellentHealth": false,
    "goodObedience": false,
    "veryDevoted": true,
    "size": 1,
    "intelligence": "40%",
    "frequentIllnesses": [2]
  },
  {
    "id": 2,
    "img": "img/dog-3.png",
    "breed": "Барбет",
    "price": 14000,
    "hunter": false,
    "companion": true,
    "decorative": false,
    "service": false,
    "noFear": false,
    "barksALittle": false,
    "excellentHealth": false,
    "goodObedience": true,
    "veryDevoted": false,
    "size": 3,
    "intelligence": "30%",
    "frequentIllnesses": [1, 3]
  },
  {
    "id": 3,
    "img": "img/dog-4.png",
    "breed": "Бассет",
    "price": 15000,
    "hunter": false,
    "companion": false,
    "decorative": true,
    "service": false,
    "noFear": false,
    "barksALittle": false,
    "excellentHealth": true,
    "goodObedience": false,
    "veryDevoted": true,
    "size": 1,
    "intelligence": "20%",
    "frequentIllnesses": [0, 5]
  },
  {
    "id": 4,
    "img": "img/dog-5.png",
    "breed": "Легавой",
    "price": 16000,
    "hunter": false,
    "companion": false,
    "decorative": false,
    "service": true,
    "noFear": false,
    "barksALittle": true,
    "excellentHealth": false,
    "goodObedience": false,
    "veryDevoted": false,
    "size": 2,
    "intelligence": "10%",
    "frequentIllnesses": [3, 4, 5]
  },
  {
    "id": 5,
    "img": "img/dog-6.png",
    "breed": "Веттерхун",
    "price": 17000,
    "hunter": false,
    "companion": false,
    "decorative": true,
    "service": false,
    "noFear": true,
    "barksALittle": false,
    "excellentHealth": false,
    "goodObedience": false,
    "veryDevoted": false,
    "size": 3,
    "intelligence": "0%",
    "frequentIllnesses": [0, 1, 2]
  },
  {
    "id": 6,
    "img": "img/dog-7.png",
    "breed": "Древера",
    "price": 18000,
    "hunter": false,
    "companion": false,
    "decorative": true,
    "service": false,
    "noFear": false,
    "barksALittle": true,
    "excellentHealth": false,
    "goodObedience": false,
    "veryDevoted": false,
    "size": 1,
    "intelligence": "90%",
    "frequentIllnesses": [0, 1, 2, 3, 4]
  },
  {
    "id": 7,
    "img": "img/dog-8.png",
    "breed": "Ирландский терьер",
    "price": 19000,
    "hunter": false,
    "companion": true,
    "decorative": false,
    "service": false,
    "noFear": false,
    "barksALittle": false,
    "excellentHealth": true,
    "goodObedience": true,
    "veryDevoted": false,
    "size": 2,
    "intelligence": "80%",
    "frequentIllnesses": [0, 1, 2, 3, 5]
  },
  {
    "id": 8,
    "img": "img/dog-9.png",
    "breed": "Амереканский кокер",
    "price": 20000,
    "hunter": true,
    "companion": false,
    "decorative": false,
    "service": false,
    "noFear": false,
    "barksALittle": false,
    "excellentHealth": false,
    "goodObedience": true,
    "veryDevoted": false,
    "size": 3,
    "intelligence": "70%",
    "frequentIllnesses": [0, 1, 2, 4, 5]

  },
  {
    "id": 9,
    "img": "img/dog-10.png",
    "breed": "Английский кокер",
    "price": 21000,
    "hunter": false,
    "companion": false,
    "decorative": false,
    "service": true,
    "noFear": false,
    "barksALittle": false,
    "excellentHealth": false,
    "goodObedience": false,
    "veryDevoted": true,
    "size": 1,
    "intelligence": "60%",
    "frequentIllnesses": [0, 1, 3, 4, 5]
  },
  {
    "id": 10,
    "img": "img/dog-11.png",
    "breed": "Дункер",
    "price": 22000,
    "hunter": true,
    "companion": true,
    "decorative": true,
    "service": true,
    "noFear": true,
    "barksALittle": true,
    "excellentHealth": false,
    "goodObedience": false,
    "veryDevoted": false,
    "size": 2,
    "intelligence": "50%",
    "frequentIllnesses": [0, 2, 3, 4, 5]
  },
  {
    "id": 11,
    "img": "img/dog-12.png",
    "breed": "Спаниель",
    "price": 23000,
    "hunter": false,
    "companion": true,
    "decorative": false,
    "service": false,
    "noFear": true,
    "barksALittle": true,
    "excellentHealth": true,
    "goodObedience": true,
    "veryDevoted": true,
    "size": 3,
    "intelligence": "40%",
    "frequentIllnesses": [1, 2, 3, 4, 5]
  },
  {
    "id": 12,
    "img": "img/dog-13.png",
    "breed": "Цербер",
    "price": 100000,
    "hunter": true,
    "companion": false,
    "decorative": false,
    "service": false,
    "noFear": true,
    "barksALittle": false,
    "excellentHealth": true,
    "goodObedience": false,
    "veryDevoted": false,
    "size": 4,
    "intelligence": "100%",
    "frequentIllnesses": [3]
  }
];
const id = new URL(window.location.href).searchParams.get('id');
const buttonMobileMenu = document.querySelector('.inCatalog-mobile');
const exitMobileMenu = document.querySelector('.out-mobile-menu');
const buttonMobileBox = document.querySelector('.button-in-box');
const mobileMenu = document.querySelector('.mobile-menu');
const sectionBox = document.querySelector('.section-box');
const shadowBox = document.querySelector('.shadow-box');

document.querySelector('h2').textContent = infoCards[id].breed;
document.querySelector('.img-pet').src = infoCards[id].img;
document.querySelector('#typePet').textContent = addTypesPet();
document.querySelector('#sizePet').textContent = addSizePet();
document.querySelector('#subtypes').textContent = addSubtypes();
document.querySelector('#illness').textContent = addDiagnoses();
document.querySelector('#intelligence').textContent = infoCards[id].intelligence;
document.querySelector('.price').textContent = `${infoCards[id].price} ₽`;
document.querySelector('.inBox').dataset.idcards = id;

box.addListenerModalBasket();
box.addListenerButtonsInBox(infoCards)
box.calculatingBoxCounter(infoCards);
box.addListenerDelAllItemInBox();

function addTypesPet() {
  let res = '';
  infoCards[id].hunter ? res = res.concat('охотничьи, ') : '';
  infoCards[id].companion ? res = res.concat('компаньёны, ') : '';
  infoCards[id].decorative ? res = res.concat('декоративные, ') : '';
  infoCards[id].service ? res = res.concat('служебные, ') : '';
  res = res.slice(0, 1).toUpperCase() + res.slice(1, res.length - 2);
  return res;
}

function addSizePet() {
  let res = '';
  infoCards[id].size === 1 ? res = 'Маленькая (до 11кг)' : '';
  infoCards[id].size === 2 ? res = 'Средняя (11-25кг)' : '';
  infoCards[id].size === 3 ? res = 'Большая (25-50кг)' : '';
  infoCards[id].size === 4 ? res = 'Огромная (больше 50кг)' : '';
  return res;
}

function addSubtypes() {
  let res = '';
  infoCards[id].noFear ? res = res.concat('отсутствует чувство страха, ') : '';
  infoCards[id].barksALittle ? res = res.concat('мало лают, ') : '';
  infoCards[id].excellentHealth ? res = res.concat('отличное здоровье, ') : '';
  infoCards[id].goodObedience ? res = res.concat('хорошее послушание, ') : '';
  infoCards[id].veryDevoted ? res = res.concat('очень преданные, ') : '';
  res = res.slice(0, 1).toUpperCase() + res.slice(1, res.length - 2);
  return res;
}

function addDiagnoses() {
  let res = '';
  infoCards[id].frequentIllnesses.forEach(Illness => {
    res = res.concat(`${diagnosesList[Illness]}, `)
  });
  res = res.slice(0, 1).toUpperCase() + res.slice(1, res.length - 2);
  return res;
}

buttonMobileMenu.addEventListener('click', () => {
  mobileMenu.style.display = 'block';
  buttonMobileMenu.style.display = 'none';
  exitMobileMenu.style.display = 'block';
});

exitMobileMenu.addEventListener('click', () => {
  exitMobileMenu.style.display = 'none';
  buttonMobileMenu.style.display = 'block';
  mobileMenu.style.display = 'none';
});

buttonMobileBox.addEventListener('click', () => {
  exitMobileMenu.style.display = 'none';
  buttonMobileMenu.style.display = 'block';
  mobileMenu.style.display = 'none';
  sectionBox.style.display = "block";
  shadowBox.style.display = "block";
})

