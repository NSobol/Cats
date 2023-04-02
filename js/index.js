//Блок глобальных переменных проекта
const homepage = document.getElementById('homepage'); //находим элемент с id "homepage"
//const content = document.getElementsByClassName('content')[0];// находим элемент с классом content
//второй вариант найти этот элемент
const content = document.querySelector('.content');
const headerBtns = document.querySelector('.header-btns'); //Находим кнопки добавить и обновить через родительский блок
let store = window.localStorage; // инициализация локального хранилища

//Блок функций и обработчиков
const refreshCatsAndContent = () => {
  //функция отрисовки карточек
  content.innerHTML = '';
  api.getAllCats().then((res) => {
    console.log(res); // вывод в консоль ответа сервера
    store.setItem('cats', JSON.stringify(res)); // пополнение локального хранилища нашими котами
    const cards = JSON.parse(store.getItem('cats')).reduce(
      (acc, el) => (acc += generateCard(el)),
      ''
    ); //генерация карточек в соответствии с ответом сервера и хранилищем
    content.insertAdjacentHTML('afterbegin', cards); //добавляем карточки в блок content
  });
};

refreshCatsAndContent(); //вызов функции отрисовки карточек

headerBtns.addEventListener('click', (event) => {
  //обработчик кнопок добавить и обновить

  if (event.target.tagName === 'BUTTON') {
    switch (event.target.className) {
      case 'add-btn':
        const evt = event.target.value;
        const createCardForm = createCard(); //при нажатии кнопки происходит отрисовка карточки
        content.insertAdjacentHTML('afterbegin', createCardForm); //добавляем карточку на страницу
        const modal = document.querySelector('.create-edit-modal-form'); //находим элемент с классом create-edit-modal-form
        //console.log(modal); // проверка что нашли
        modal.classList.add('active'); //делаем модалку активной
        const modalForm = document.querySelector('form'); //находим форму
        const modalBtn = modalForm.querySelector('button'); //находим кнопку отправки формы
        modalBtn.addEventListener('click', (evt) => {
          const forms = document.forms[0];
          event.preventDefault();
          const formData = new FormData(forms); //получаем данные формы
          const catObj = Object.fromEntries(formData); //вытаскиваем объект с данными для отправки
          const cat = { id: getNewIdOfCat(), ...catObj };
          //console.log(cat); //выводим новый элемент в консоль
          api.addCat(cat).then((res) => {
            //отправляем нового кота на сервер
            console.log(res);
            refreshCatsAndContent(); //отрисовка карточек заново
          });

          modal.classList.toggle('active'); //делаем модалку неактивной
          forms.reset(); //очистка полей формы
          modal.remove(); //удаляем форму из дом-дерева
          //   forms.addEventListener('submit', (event) => {
          //     // вешаем обработчик на кнопку формы
          //   });
        });
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
      case 'cat-card-view':
        api.getDisplayCat(event.target.value).then((res) => {
          console.log(res);
          refreshCatsAndContent();
        });
        break;
      case 'cat-card-update':
      // const modal = document.querySelector('.create-edit-modal-form');
      // modal.classList.toggle('active'); //делаем модалку активной
      // const modalForm = document.querySelector('form'); //находим форму
      // const modalBtn = modalForm.querySelector('button'); //находим кнопку отправки формы
      // modalBtn.addEventListener('click', (evt) => {
      //   const forms = document.forms[0];
      //   forms.addEventListener('submit', (event) => {
      //     // вешаем обработчик на кнопку формы
      //     event.preventDefault();
      //     const formData = new FormData(forms); //получаем данные формы
      //     const cat = Object.fromEntries(formData); //вытаскиваем объект с данными для отправки
      //     api.updateCat(cat).then((res) => {
      //       console.log(res);
      //       refreshCatsAndContent();
      //     });
      //     modal.classList.toggle('active'); //делаем модалку неактивной
      //     forms.reset(); //очистка полей формы
      //   });
      // });
      // break;
      case 'cat-card-delete':
        deleteCatFromLocalStorage(event.target.value);
        refreshCatsAndContent();
        // api.getDeleteCat(event.target.value).then((res) => {//запрос на сервер и промис
        //   console.log(res);
        //   refreshCatsAndContent();
        // });
        break;
    }
  }
});

