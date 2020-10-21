"use strict";
let books = document.querySelector(".books"),
  book = document.querySelectorAll(".book"),
  header = book[4].getElementsByTagName("a"),
  adv = document.querySelector(".adv"),
  li2 = book[0].getElementsByTagName("li"),
  li5 = book[5].getElementsByTagName("li"),
  ul = book[2].getElementsByTagName("ul"),
  li6 = ul[0].getElementsByTagName("li");

books.prepend(book[1]);
books.append(book[2]);
book[4].after(book[3]);

document.body.setAttribute(
  "style",
  "background-image: url(./image/you-dont-know-js.jpg)"
);

header[0].innerText = "Книга 3. this и Прототипы Объектов";

adv.remove();

li2[9].after(li2[2]);
li2[7].after(li2[6]);
li2[2].after(li2[5]);
li2[3].after(li2[6]);

li5[1].after(li5[9]);
li5[2].after(li5[4]);
li5[3].after(li5[5]);
li5[8].after(li5[6]);

ul[0].insertAdjacentHTML("beforeend", "<li>Глава 8: За пределами ES6</li>");
ul[0].append(li6[9]);
