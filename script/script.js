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
        hours = Math.floor((timeRemainig / 60 / 60) % 24);
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
  countTimer("3 november 2020");
});