// api
//   .addCat({
//     id: 2,
//     name: 'Инь и Янь',
//     favorite: false,
//     rate: 5,
//     age: 3,
//     description: 'Черное и белое - единство и борьба противоположностей',
//     image:
//       'https://yandex-images.clstorage.net/OMpm54165/731e5dVB2A1/TciKfGsMvWYbRehj9GFlm3k7ToJJibhGvVIf_Pj2gahB727WoIjJ9rmp8bFnZUYH7EtM5Zh1SE8drl9L08K0sVjY2W77S2pzCcB9YfSgJRwua4rFXwivAC3FHOy740KpAz9uFbLfXOWoK6Vq_q1Oj-KVwDsEvpXIHW2eHMDHJPWCQlo85Jx15FXeKCb5aCeRLj3EBRrAa4gxCdUtb2vQtpPtI1N1hxXiJnB143thg4Rj2kK3zzebwFdilpsOnSp9CQXDduvf8ySb0Ght9CSmHqJ1CosTiCQIMsMXKeNqX3RfZm0SdkPboeT-uOk57wRDYNxFOQ48FIXep9zexF0u9cHHSrNr1jSkmtcqLjtjbRshcoKO1E9pDLgD3C1rLFQ-FqKtHXcA0-budXOsvGeAx-GYQjuJetNPHqBW1wtXZHkHjwiy6Vq_ZJwS5C_1oW0fYPLFhBhH7ke8jhZl4OAW9dLl7Vf7TZZj4Thy6HypBERoHU_5wzfUxJ1oWh5Hlqv4BcDItq7Tc2faWiAo-WTt3CL7hk8XAG2INs9drGgm0HcZaGWVM4UcKmV8euu8ZwtPp5MPP0WxGoDY4lUUzxBrNYdPwfblF7yikxYgI_piJthoMgxOEU6qSXwHUyOvah4-nKJtl_YL16hmOTvrN-gIyWaYDbpFuZsO1-NZF4YRbb6ICYH8Zx5wa56XbGm9aeSZpDqEidMIY0K4AR9lZCvT-Vag4NL2BZ1uZj28YD0lSs4jHMr5xH-WDFSvVdQPl2S4BEmOPq6ct60ZG2XmM21ikGk-QwwbR2wH9Ycf6WFkGfiUpWIc_c-WZel_sO43IYwLLN7HM4d30MYW5luZSFzs_ETFQfZvFPprFFuu7bar75lve8-Gkgaiz3HDEmBhqpY7WmxtVnYP0GjstHnnteFAiqQTSDDBcJQCE6xa2wxWJLPBTc_5qdp_J1Sf5WY1Lm0UJr3HjNCHJ8p2SVRmqY',
//   })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const addCatInLocalStorage = (cat) => {
  //функция добавления кота в локальное хранилище
  store.setItem(
    //добавляем в хранилище
    'cats',
    JSON.stringify([...JSON.parse(store.getItem('cats')), cat])
  );
};

const deleteCatFromLocalStorage = (catId) => {
  //функция удаления котика из хранилища
  store.setItem(
    'cats',
    JSON.stringify(
      JSON.parse(store.getItem('cats')).filter((el) => el.id != catId)
    )
  );
};

const getNewIdOfCat = () => {
  //функция генерации id для нового кота
  let res = JSON.parse(store.getItem('cats')); // получение данных о котах с нашего локального хранилища
  if (res.length) {
    return Math.max(...res.map((el) => el.id)) + 1; //здесь максимально значение из имеющихся на этот момент и увеличение его на единицу
  } else {
    return 1;
  }
};
