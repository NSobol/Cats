const config = {
  baseUrl: 'https://cats.petiteweb.dev/api/single/NSobol/',
};

export const getAllCats = () => {
  //получение всех котиков
  return fetch(`${config.baseUrl}show`).then((res) => {
    return res.ok ? res.json() : Promise.reject(res.json());
  });
};

export const addCat = (cat) => {
  //добавление котика
  return fetch(`${config.baseUrl}add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cat),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(res.json());
  });
};

export const updateCat = (newCat) => {
  //изменение котика
  return fetch(`${config.baseUrl}update/${newCat.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCat),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(res.json());
  });
};

export const getIdAllCats = () => {
  //получение id всех котиков
  return fetch(`${config.baseUrl}ids`).then((res) => {
    return res.ok ? res.json() : Promise.reject(res.json());
  });
};

export const getDisplayCat = (id) => {
  //отобразить одного котика
  return fetch(`${config.baseUrl}show/${id}`).then((res) => {
    return res.ok ? res.json() : Promise.reject(res.json());
  });
};

export const getDeleteCat = (id) => {
  //удаление котика
  return fetch(`${config.baseUrl}delete/${id}`, {
    method: 'DELETE',
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(res.json());
  });
};
