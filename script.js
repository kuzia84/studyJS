"use strict";
let money = +prompt("Ваш месячный доход?", 50000);
let income = "фриланс";
let addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую",
  "Квартплата, проездной, кредит"
);
let deposit = confirm("Есть ли у вас депозит в банке?");
let expenses1 = prompt("Введите обязательную статью расходов1?", "Еда");
let amount1 = +prompt("Во сколько это обойдется?", "1500");
let expenses2 = prompt("Введите обязательную статью расходов2?", "Налоги");
let amount2 = +prompt("Во сколько это обойдется?", "1000");
let mission = 1200000;
let period = 6;
let showTupeOf = function (data) {
  console.log(data, typeof data);
};
let getExpensesMonth = function () {
  return amount1 + amount2;
};
let getAccumulatedMonth = function () {
  return money - amount1 - amount2;
};
let accumulatedMonth = getAccumulatedMonth();
let getTargetMonth = function () {
  return Math.ceil(mission / accumulatedMonth);
};
let budgetDay = Math.floor(accumulatedMonth / 30);

showTupeOf(money);
showTupeOf(income);
showTupeOf(deposit);

console.log("Обязательные расходы за месяц:", getExpensesMonth());
console.log("Расходы:", addExpenses);
console.log(`Цель заработать ${mission} рублей/долларов/гривен/юани`);
console.log(`Цель будет достигнеута за ${getTargetMonth()} месяцев`);
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
