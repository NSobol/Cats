const generateCardView = (cat) => {
  return `<div class='cardView-popup'>
  <div class="cardView-image">
 	<img src=${
    cat.image !== '' ? cat.image : defaultLink
  } alt="Картинка котика" /> 
  </div>
	<div class="cardView-content">
		<div class="card-name">${cat.name}</div>
		<div class="card-description">${cat.description}</div>
		<div class="card-age">${cat.age}</div> 
		<div class="card-rate">${cat.rate}</div> 

	</div>
	
	<button class="cardView-exit">Закрыть</button>
	</div>`;
};
