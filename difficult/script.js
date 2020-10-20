"use strict";

function timer() {
  let date = new Date(Date.now()),
    outDateA = document.getElementById("dateA"),
    outDateB = document.getElementById("dateB"),
    optionsA = {
      month: "long",
      day: "numeric",
    },
    weekday,
    hourEnds;

  switch (date.getDay()) {
    case 0:
      weekday = "Воскресенье";
      break;
    case 1:
      weekday = "Понедельник";
      break;
    case 2:
      weekday = "Вторник";
      break;
    case 3:
      weekday = "Среда";
      break;
    case 4:
      weekday = "Четверг";
      break;
    case 5:
      weekday = "Пятница";
      break;
    case 6:
      weekday = "Суббота";
      break;
  }
  switch (date.getHours()) {
    case 1:
    case 21:
      hourEnds = "час";
      break;
    case 2:
    case 22:
    case 3:
    case 23:
    case 4:
      hourEnds = "часа";
      break;
    default:
      hourEnds = "часов";
  }

  let timeA = `а) Сегодня ${weekday}, 
  ${date.toLocaleString("ru", optionsA)} 
  ${date.getFullYear()} года, 
  ${date.getHours()} 
  ${hourEnds} 
  ${date.getMinutes()} минут 
  ${date.getSeconds()} секунд`;

  let timeB = `б) ${date.toLocaleDateString("ru")} - 
  ${date.toLocaleTimeString("ru")}`;
  outDateA.innerHTML = "";
  outDateA.insertAdjacentHTML("afterbegin", timeA);
  outDateB.innerHTML = "";
  outDateB.insertAdjacentHTML("afterbegin", timeB);
}

setInterval(() => {
  timer();
}, 1000);
