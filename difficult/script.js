"use strict";
let foo = function (data) {
  if (typeof data === "string") {
    //проверяем, является ли data строкой
    let str = data.trim(); //присваеваем str строку из data и убираем пробелы по караям строки
    if (str.length > 30) {
      // проверяем длину str, ели она больше 30
      str = str.slice(0, 29) + "..."; // то обрезаем все после 30 символа и добавляем троеточие
    }
    return str; //возвращаем str
  } else {
    return "передайте строку в функцию";
  }
};

console.log(
  foo(
    "      Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum commodi incidunt nihil natus quia libero modi? Iste harum aperiam nostrum cumque doloremque vitae, minus fugit quaerat. Exercitationem illo quam autem. "
  )
);
