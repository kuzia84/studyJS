"use strict";
let lang = "ru";
let days = [
  [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ],
  [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
];

if (lang === "ru") {
  console.log(
    "a. Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье"
  );
} else if (lang === "en") {
  console.log(
    "a. Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday"
  );
} else {
  console.log("a. lang задано не верно");
}
switch (lang) {
  case "ru":
    console.log(
      "b. Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье"
    );
    break;
  case "en":
    console.log(
      "b. Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday"
    );
    break;
  default:
    console.log("b. lang задано не верно");
}

let arrDays = [];
arrDays =
  lang === "ru" ? days[0] : lang === "en" ? days[1] : "lang задано не верно";
console.log(arrDays);

let namePerson = "Артем";
namePerson === "Артем"
  ? console.log(namePerson, "директор")
  : namePerson === "Максим"
  ? console.log(namePerson, "преподаватель")
  : console.log(namePerson, "студент");
