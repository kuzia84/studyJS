"use strict";

function DomElement(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
}

DomElement.prototype.createElement = function () {
  let newElement, elementType;
  elementType = this.selector.charAt(0);

  if (elementType === ".") {
    newElement = document.createElement("div");
    newElement.classList.add(this.selector.slice(1));
    newElement.innerText = `div${this.selector}`;
  } else if (elementType === "#") {
    newElement = document.createElement("p");
    newElement.setAttribute("id", this.selector.slice(1));
    newElement.innerText = `p${this.selector}`;
  } else {
    alert("Ошибка!");
    return;
  }

  newElement.setAttribute(
    "style",
    `height: ${this.height}px; width: ${this.width}px; background: ${this.bg}; font-size: ${this.fontSize}px; position: absolute; left:0px; top:0px;`
  );

  document.body.insertAdjacentElement("afterbegin", newElement);
};

let el1 = new DomElement(".square", 100, 100, "red", 20);

document.addEventListener("DOMContentLoaded", () => {
  el1.createElement();
  let el = document.querySelector(".square"),
    n = 10,
    y = 0,
    x = 0;

  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        --y;
        el.style.top = n * y + "px";
        break;
      case "ArrowDown":
        ++y;
        el.style.top = n * y + "px";
        break;
      case "ArrowRight":
        ++x;
        el.style.left = n * x + "px";
        break;
      case "ArrowLeft":
        --x;
        el.style.left = n * x + "px";
        break;
      default:
        return;
    }
  });
  // el.style.left = "10px";
});
