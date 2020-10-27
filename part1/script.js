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

  newElement.style.cssText = `height: ${this.height}px; width: ${this.width}px; background: ${this.bg}; font-size: ${this.fontSize}px`;

  document.body.insertAdjacentElement("afterbegin", newElement);
};

let el1 = new DomElement("#row", 30, 300, "red", 20);
el1.createElement();
let el2 = new DomElement(".col", 30, 300, "green", 20);
el2.createElement();
