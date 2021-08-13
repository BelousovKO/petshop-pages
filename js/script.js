class Filter {

  box = new Box();

  filterForm = document.querySelector('.filter-form');
  checkboxesFilter = this.filterForm.querySelectorAll('.filter-checkbox');
  allCheckboxLabel = document.querySelectorAll('.label-container');
  buttonShowMore = document.querySelector('.show-more');
  modalFilter = document.createElement("div");
  buttonFilter = document.createElement("span");
  inputFilterFastSearch = document.querySelector('.fast-search')
  fastSearchWrapper = document.querySelector('.fast-search-wrapper');
  petSizeInputs = document.querySelectorAll('.pet-size-input');
  labelInputMinSize = document.querySelector('.label-input-min-size');
  clearFilter = document.querySelector('.a-filter-all');
  buttonBlockType = document.querySelector('.block-type');
  buttonBlockFeatures = document.querySelector('.block-features');
  buttonBlockSize = document.querySelector('.block-size');
  sectionFilterType = document.querySelector('.section-type');
  sectionFilterMainFeatures = document.querySelector('.section-main-features');
  sectionFilterSize = document.querySelector('.section-size');
  resultFiltrationCards = {};
  countCardsInCatalog = 8;
  searchSizes;

  addListenersFilter(infoCards) {
    this.checkboxesFilter.forEach((checkbox, idx) => {
      checkbox.addEventListener('change', () => {
        this.filtrationCards(infoCards);
        this.showFilteredCards();
        this.showFilteredButton(idx, infoCards);
      })
    })
  }

  addListenerFastSearch(infoCards) {
    this.inputFilterFastSearch.addEventListener('keyup', () => {
      this.callbackListener(infoCards);
      this.fastSearchWrapper.appendChild(this.modalFilter);
    });
  }

  addListenerSizeInputs(infoCards) {
    this.petSizeInputs.forEach(input => {
      input.addEventListener('input', () => {
        this.callbackListener(infoCards);
        this.labelInputMinSize.appendChild(this.modalFilter);
      })
    })
  }

  addListenerClearFilter(infoCards) {
    this.clearFilter.addEventListener('click', () => {
      this.modalFilter.style.display = 'none';
      this.inputFilterFastSearch.value = '';
      this.petSizeInputs[0].value = 1;
      this.petSizeInputs[1].value = 100;
      this.checkboxesFilter.forEach(checkbox => checkbox.checked = false);
      this.resultFiltrationCards = infoCards.sort(() => Math.random() - 0.5);
      this.addCardsToCatalog();
    });
  }

  callbackListener(infoCards) {
    this.filtrationCards(infoCards);
    this.showFilteredCards();
    this.modalFilter.style.display = 'none';
    setTimeout(() => {
      this.modalFilter.style.display = 'block';
    }, 600);
    this.addListenerModalFilter(infoCards);
  }

  showFilteredButton(idx, infoCards) {
    this.modalFilter.style.display = 'none';
    this.allCheckboxLabel[idx].appendChild(this.modalFilter);
    setTimeout(() => {
      this.modalFilter.style.display = 'block';
    }, 600);
    this.addListenerModalFilter(infoCards);
  }

  addListenerModalFilter(infoCards) {
    this.modalFilter.addEventListener('click', () => {
      this.countCardsInCatalog = 8;
      this.addCardsToCatalog(infoCards);
      this.modalFilter.style.display = 'none';
    })
  }

  filtrationCards(infoCards) {
    this.resultFiltrationCards = JSON.parse(JSON.stringify(infoCards));
    this.defineSearchSizes();
    this.checkboxesFilter.forEach(checkbox => {
      if (checkbox.checked) {
        this.resultFiltrationCards = this.resultFiltrationCards.filter(card => card[checkbox.id]);
      }
      this.resultFiltrationCards = this.resultFiltrationCards.filter(card => {
        return card.size >= this.searchSizes[0] && card.size <= this.searchSizes[1];
      });
    });
    if (this.inputFilterFastSearch.value) {
      this.resultFiltrationCards = this.resultFiltrationCards.filter(card => {
        return card.breed.toLowerCase().includes(this.inputFilterFastSearch.value.toLowerCase())
      });
    }
    this.resultFiltrationCards.sort(() => Math.random() - 0.5);
  }

  addCardsToCatalog(infoCards) {
    this.buttonShowMore.disabled = false;
    document.querySelector('.product-section').innerHTML = '';
    for (let i = 0; i < this.countCardsInCatalog; i++) {
      if (!this.resultFiltrationCards[i]) {
        this.buttonShowMore.disabled = true;
        break;
      }
      const template = document.querySelector('.template-item-catalog').cloneNode(true);
      template.content.querySelector('a').href = `card.html?id=${this.resultFiltrationCards[i].id}`;
      template.content.querySelector('img').src = this.resultFiltrationCards[i].img;
      template.content.querySelector('.breed').textContent = this.resultFiltrationCards[i].breed;
      template.content.querySelector('.price').textContent = `${this.resultFiltrationCards[i].price}₽`;
      template.content.querySelector('.inBox').dataset.idcards = this.resultFiltrationCards[i].id;
      document.querySelector('.product-section').appendChild(template.content);
    }
    this.buttonShowMore.addEventListener('click', () => {
      this.countCardsInCatalog += 8;
      this.addCardsToCatalog(infoCards);
    });
    this.defineSearchSizes(infoCards);
    this.box.addListenerButtonsInBox(infoCards);
  }

  showFilteredCards() {
    this.modalFilter.classList.add('menuFilter');
    this.buttonFilter.classList.add('buttonFilter');
    if (this.resultFiltrationCards.length) {
      this.buttonFilter.textContent = 'Показать';
    } else {
      this.buttonFilter.textContent = '';
    }
    this.modalFilter.textContent = `Найдено совпадений: ${this.resultFiltrationCards.length} `;
    this.modalFilter.appendChild(this.buttonFilter);
  }

  defineSearchSizes() {
    this.searchSizes = [];
    this.petSizeInputs.forEach(elem => {
      this.searchSizes.push(Math.ceil(elem.value / 25));
    })
    this.searchSizes.sort();
  }

  resizeSectionsFilter() {
    this.buttonBlockType.addEventListener('click', () => {
      this.sectionFilterType.classList.toggle('small-section-form');
    });
    this.buttonBlockFeatures.addEventListener('click', () => {
      this.sectionFilterMainFeatures.classList.toggle('small-section-form');
    });
    this.buttonBlockSize.addEventListener('click', () => {
      this.sectionFilterSize.classList.toggle('small-section-form');
    });
  }
}

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

const filter = new Filter();
const box = new Box();

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

filter.filtrationCards(infoCards)
filter.addListenersFilter(infoCards);
filter.addListenerFastSearch(infoCards);
filter.addListenerSizeInputs(infoCards);
filter.addListenerClearFilter(infoCards);
filter.addCardsToCatalog(infoCards);
filter.resizeSectionsFilter(infoCards);

box.addListenerModalBasket();
box.calculatingBoxCounter(infoCards);
box.addListenerDelAllItemInBox();




