"use strict";

class Frist {
  hello() {
    console.log("Привет я метод родителя!");
  }
}

class Second extends Frist {
  hello() {
    super.hello();
    console.log("А я наследуемый метод!");
  }
}

const second = new Second();
second.hello();
