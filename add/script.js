/* eslint-disable strict */
/* eslint-disable indent */
"use strict";
function dateInfo() {
  const infoDayTime = document.querySelector(".day-time"),
    infoWeekDay = document.querySelector(".week-day"),
    infocurrentTime = document.querySelector(".current-time"),
    infoDaysRemain = document.querySelector(".days-remain");
  function getTime() {
    const currentDate = new Date().getTime(),
      newYear = new Date(2021, 0, 1).getTime(),
      timeRemainig = (newYear - currentDate) / 1000,
      hours = new Date().getHours(),
      days = Math.floor(timeRemainig / 60 / 60 / 24),
      time = new Date().toLocaleTimeString("en"),
      weekDay = new Date().getDay();
    return { timeRemainig, hours, days, time, weekDay };
  }

  function updateTimeInfo() {
    const info = getTime();
    let weekDayText;
    console.log(info);
    switch (info.weekDay) {
      case 0:
        weekDayText = "Воскресенье";
        break;
      case 1:
        weekDayText = "Понеденьник";
        break;
      case 2:
        weekDayText = "Вторник";
        break;
      case 3:
        weekDayText = "Среда";
        break;
      case 4:
        weekDayText = "Четверг";
        break;
      case 5:
        weekDayText = "Пятница";
        break;
      case 6:
        weekDayText = "Суббота";
        break;

      default:
        break;
    }
    if (info.hours > 3 && info.hours < 12) {
      infoDayTime.textContent = "Доброе утро";
    } else if (info.hours > 11 && info.hours < 17) {
      infoDayTime.textContent = "Добрый день";
    } else if (info.hours > 16) {
      infoDayTime.textContent = "Добрый вечер";
    } else {
      infoDayTime.textContent = "Доброй ночи";
    }

    infoWeekDay.textContent = weekDayText;
    infocurrentTime.textContent = info.time;
    infoDaysRemain.textContent = info.days;
  }
  updateTimeInfo();
}
dateInfo();
