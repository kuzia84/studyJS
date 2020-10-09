let num = 266219;
console.log("num: ", num);
let sNum = String(num);
console.log("sNum: ", sNum);
let arrNum = sNum.split("");
console.log("arrNum: ", arrNum);
let result = arrNum.reduce((sum, crurrent) => sum * crurrent);
console.log("result: ", result);
let powResult = result ** 3;
console.log("powResult: ", powResult);
const resultText = document.getElementById("result");
resultText.insertAdjacentHTML(
  "beforeend",
  ` ${String(powResult)[0]}${String(powResult)[1]}`
);
