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
    const btnMenu = document.querySelector(".menu"),
      menu = document.querySelector("menu"),
      btnClose = document.querySelector(".close-btn"),
      minuItems = menu.querySelectorAll("ul>li");

    const menuHandler = () => {
      menu.classList.toggle("active-menu");
    };
    btnMenu.addEventListener("click", menuHandler);
    btnClose.addEventListener("click", menuHandler);
    minuItems.forEach((item) => item.addEventListener("click", menuHandler));
  };
  toggleMenu();

  //TogglePopup
  const togglePopup = () => {
    const popup = document.querySelector(".popup"),
      btnPopupClose = popup.querySelector(".popup-close"),
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

    btnPopupClose.addEventListener("click", () => {
      popup.style.display = "none";
    });
  };
  togglePopup();

  //ScrollFrirstScreen
  const scrollScreen = () => {
    const scrollLinks = document.querySelectorAll(".scroll-link");

    scrollLinks.forEach((element) => {
      const toBlock = element.getAttribute("href"),
        scrollTo = document.querySelector(toBlock),
        scrollToBlock = scrollTo.offsetTop;

      const animateScroll = () => {
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
});
