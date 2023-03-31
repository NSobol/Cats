const config = {
  baseUrl: 'https://cats.petiteweb.dev/api/single/NSobol/',
};

class Api {
  constructor(config) {
    this.baseUrl = config.baseUrl;
  }

  getAllCats = () => {
    //получение всех котиков
    return fetch(`${this.baseUrl}show`).then((res) => {
      return res.ok ? res.json() : Promise.reject(res.json());
    });
  };

  addCat = (cat) => {
    //добавление котика
    return fetch(`${this.baseUrl}add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cat),
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject('У меня лапки');
    });
  };

  updateCat = (cat) => {
    //изменение котика
    return fetch(`${this.baseUrl}update/${cat.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cat),
    }).then((res) => {
      console.log(res);
      return res.ok ? res.json() : Promise.reject('У меня лапки');
    });
  };

  getIdAllCats = () => {
    //получение id всех котиков
    return fetch(`${this.baseUrl}ids`).then((res) => {
      return res.ok ? res.json() : Promise.reject('У меня лапки');
    });
  };

  getDisplayCat = (id) => {
    //отобразить одного котика
    return fetch(`${this.baseUrl}show/${id}`).then((res) => {
      return res.ok ? res.json() : Promise.reject('У меня лапки');
    });
  };

  getDeleteCat = (id) => {
    //удаление котика
    return fetch(`${this.baseUrl}delete/${id}`, {
      method: 'DELETE',
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject('У меня лапки');
    });
  };
}

const api = new Api(config);
