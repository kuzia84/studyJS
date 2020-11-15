"use strict";
const filter = document.getElementById("filter");
const heroesList = document.querySelector(".heroes__list");

const getData = (cb) => {
  const request = new XMLHttpRequest();
  request.open("GET", "./dbHeroes.json");
  request.addEventListener("readystatechange", () => {
    if (request.readyState !== 4) return;

    if (request.status === 200) {
      const response = JSON.parse(request.responseText);
      cb(response);
    } else {
      new Error(request.statusText);
    }
  });
  request.send();
};

const projection = (fields, obj) =>
  Object.keys(obj)
    .filter((field) => fields.includes(field))
    .reduce((newObj, key) => {
      newObj[key] = obj[key];
      return newObj;
    }, {});

const createFilterOptions = () => {
  getData((data) => {
    const newHero = data.map((item) => projection(["movies"], item));
    let allMovies = [];
    newHero.forEach((element) => {
      const { movies } = element;
      allMovies = allMovies
        .concat(movies)
        .reduce((unique, item) => {
          return unique.includes(item) ? unique : [...unique, item];
        }, [])
        .filter((item) => item !== undefined);
    });

    allMovies.forEach((element) => {
      const filterOption = document.createElement("option");
      filterOption.value = element;
      filterOption.textContent = element;
      filter.insertAdjacentElement("beforeend", filterOption);
    });
  });
};
createFilterOptions();

const filterFilms = (filterValue) => {
  heroesList.innerHTML = "";
  getData((data) => {
    const newHero = data.map((item) =>
      projection(["photo", "name", "realName", "movies", "status"], item)
    );

    newHero.forEach((element) => {
      const { photo, name, realName, movies, status } = element,
        heroCard = document.createElement("li");

      let moviesList;
      if (movies) {
        moviesList = movies.join("<br>");
      } else {
        moviesList = "Не снимался";
      }

      heroCard.classList.add("heroes__item");

      if (status === "deceased") heroCard.classList.add("dead");

      heroCard.innerHTML = `
				<div class="hero-card">
					<div class="hero-card__img">
						<img src="${photo}" alt="${name}">
					</div>
					<div class="hero-card__body">
						<div class="hero-card__nickname">
							<span class="hero-card__legend">Имя:</span>
							${name}
						</div>
						<div class="hero-card__name">
							<span class="hero-card__legend">Настоящее имя:</span>
							${realName ? realName : "Не известно"}
						</div>                
						<div class="hero-card__films">                    
							<span class="hero-card__legend">Фильмы:</span>
							${moviesList}
						</div>
						<div class="hero-card__status">
							<span class="hero-card__legend">Статус:</span>
							${status === "deceased" ? "Герой скончался" : "Герой жив"}
						</div>
					</div>
				</div>
			`;
      if (movies) {
        movies.forEach((element) => {
          if (element === filterValue) {
            heroesList.insertAdjacentElement("beforeend", heroCard);
          } else {
            return;
          }
        });
      }
    });
  });
};

filter.addEventListener("change", () => {
  filterFilms(filter.value);
});
