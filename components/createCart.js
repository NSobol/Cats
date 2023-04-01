const createCard = () => {
  return `<div>
	  <div class="create-edit-modal-form">
				<form action="/target/" class="modal-form">
					<label for="name">Имя</label> 
					<input id="name" name="name" placeholder="Имя" required /> <br />
					<label for="image">Ссылка на изображение</label>
					<input id="image" name="image" placeholder="Ссылка на изображение" required /><br />
					<label for="age">Возраст</label> 
					<input id="age" name="age" type="number" placeholder="Возраст" required /> <br />
					<label for="rate">Рейтинг</label> 
					<input id="rate" name="rate" type="number" placeholder="Рейтинг" required /> <br />
					<label htmlFor="favorite">Любимчик</label>
					<input type="checkbox" />
					<textarea id="description" name="description" rows="3" placeholder="Описание" required></textarea>
					<button type="submit">Ok</button>
					<button type="reset">Закрыть</button>
				</form>
			</div>
		</div>`;
};
