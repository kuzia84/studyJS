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
});
