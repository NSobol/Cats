//Блок глобальных переменных проекта
const homepage = document.getElementById('homepage'); 
const content = document.querySelector('.content');
const headerBtns = document.querySelector('.header-btns'); 
let store = window.localStorage; 
let defaultLink =
  'https://f.vividscreen.info/soft/394ef96a4024b9182ac63e52cacd25a5/Cat-Wearing-Funny-Hat-2048x2048.jpg'; 

//Блок функций и обработчиков
const refreshCatsAndContent = () => {
  //функция отрисовки карточек
  content.innerHTML = '';
  api.getAllCats().then((res) => {
    store.setItem('cats', JSON.stringify(res)); 
    const cards = JSON.parse(store.getItem('cats')).reduce(
      (acc, el) => (acc += generateCard(el)),
      ''
    ); 
    content.insertAdjacentHTML('afterbegin', cards); 
  });
};

refreshCatsAndContent(); 

headerBtns.addEventListener('click', (event) => {
  //обработчик кнопок добавить и обновить

  if (event.target.tagName === 'BUTTON') {
    switch (event.target.className) {
      case 'add-btn':
        const evt = event.target.value;
        const createCardForm = createCard(); 
        content.insertAdjacentHTML('afterbegin', createCardForm); 
        const popupModal = document.querySelector('.create-edit-modal-form-popup');
        const modal = document.querySelector('.create-edit-modal-form'); 
        modal.classList.add('active'); 
        const modalForm = document.querySelector('form'); 
        const modalBtnOk = modalForm.querySelector('.button-form-submit'); 
        const modalBtnClose = modalForm.querySelector('.button-form-close'); 
        modalBtnOk.addEventListener('click', (evt) => {
          const forms = document.forms[0];
          event.preventDefault();
          const formData = new FormData(forms); 
          const catObj = Object.fromEntries(formData); 
          const cat = { id: getNewIdOfCat(), ...catObj };
          const favorite = cat.favorite 
            ? (cat.favorite = true)
            : (cat.favorite = false);
          api
            .addCat({
              ...catObj,
              favorite: favorite,
              id: getNewIdOfCat(),
            })
            .then((res) => {
              refreshCatsAndContent(); 
            });
          modal.classList.toggle('active'); 
          forms.reset(); 
          modal.remove(); 
        });
        modalBtnClose.addEventListener(
          'click',
          (evt) => {
            modal.remove(); 
            popupModal.remove()
          },
          { once: true }
        );
        break;
      case 'update-btn':
        refreshCatsAndContent();
        break;
    }
  }
});

content.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    switch (event.target.className) {
      case 'cat-card-view': // обработка нажатия кнопки просмотра
        let catView = getViewCardInLocal(event.target.value); 
        const cardViewPopup = generateCardView(catView);
        content.insertAdjacentHTML('afterbegin', cardViewPopup);
        const modalView = document.querySelector('.cardView-popup');
        const modalViewBtn = modalView.querySelector('button');
        modalViewBtn.addEventListener(
          'click',
          (evt) => {
            modalView.remove();
          },
          { once: true }
        );
        break;
      case 'cat-card-update': //обработка редактирования
        const createCardForm = createCard(); 
        content.insertAdjacentHTML('afterbegin', createCardForm); 
        const popupModal = document.querySelector('.create-edit-modal-form-popup');
        const modal = document.querySelector('.create-edit-modal-form');
        const popupTitle = document.querySelector('.create-edit-modal-title');
        popupTitle.textContent = 'Редактирование';
        modal.classList.toggle('active'); 
        const modalForm = document.querySelector('form'); 
        const modalBtn = modalForm.querySelector('button'); 
        const modalBtnClose = modalForm.querySelector('.button-form-close'); 
        const catUpdate = getViewCardInLocal(event.target.value); 
        const forms = document.forms[0]; 
        const formElements = document.forms[0].elements; 
        formElements.name.value = catUpdate.name; 
        formElements.image.value = catUpdate.image;
        formElements.age.value = catUpdate.age;
        formElements.rate.value = catUpdate.rate;
        if (catUpdate.favorite) {
          formElements.favorite.setAttribute('checked', 'checked');
        }
        formElements.description.value = catUpdate.description;

        modalBtn.addEventListener('click', (evt) => {
          forms.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(forms); 
            const catObj = Object.fromEntries(formData); 
            const cat = { id: catUpdate.id, ...catObj };
            const favorite = cat.favorite 
              ? (cat.favorite = true)
              : (cat.favorite = false);
            api.updateCat({ ...cat, favorite: favorite }).then((res) => {
              refreshCatsAndContent();
            });
            modal.classList.toggle('active'); 
            forms.reset(); 
          });
        });

        modalBtnClose.addEventListener('click', (evt) => {
          modal.remove(); 
          popupModal.remove()
        });
        break;
      case 'cat-card-delete': //обработка нажатия кнопки удаления
        api.getDeleteCat(event.target.value).then((res) => {
          refreshCatsAndContent(); 
        });
        break;
    }
  }
});

const getViewCardInLocal = (id) => {
  // функция получения данных из хранилища
  let view = JSON.parse(store.getItem('cats')); 
  let viewCard = view.find((el) => el['id'] == id); 
  return viewCard;
};

const getNewIdOfCat = () => {
  //функция генерации id для нового кота
  let res = JSON.parse(store.getItem('cats')); 
  if (res.length) {
    return Math.max(...res.map((el) => el.id)) + 1; 
  } else {
    return 1;
  }
};
