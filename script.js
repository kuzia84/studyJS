"use strict";
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
  income = "фриланс",
  addExpenses = prompt(
    "Перечислите возможные расходы за рассчитываемый период через запятую",
    "Квартплата, проездной, кредит"
  ),
  deposit = confirm("Есть ли у вас депозит в банке?"),
  expenses = [],
  mission = 1200000,
  period = 6;

let start = function () {
  do {
    money = prompt("Ваш месячный доход?");
  } while (!isNumber(money));
};

start();

let showTupeOf = function (data) {
  console.log(data, typeof data);
};

let getExpensesMonth = function () {
  let sum = 0,
    cost = 0;

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt(`Введите обязательную статью расходов ${i}?`);
    do {
      cost = prompt("Во сколько это обойдется?");
    } while (!isNumber(cost));
    sum += +cost;
  }
  console.log(expenses);
  return sum;
};

let expensesAmount = getExpensesMonth();

let getAccumulatedMonth = function () {
  return money - expensesAmount;
};
let accumulatedMonth = getAccumulatedMonth();
let getTargetMonth = function () {
  let month = Math.ceil(mission / accumulatedMonth);
  if (month <= 0) {
    return "Цель не будет достигнута";
  }
  return `Цель будет достигнеута за ${month} месяцев`;
};
let budgetDay = Math.floor(accumulatedMonth / 30);

showTupeOf(money);
showTupeOf(income);
showTupeOf(deposit);

console.log("Обязательные расходы за месяц:", expensesAmount);
console.log("Расходы:", addExpenses);
console.log(`Цель заработать ${mission} рублей/долларов/гривен/юани`);
console.log(getTargetMonth());
console.log("Бюджет на день: ", budgetDay);
console.log("Бюджет на месяц: ", accumulatedMonth);

let getStatusIncome = function () {
  if (budgetDay >= 1200) {
    return "У вас высокий уровень дохода";
  } else if (budgetDay >= 600 && budgetDay < 1200) {
    return "У вас средний уровень дохода";
  } else if (budgetDay >= 0 && budgetDay < 600) {
    return "К сожалению у вас уровень дохода ниже среднего";
  } else if (budgetDay < 0) {
    return "Что то пошло не так";
  }
};
console.log(getStatusIncome());
