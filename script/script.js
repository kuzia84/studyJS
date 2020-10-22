"use strict";

let btnSatrt = document.getElementById("start"),
  addIncomeBtn = document.querySelector(".income button"),
  addExpensesBtn = document.querySelector(".expenses button"),
  depositCheck = document.querySelector("#deposit-check"),
  inputAdditionalIncomeItem = document.querySelectorAll(
    ".additional_income-item"
  ),
  budgetMonthValue = document.getElementsByClassName("budget_month-value")[0],
  budgetDayValue = document.getElementsByClassName("budget_day-value")[0],
  expensesMonthValue = document.getElementsByClassName(
    "expenses_month-value"
  )[0],
  additionalIncomeValue = document.getElementsByClassName(
    "additional_income-value"
  )[0],
  additionalExpensesValue = document.getElementsByClassName(
    "additional_expenses-value"
  )[0],
  inputIncomePeriodValue = document.getElementsByClassName(
    "income_period-value"
  )[0],
  inputTargetMonthValue = document.getElementsByClassName(
    "target_month-value"
  )[0],
  btnCancel = document.querySelector("#cancel"),
  rangePeriodSelect = document.querySelector(".period-select"),
  inputTargetAmount = document.querySelector(".target-amount"),
  inputDepositAmount = document.querySelector(".deposit-amount"),
  inputDepositPercent = document.querySelector(".deposit-percent"),
  selectDepositBank = document.querySelector(".deposit-bank"),
  inputAdditionalExpensesItem = document.querySelector(
    ".additional_expenses-item"
  ),
  expensesItems = document.querySelectorAll(".expenses-items"),
  inputIncomeTitle = document.querySelector(".income-title"),
  incomeItems = document.querySelectorAll(".income-items"),
  inputSalaryAmount = document.querySelector(".salary-amount");

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  addIncome: [],
  incomeMonth: 0,
  expenses: {},
  expensesMonth: 0,
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  period: 3,
  startCheck: function () {
    if (inputSalaryAmount.value === "" || inputSalaryAmount.value === null) {
      btnSatrt.setAttribute("disabled", "disabled");
      return;
    } else {
      btnSatrt.removeAttribute("disabled", "disabled");
    }
  },
  start: function () {
    appData.budget = +inputSalaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    // appData.getInfoDeposit();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    appData.showResult();
  },
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = Math.ceil(appData.budgetDay);
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(", ");
    additionalIncomeValue.value = appData.addIncome.join(", ");
    inputTargetMonthValue.value = Math.ceil(appData.getTargetMonth());
    inputIncomePeriodValue.value = appData.calcSavedMoney();
    rangePeriodSelect.addEventListener("input", () => {
      inputIncomePeriodValue.value = appData.calcSavedMoney();
    });
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, addExpensesBtn);
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 3) {
      addExpensesBtn.style.display = "none";
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector(".expenses-title").value;
      let cashExpenses = item.querySelector(".expenses-amount").value;

      if (itemExpenses !== "" && cashExpenses !== "") {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, addIncomeBtn);
    incomeItems = document.querySelectorAll(".income-items");
    if (incomeItems.length === 3) {
      addIncomeBtn.style.display = "none";
    }
  },
  getIncome: function () {
    incomeItems.forEach((item) => {
      let itemIncome = item.querySelector(".income-title").value;
      let cashIncome = item.querySelector(".income-amount").value;

      if (itemIncome !== "" && cashIncome !== "") {
        appData.income[itemIncome] = cashIncome;
      }
    });
    // if (confirm("Есть ли у вас дополнительный зароботок?")) {
    //   let itemIncome, cashIncome;
    //   do {
    //     itemIncome = prompt("Какой у вас дополнительный зароботок?", "Таксую");
    //   } while (
    //     itemIncome === null ||
    //     itemIncome.trim() === "" ||
    //     parseFloat(itemIncome)
    //   );
    //   do {
    //     cashIncome = prompt("Сколько в месяц вы на этом зарабатываете?", 10000);
    //   } while (!isNumber(cashIncome));
    //   appData.income[itemIncome] = cashIncome;
    // }

    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },
  getAddExpenses: function () {
    let addExpenses = inputAdditionalExpensesItem.value.split(",");
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== "") {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    inputAdditionalIncomeItem.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        appData.addIncome.push(itemValue);
      }
    });
  },
  periodChange: function () {
    let periodAmount = document.querySelector(".period-amount");
    periodAmount.innerHTML = rangePeriodSelect.value;
  },
  asking: function () {
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

    appData.deposit = confirm("Есть ли у вас депозит в банке?");
  },
  getExpensesMonth: function () {
    for (const prop in appData.expenses) {
      appData.expensesMonth += +appData.expenses[prop];
    }
  },
  getBudget: function () {
    appData.budgetMonth =
      appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },
  getTargetMonth: function () {
    return inputTargetAmount.value / appData.budgetMonth;
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
    return appData.budgetMonth * rangePeriodSelect.value;
  },
};

document.addEventListener("DOMContentLoaded", appData.startCheck);
inputSalaryAmount.addEventListener("input", appData.startCheck);
start.addEventListener("click", appData.start);
addExpensesBtn.addEventListener("click", appData.addExpensesBlock);
addIncomeBtn.addEventListener("click", appData.addIncomeBlock);
rangePeriodSelect.addEventListener("input", appData.periodChange);

// console.log("Расходы за месяц:", appData.expensesMonth);
// console.log(appData.getTargetMonth());
// console.log(appData.getStatusIncome());
// console.log("Возможные расходы", appData.addExpenses);
// console.log("Наша программа включает в себя данные:");
// for (const prop in appData) {
//   console.log(prop, appData[prop]);
// }
