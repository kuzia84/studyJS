"use strict";
let arr = ["98754", "54645", "213545", "4687654", "465456", "24545", "89795"];
arr.forEach((number) => {
  if (number.charAt(0) === "2" || number.charAt(0) === "4") {
    console.log(number);
  }
});
let n = 100;
nextPrime: for (let i = 2; i < n; i++) {
  for (let j = 2; j < i; j++) {
    if (i % j == 0) {
      continue nextPrime;
    }
  }
  console.log(i, `Делители этого числа: 1 и ${i}`);
}
