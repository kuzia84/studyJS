"use strict";
let money = +prompt("Ваш месячный доход?");
let income = "фриланс";
let addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую"
);
let deposit = confirm("Есть ли у вас депозит в банке?");
let expenses1 = prompt("Введите обязательную статью расходов1?");
let amount1 = +prompt("Во сколько это обойдется?");
let expenses2 = prompt("Введите обязательную статью расходов2?");
let amount2 = +prompt("Во сколько это обойдется?");
let budgetMonth = money - amount1 - amount2;
let mission = 1200000;
let periodToMission = Math.ceil(mission / budgetMonth);
let period = 6;
let budgetDay = Math.floor(budgetMonth / 30);

console.log("money: ", typeof money);
console.log("income: ", typeof income);
console.log("deposit: ", typeof deposit);
console.log("addExpenses: ", addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей/долларов/гривен/юани`);
console.log(addExpenses.toLowerCase().split(", "));
console.log("Бюджет на месяц: ", budgetMonth);
console.log(`Цель будет достигнеута за ${periodToMission} месяцев`);
console.log("Бюджет на день: ", budgetDay);

if (budgetDay >= 1200) {
  console.log("У вас высокий уровень дохода");
} else if (budgetDay >= 600 && budgetDay < 1200) {
  console.log("У вас средний уровень дохода");
} else if (budgetDay >= 0 && budgetDay < 600) {
  console.log("К сожалению у вас уровень дохода ниже среднего");
} else if (budgetDay < 0) {
  console.log("Что то пошло не так");
}
