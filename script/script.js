"use strict";

const btnSatrt = document.getElementById("start"),
  addIncomeBtn = document.querySelector(".income button"),
  addExpensesBtn = document.querySelector(".expenses button"),
  depositCheck = document.querySelector("#deposit-check"),
  inputAdditionalIncomeItem = document.querySelectorAll(
    ".additional_income-item"
  ),
  inputBudgetMonthValue = document.getElementsByClassName("budget_month-value"),
  inputBudgetDayValue = document.getElementsByClassName("budget_day-value"),
  inputExpensesMonthValue = document.getElementsByClassName(
    "expenses_month-value"
  ),
  inputAdditionalIncomeValue = document.getElementsByClassName(
    "additional_income-value"
  ),
  inputAdditionalExpensesValue = document.getElementsByClassName(
    "additional_expenses-value"
  ),
  inputIncomePeriodValue = document.getElementsByClassName(
    "income_period-value"
  ),
  inputTargetMonthValue = document.getElementsByClassName("target_month-value"),
  btnCancel = document.querySelector("#cancel"),
  inputPeriodSelect = document.querySelector(".period-select"),
  inputTargetAmount = document.querySelector(".target-amount"),
  inputDepositAmount = document.querySelector(".deposit-amount"),
  inputDepositPercent = document.querySelector(".deposit-percent"),
  selectDepositBank = document.querySelector(".deposit-bank"),
  inputAdditionalExpensesItem = document.querySelector(
    ".additional_expenses-item"
  ),
  inputExpensesTitle = document.querySelector(".expenses-title"),
  inputExpensesAmount = document.querySelector(".expenses-amount"),
  inputIncomeTitle = document.querySelector(".income-title"),
  inputIncomeAmount = document.querySelector(".income-amount"),
  inputSalaryAmount = document.querySelector(".salary-amount");

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

// let textValidation = function (text) {
//   if (isNaN(text) || text === "" || text === null) {
//     return false;
//   }
// };

let money,
  start = function () {
    do {
      money = prompt("Ваш месячный доход?", 50000);
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
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  period: 3,
  asking: function () {
    if (confirm("Есть ли у вас дополнительный зароботок?")) {
      let itemIncome, cashIncome;
      do {
        itemIncome = prompt("Какой у вас дополнительный зароботок?", "Таксую");
      } while (
        itemIncome === null ||
        itemIncome.trim() === "" ||
        parseFloat(itemIncome)
      );
      do {
        cashIncome = prompt("Сколько в месяц вы на этом зарабатываете?", 10000);
      } while (!isNumber(cashIncome));
      appData.income[itemIncome] = cashIncome;
    }
    let addExpenses;
    do {
      addExpenses = prompt(
        "Перечислите возможные расходы за рассчитываемый период через запятую",
        "квартплата, проездной, кредит"
      );
    } while (
      addExpenses === null ||
      addExpenses.trim() === "" ||
      parseFloat(addExpenses)
    );
    appData.addExpenses = addExpenses
      .split(", ")
      .map(
        (word) =>
          `${word.charAt(0).toUpperCase()}${word.slice(1).toLocaleLowerCase()}`
      )
      .join(", ");
    let expensName, expensCost;
    for (let i = 0; i < 2; i++) {
      do {
        expensName = prompt(`Введите обязательную статью расходов ${i + 1}?`);
      } while (
        expensName === null ||
        expensName.trim() === "" ||
        parseFloat(expensName)
      );
      do {
        expensCost = prompt("Во сколько это обойдется?");
      } while (!isNumber(expensCost));
      appData.expenses[expensName] = expensCost;
    }
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
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt("Какой годовой процент", 10);
      } while (!isNumber(appData.percentDeposit));
      do {
        appData.moneyDeposit = prompt("Какая сумма заложена", 10000);
      } while (!isNumber(appData.moneyDeposit));
    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  },
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getInfoDeposit();

console.log("Расходы за месяц:", appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
console.log("Возможные расходы", appData.addExpenses);
// console.log("Наша программа включает в себя данные:");
// for (const prop in appData) {
//   console.log(prop, appData[prop]);
// }
