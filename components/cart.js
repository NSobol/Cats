const generateCard = (cat) => {
  return `<div class='cat-card'>
	<img src=${cat.image} alt="" />
	<p class="cat-name">${cat.name}</p>
	<p class="cat-description">${cat.description}</p>
	<p class="cat-favorite"><img src="" alt="Любимчик" /></p>
	<div className="cat-rate"></div> 	
	<div class="cat-card-btns">
	<button class="cat-card-view" value=${cat.id}>Посмотреть</button>
	<button class="cat-card-update" value=${cat.id}>Изменить</button>
	<button class="cat-card-delete" value=${cat.id}>Удалить</button>
	</div>
	</div>`;
};
