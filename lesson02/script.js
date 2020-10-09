let money = 4000;
let income = 2000;
let addExpenses = "Еда, Налоги, Здоровье, Развлечения, Машина";
let deposit = true;
let mission = 12000;
let period = 6;
let budgetDay = (money + income) / 30;

console.log("money: ", typeof money);
console.log("income: ", typeof income);
console.log("deposit: ", typeof deposit);
console.log("addExpenses: ", addExpenses.length);
console.log(
  `“Период равен ${period} месяцев” и “Цель заработать ${mission} рублей/долларов/гривен/юани”`
);
console.log(addExpenses.toLowerCase().split(", "));
console.log("budgetDay: ", budgetDay);
