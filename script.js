"use strict";
const locale = "RU",
  listDefault = document.querySelector(".dropdown-lists__list--default"),
  listAutocomplete = document.querySelector(
    ".dropdown-lists__list--autocomplete"
  ),
  listSelect = document.querySelector(".dropdown-lists__list--select"),
  selectCities = document.getElementById("select-cities"),
  label = document.querySelector(".label"),
  closeButton = document.querySelector(".close-button"),
  btn = document.querySelector(".button");

const sortByField = (field) => {
  return (a, b) => (a[field] < b[field] ? 1 : -1);
};

const listDefaultContent = () => {
  data[locale].forEach((element) => {
    const countryBlock = document.createElement("div");
    const { country, count, cities } = element;
    countryBlock.classList.add("dropdown-lists__countryBlock");
    countryBlock.innerHTML = `        
        <div class="dropdown-lists__total-line">
            <div class="dropdown-lists__country">${country}</div>
            <div class="dropdown-lists__count">${count}</div>
        </div> 
    `;

    cities.forEach((element) => {
      element.count = +element.count;
    });

    const citiesArr = cities.sort(sortByField("count"));

    for (let i = 0; i < 3; i++) {
      const element = citiesArr[i];
      const { name, count, link } = element;
      const cityElement = document.createElement("div");
      cityElement.link = link;
      cityElement.classList.add("dropdown-lists__line");
      cityElement.innerHTML = `        
        <div class="dropdown-lists__city">${name}</div>
        <div class="dropdown-lists__count">${count}</div>        
      `;
      countryBlock.insertAdjacentElement("beforeend", cityElement);
    }
    listDefault
      .querySelector(".dropdown-lists__col")
      .insertAdjacentElement("beforeend", countryBlock);
  });
};
listDefaultContent();

const listSelectContent = (slectedCountry) => {
  data[locale].forEach((element) => {
    if (element.country === slectedCountry) {
      const countryBlock = document.createElement("div");
      const { country, count, cities } = element;
      countryBlock.classList.add("dropdown-lists__countryBlock");
      countryBlock.innerHTML = `        
        <div class="dropdown-lists__total-line">
            <div class="dropdown-lists__country">${country}</div>
            <div class="dropdown-lists__count">${count}</div>
        </div> 
        `;
      cities.forEach((element) => {
        const { name, count, link } = element;
        const cityElement = document.createElement("div");
        cityElement.link = link;
        cityElement.classList.add("dropdown-lists__line");
        cityElement.innerHTML = `        
            <div class="dropdown-lists__city">${name}</div>
            <div class="dropdown-lists__count">${count}</div>        
        `;
        countryBlock.insertAdjacentElement("beforeend", cityElement);
      });
      listSelect.querySelector(".dropdown-lists__col").innerHTML = "";
      listSelect
        .querySelector(".dropdown-lists__col")
        .insertAdjacentElement("beforeend", countryBlock);
    }
  });
};

const listAutocompleteContent = () => {
  const countryBlock = listAutocomplete.querySelector(
    ".dropdown-lists__countryBlock"
  );

  data[locale].forEach((element) => {
    const { cities } = element;
    cities.forEach((element) => {
      const { name, count, link } = element;
      const cityElement = document.createElement("div");
      cityElement.link = link;
      cityElement.classList.add("dropdown-lists__line");
      cityElement.style.display = "none";
      cityElement.innerHTML = `
          <div class="dropdown-lists__city">${name}</div>
          <div class="dropdown-lists__count">${count}</div>
      `;
      countryBlock.insertAdjacentElement("beforeend", cityElement);
    });
  });
  countryBlock.insertAdjacentHTML(
    "beforeend",
    `<div class="not-found" style="padding:5px 15px; display:none">Ничего не найдено</div>`
  );
};
listAutocompleteContent();

const searchResult = (searchValue) => {
  const searchItems = Array.from(
    listAutocomplete.querySelectorAll(".dropdown-lists__line")
  );

  searchItems.forEach((element) => {
    const city = element.querySelector(".dropdown-lists__city").textContent;
    if (city.toLowerCase().match("^" + searchValue)) {
      element.style.display = "flex";
    } else {
      element.style.display = "none";
    }
  });

  if (
    searchItems.every((element) => {
      return element.style.display === "none";
    })
  ) {
    listAutocomplete.querySelector(".not-found").style.display = "flex";
  } else {
    listAutocomplete.querySelector(".not-found").style.display = "none";
  }
};

const btnCityLink = (city) => {
  btn.setAttribute("href", city);
};

const targetToInput = (value) => {
  selectCities.value = value;
  closeButton.style.display = "block";
  hideLabel();
};

const hideLabel = () => {
  if (selectCities.value) {
    label.style.display = "none";
  } else {
    label.style.display = "block";
  }
};

window.addEventListener("click", (event) => {
  let target = event.target;
  hideLabel();
  if (target.matches("#select-cities")) {
    listDefault.style.display = "block";
    listSelect.style.display = "none";
    listAutocomplete.style.display = "none";
  } else if (target.matches(".main")) {
    listDefault.style.display = "none";
    listSelect.style.display = "none";
  }
  if (target.matches(".dropdown-lists__line")) {
    btnCityLink(target.link);
  }
  if (target.matches(".dropdown-lists__city")) {
    target = target.closest(".dropdown-lists__line");
    btnCityLink(target.link);
  }
});

window.addEventListener("click", (event) => {
  const target = event.target;
  if (
    target.matches(".dropdown-lists__city") ||
    target.matches(".dropdown-lists__country")
  ) {
    targetToInput(target.textContent);
  }
});

listDefault.addEventListener("click", (event) => {
  let target = event.target;
  if (target.matches(".dropdown-lists__total-line")) {
    target = target.querySelector(".dropdown-lists__country");
    listSelectContent(target.innerHTML);
    listDefault.style.display = "none";
    listAutocomplete.style.display = "none";
    listSelect.style.display = "block";
  }
  if (target.matches(".dropdown-lists__country")) {
    listSelectContent(target.innerHTML);
    listDefault.style.display = "none";
    listAutocomplete.style.display = "none";
    listSelect.style.display = "block";
  }
});

listSelect.addEventListener("click", (event) => {
  const target = event.target;
  if (
    target.matches(
      ".dropdown-lists__total-line, .dropdown-lists__country, .dropdown-lists__count"
    )
  ) {
    listDefault.style.display = "block";
    listSelect.style.display = "none";
    listAutocomplete.style.display = "none";
  }
});

selectCities.addEventListener("input", () => {
  searchResult(selectCities.value.trim());
  listDefault.style.display = "none";
  listSelect.style.display = "none";
  listAutocomplete.style.display = "block";
  if (selectCities.value === "") {
    listDefault.style.display = "block";
    listAutocomplete.style.display = "none";
    btn.removeAttribute("href");
  }
});

closeButton.addEventListener("click", () => {
  selectCities.value = "";
  closeButton.style.display = "none";
  hideLabel();
  listDefault.style.display = "none";
  listSelect.style.display = "none";
  listAutocomplete.style.display = "none";
  btn.removeAttribute("href");
});
