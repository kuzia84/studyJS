"use strict";
const week = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ],
  weekList = document.getElementById("week");

week.forEach((day) => {
  weekList.insertAdjacentHTML("beforeend", `<li>${day}</li>`);
});

const weekDays = document.getElementsByTagName("li");
let today = new Date(Date.now()).getDay();

weekDays[0].style.fontStyle = "italic";
weekDays[6].style.fontStyle = "italic";
weekDays[today].style.fontWeight = "700";
