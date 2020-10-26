"use strict";

const wrapper = document.querySelector(".wrapper"),
  color = document.querySelector("#color"),
  change = document.querySelector("#change");

const randomColor = function () {
  let number1 = parseInt(Math.random() * 256);
  let number2 = parseInt(Math.random() * 256);
  let number3 = parseInt(Math.random() * 256);

  function decimalToHexString(number) {
    return number.toString(16).toUpperCase();
  }

  let colorCode =
    decimalToHexString(number1) +
    decimalToHexString(number2) +
    decimalToHexString(number3);

  wrapper.style.background = `#${colorCode}`;
  color.innerHTML = `#${colorCode}`;
  change.style.color = `#${colorCode}`;
};

change.addEventListener("click", randomColor);
