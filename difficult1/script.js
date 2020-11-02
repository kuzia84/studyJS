"use strict";
function debounce(f, t) {
  return function () {
    const previousCall = f.lastCall;
    f.lastCall = Date.now();
    if (previousCall && f.lastCall - previousCall <= t) {
      clearTimeout(f.lastCallTimer);
    }
    f.lastCallTimer = setTimeout(() => f(), t);
  };
}
const input = document.querySelector(".input"),
  text = document.querySelector(".text");

function inputText() {
  text.textContent = input.value;
}
const debounceInput = debounce(inputText, 300);
input.addEventListener("input", debounceInput);
