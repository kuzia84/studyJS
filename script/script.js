/* eslint-disable linebreak-style */
/* eslint-disable arrow-parens */

window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // Timer
  function countTimer(deadline) {
    const timerHours = document.querySelector("#timer-hours"),
      timerMinutes = document.querySelector("#timer-minutes"),
      timerSeconds = document.querySelector("#timer-seconds");

    function getTimeRemaining() {
      const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemainig = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemainig % 60),
        minutes = Math.floor((timeRemainig / 60) % 60),
        hours = Math.floor(timeRemainig / 60 / 60);
      return { timeRemainig, seconds, minutes, hours };
    }

    function updateClock() {
      const timer = getTimeRemaining();
      if (timer.hours < 10) {
        timer.hours = "0" + timer.hours;
      }
      if (timer.minutes < 10) {
        timer.minutes = "0" + timer.minutes;
      }
      if (timer.seconds < 10) {
        timer.seconds = "0" + timer.seconds;
      }
      timerHours.textContent = timer.hours;
      timerMinutes.textContent = timer.minutes;
      timerSeconds.textContent = timer.seconds;
    }

    const updateClockId = setInterval(updateClock, 1000);

    if (getTimeRemaining().timeRemainig < 0) {
      clearInterval(updateClockId);
      timerHours.textContent = "00";
      timerMinutes.textContent = "00";
      timerSeconds.textContent = "00";
    }
  }
  countTimer("23 november 2020");

  //Menu
  const toggleMenu = () => {
    const menu = document.querySelector("menu"),
      btnMenu = document.querySelector(".menu");

    const menuHandler = () => {
      menu.classList.toggle("active-menu");
    };

    document.body.addEventListener("click", (event) => {
      let target = event.target;
      if (
        target.classList.contains("close-btn") ||
        target.classList.contains("scroll-link") ||
        target.parentNode === btnMenu
      ) {
        menuHandler();
      } else {
        target = target.closest(".active-menu");
        if (!target && menu.classList.contains("active-menu")) {
          menuHandler();
        }
      }
    });
  };
  toggleMenu();

  //TogglePopup
  const togglePopup = () => {
    const popup = document.querySelector(".popup"),
      popupContent = popup.querySelector(".popup-content"),
      popupBtns = document.querySelectorAll(".popup-btn");

    const animatePopup = () => {
      popupContent.style.opacity = 0;
      const animationStart = Date.now();
      const animationTimer = setInterval(() => {
        const timePassed = Date.now() - animationStart;

        if (timePassed > 500) {
          clearInterval(animationTimer);
          return;
        }

        draw(timePassed);

        function draw(timePassed) {
          popupContent.style.opacity = timePassed * 0.002;
        }
      }, 20);
    };

    popupBtns.forEach((item) =>
      item.addEventListener("click", () => {
        popup.style.display = "block";
        if (document.body.clientWidth > 768) {
          animatePopup();
        }
      })
    );

    popup.addEventListener("click", (event) => {
      let target = event.target;

      if (target.classList.contains("popup-close")) {
        popup.style.display = "none";
      } else {
        target = target.closest(".popup-content");

        if (!target) {
          popup.style.display = "none";
        }
      }
    });
  };
  togglePopup();

  //ScrollScreen
  const scrollScreen = () => {
    const scrollLinks = document.querySelectorAll(".scroll-link");

    scrollLinks.forEach((element) => {
      const animateScroll = () => {
        const toBlock = element.getAttribute("href"),
          scrollTo = document.querySelector(toBlock),
          scrollToBlock = scrollTo.offsetTop;
        const animationStart = Date.now();
        const animationTimer = setInterval(() => {
          const timePassed = Date.now() - animationStart;

          if (timePassed > 510) {
            clearInterval(animationTimer);
            return;
          }

          draw(timePassed);

          function draw(timePassed) {
            const scrollValue = timePassed * 0.002 * scrollToBlock;
            document.documentElement.scrollTop = scrollValue;
          }
        }, 20);
      };

      element.addEventListener("click", () => {
        animateScroll();
      });
    });
  };
  scrollScreen();

  //Tabs
  const tabs = () => {
    const tabHeader = document.querySelector(".service-header"),
      tab = tabHeader.querySelectorAll(".service-header-tab"),
      tabContent = document.querySelectorAll(".service-tab");

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add("active");
          tabContent[i].classList.remove("d-none");
        } else {
          tab[i].classList.remove("active");
          tabContent[i].classList.add("d-none");
        }
      }
    };

    tabHeader.addEventListener("click", (event) => {
      let target = event.target;
      target = target.closest(".service-header-tab");

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };
  tabs();

  //Slider
  const slider = () => {
    const slider = document.querySelector(".portfolio-content"),
      slide = document.querySelectorAll(".portfolio-item"),
      portfolioDots = document.querySelector(".portfolio-dots");

    let currentSlide = 0,
      interval;

    // функция создает точки для каждого слайда
    const addDots = () => {
      for (let i = 0; i < slide.length; i++) {
        const dotElement = document.createElement("li");
        dotElement.classList.add("dot");
        portfolioDots.insertAdjacentElement("beforeend", dotElement);
      }
    };
    addDots();

    const dot = document.querySelectorAll(".dot");
    dot[0].classList.add("dot-active"); //добавляем первой точке класс активной точки

    const prevSlide = (element, index, strClass) => {
      element[index].classList.remove(strClass);
    };
    const nextSlide = (element, index, strClass) => {
      element[index].classList.add(strClass);
    };
    const autoplaySlide = () => {
      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dot, currentSlide, "dot-active");
      currentSlide++;

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active");
    };
    const startSlide = (time = 2000) => {
      interval = setInterval(autoplaySlide, time);
    };
    const stopSlide = () => {
      clearInterval(interval);
    };
    slider.addEventListener("click", (event) => {
      event.preventDefault();
      const target = event.target;

      if (!target.matches(".portfolio-btn, .dot")) {
        return;
      }

      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dot, currentSlide, "dot-active");

      if (target.matches("#arrow-right")) {
        currentSlide++;
      } else if (target.matches("#arrow-left")) {
        currentSlide--;
      } else if (target.matches(".dot")) {
        dot.forEach((element, index) => {
          if (element === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }

      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active");
    });

    slider.addEventListener("mouseover", (event) => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      ) {
        stopSlide();
      }
    });
    slider.addEventListener("mouseout", (event) => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      ) {
        startSlide();
      }
    });
    startSlide(2000);
  };
  slider();

  //Team
  const changeTeamIng = () => {
    const commandPhoto = document.querySelectorAll(".command__photo");
    commandPhoto.forEach((element) => {
      const oldPhoto = element.src,
        newPhoto = element.dataset.img;
      element.addEventListener("mouseenter", () => {
        element.src = newPhoto;
      });
      element.addEventListener("mouseleave", () => {
        element.src = oldPhoto;
      });
    });
  };
  changeTeamIng();

  //Calc
  const calcValidation = () => {
    const calcBlock = document.querySelector(".calc-block");
    calcBlock.addEventListener("input", (event) => {
      const target = event.target;

      if (target.matches("input")) {
        target.value = target.value.replace(/\D/g, "");
      }
    });
  };
  calcValidation();

  const calc = (price = 100) => {
    const calcBlock = document.querySelector(".calc-block"),
      calcType = document.querySelector(".calc-type"),
      calcSquare = document.querySelector(".calc-square"),
      calcCount = document.querySelector(".calc-count"),
      calcDay = document.querySelector(".calc-day"),
      totalValue = document.getElementById("total");

    const animateValue = (total) => {
      let count = 0;
      const animate = setInterval(() => {
        count += 10;
        totalValue.textContent = count;
        if (count >= total) {
          clearInterval(animate);
          totalValue.textContent = total;
        }
      }, 0);
      clearInterval(animate - 1);
    };

    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

      if (typeValue && squareValue) {
        total = Math.ceil(
          price * typeValue * squareValue * countValue * dayValue
        );
        animateValue(total);
      }
    };

    calcBlock.addEventListener("change", (event) => {
      const target = event.target;

      if (target.matches("input") || target.matches("select")) {
        countSum();
      }
    });
  };
  calc(100);

  //Validator
  const valid1 = new Validator({
    selector: "#form1",
    pattern: {
      ruTxt: /[А-Яа-яёЁ]+/,
    },
    method: {
      "form1-name": [["notEmpty"], ["pattern", "ruTxt"]],
      "form1-phone": [["notEmpty"], ["pattern", "phone"]],
      "form1-email": [["notEmpty"], ["pattern", "email"]],
    },
  });
  valid1.init();

  const valid2 = new Validator({
    selector: "#form2",
    pattern: {
      ruTxt: /[А-Яа-яёЁ]+/,
    },
    method: {
      "form2-name": [["notEmpty"], ["pattern", "ruTxt"]],
      "form2-phone": [["notEmpty"], ["pattern", "phone"]],
      "form2-email": [["notEmpty"], ["pattern", "email"]],
      "form2-message": [["notEmpty"], ["pattern", "ruTxt"]],
    },
  });
  valid2.init();

  const valid3 = new Validator({
    selector: "#form3",
    pattern: {
      ruTxt: /[А-Яа-яёЁ]+/,
    },
    method: {
      "form3-name": [["notEmpty"], ["pattern", "ruTxt"]],
      "form3-phone": [["notEmpty"], ["pattern", "phone"]],
      "form3-email": [["notEmpty"], ["pattern", "email"]],
    },
  });
  valid3.init();
});
