const homepage = document.getElementById('homepage');
const refreshCatsAndContent = () => {
  const content = document.getElementsByClassName('content')[0];
  content.innerHTML = '';

  api.getAllCats().then((res) => {
    // console.log(res);
    const cards = res.reduce((acc, el) => (acc += generateCard(el)), '');
    content.insertAdjacentHTML('afterbegin', cards);
  });
};

refreshCatsAndContent();
document
  .getElementsByClassName('content')[0]
  .addEventListener('click', (event) => {
    console.log(event.target);
    if (event.target.tagName === 'BUTTON') {
      switch (event.target.className) {
        case 'cat-card-view':
          api.getDisplayCat(event.target.value).then((res) => {
            console.log(res);
            refreshCatsAndContent();
          });
          break;
        case 'cat-card-update':
          const evt = event.target.value;
          const modal = document.querySelector('.create-edit-modal-form');
          modal.classList.toggle('active'); //делаем модалку активной
          const modalForm = document.querySelector('form'); //находим форму
          const modalBtn = modalForm.querySelector('button'); //находим кнопку отправки формы
          modalBtn.addEventListener('click', (evt) => {
            const forms = document.forms[0];
            forms.addEventListener('submit', (event) => {
              // вешаем обработчик на кнопку формы
              event.preventDefault();
              const formData = new FormData(forms); //получаем данные формы
              const cat = Object.fromEntries(formData); //вытаскиваем объект с данными для отправки
              api.updateCat(cat).then((res) => {
                console.log(res);
                refreshCatsAndContent();
              });
              modal.classList.toggle('active'); //делаем модалку неактивной
              forms.reset(); //очистка полей формы
            });
          });
          break;
        case 'cat-card-delete':
          api.getDeleteCat(event.target.value).then((res) => {
            console.log(res);
            refreshCatsAndContent();
          });
          break;
      }
    }
  });

// api
//   .addCat({
//     id: 1,
//     name: 'Рыжик',
//     favorite: true,
//     rate: 5,
//     age: 1,
//     description: 'Солнышко звали? Я пришел!',
//     image:
//       'https://avatars.mds.yandex.net/i?id=025b0ef68cc95b2d04b5eb177fdf68720692ee10-9181645-images-thumbs&n=13&exp=1',
//   })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

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

// api
//   .addCat({
//     id: 3,
//     name: 'Белка',
//     favorite: false,
//     rate: 5,
//     age: 3,
//     description: 'Облако спутилось на землю',
//     image:
//       'https://yandex-images.clstorage.net/OMpm54165/731e5dVB2A1/TciKfGsMvWYbRehj9GFlm3k7ToJJibhGvVIKPKx1waiCu-6X4x_IdizoZSWkZEaS-17Nsc0hS5rceEsdExUh8I0ZWW76yWvyCwA9YfSgJRwua4rFXwivAC3FHOy740KpAz9uFbLfXOWoK6Vq_q1Oj-KVwDsEvpXIHW2eHMDHJPWCQlo85Jx15FXeKCb5aCeRLj3EBRrAa4gxCdUtb2vQtpPtI1N1hxXiJnB143thg4Rj2kK3zzebwFdilpsOnSp9CQXDduvf8ySb0Ght9CSmHqJ1CosTiCQIMsMXKeNqX3RfZm0SdkPboeT-uOk57wRDYNxFOQ48FIXep9zexF0u9cHHSrNr1jSkmtcqLjtjbRshcoKO1E9pDLgD3C1rLFQ-FqKtHXcA0-budXOsvGeAx-GYQjuJetNPHqBW1wtXZHkHjwiy6Vq_ZJwS5C_1oW0fYPLFhBhH7ke8jhZl4OAW9dLl7Vf7TZZj4Thy6HypBERoHU_5wzfUxJ1oWh5Hlqv4BcDItq7Tc2faWiAo-WTt3CL7hk8XAG2INs9drGgm0HcZaGWVM4UcKmV8euu8ZwtPp5MPP0WxGoDY4lUUzxBrNYdPwfblF7yikxYgI_piJthoMgxOEU6qSXwHUyOvah4-nKJtl_YL16hmOTvrN-gIyWaYDbpFuZsO1-NZF4YRbb6ICYH8Zx5wa56XbGm9aeSZpDqEidMIY0K4AR9lZCvT-Vag4NL2BZ1uZj28YD0lSs4jHMr5xH-WDFSvVdQPl2S4BEmOPq6ct60ZG2XmM21ikGk-QwwbR2wH9Ycf6WFkGfiUpWIc_c-WZel_sO43IYwLLN7HM4d30MYW5luZSFzs_ETFQfZvFPprFFuu7bar75lve8-Gkgaiz3HDEmBhqpY7WmxtVnYP0GjstHnnteFAiqQTSDDBcJQCE6xa2wxWJLPBTc_5qdp_J1Sf5WY1Lm0UJr3HjNCHJ8p2SVRmqY',
//   })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
const forms = document.forms[0];
forms.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(forms);
  //   console.log(event.target);
  const body = Object.fromEntries(formData);
  console.log(body);

  //api.addCat() c getNewIdOfCat
  //api.updateCat() c getNewIdOfCat
});

const getNewIdOfCat = () => {
  return api.getIdAllCats().then((res) => {
    return Math.max(...res) + 1;
  });
};
getNewIdOfCat().then((res) => {
  //   console.log(res);
});
