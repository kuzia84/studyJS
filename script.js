"use strict";

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
  start = function () {
    do {
      money = prompt("Ваш месячный доход?");
    } while (!isNumber(money));
  };

start();

let appData = {
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  expensesMonth: 0,
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 3,
  asking: function () {
    let addExpenses = prompt(
      "Перечислите возможные расходы за рассчитываемый период через запятую",
      "Квартплата, проездной, кредит"
    );
    let expensName, expensCost;
    for (let i = 0; i < 2; i++) {
      expensName = prompt(`Введите обязательную статью расходов ${i + 1}?`);
      do {
        expensCost = prompt("Во сколько это обойдется?");
      } while (!isNumber(expensCost));
      appData.expenses[expensName] = expensCost;
    }
    appData.addExpenses = addExpenses.toLowerCase().split(",");
    appData.deposit = confirm("Есть ли у вас депозит в банке?");
  },
  getExpensesMonth: function () {
    for (const prop in appData.expenses) {
      appData.expensesMonth += +appData.expenses[prop];
    }
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },
  getTargetMonth: function () {
    let month = Math.ceil(appData.mission / appData.budgetDay);
    if (month <= 0) {
      return "Цель не будет достигнута";
    }
    return `Цель будет достигнеута за ${month} месяцев`;
  },
  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      return "У вас высокий уровень дохода";
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
      return "У вас средний уровень дохода";
    } else if (appData.budgetDay >= 0 && appData.budgetDay < 600) {
      return "К сожалению у вас уровень дохода ниже среднего";
    } else if (appData.budgetDay < 0) {
      return "Что то пошло не так";
    }
  },
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log("Расходы за месяц:", appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
console.log("Наша программа включает в себя данные:");
for (const prop in appData) {
  console.log(prop, appData[prop]);
}
