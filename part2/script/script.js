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
  periodAmount = document.querySelector(".period-amount"),
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
  inputSalaryAmount = document.querySelector(".salary-amount"),
  data = document.querySelector(".data"),
  numericInputs = document.querySelectorAll('input[placeholder="Сумма"]'),
  textInputs = document.querySelectorAll('input[placeholder="Наименование"]');

const AppData = function () {
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.income = {};
  this.addIncome = [];
  this.incomeMonth = 0;
  this.expenses = {};
  this.expensesMonth = 0;
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
};

AppData.prototype.startCheck = function () {
  if (inputSalaryAmount.value === "" || inputSalaryAmount.value === null) {
    btnSatrt.setAttribute("disabled", true);
    return;
  } else {
    btnSatrt.removeAttribute("disabled");
  }
};
AppData.prototype.start = function () {
  this.budget = +inputSalaryAmount.value;

  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();

  this.showResult();
};
AppData.prototype.showResult = function () {
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = Math.ceil(this.budgetDay);
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(", ");
  additionalIncomeValue.value = this.addIncome.join(", ");
  inputTargetMonthValue.value = Math.ceil(this.getTargetMonth());
  inputIncomePeriodValue.value = this.calcSavedMoney();
  rangePeriodSelect.addEventListener("input", () => {
    inputIncomePeriodValue.value = this.calcSavedMoney();
  });
};
AppData.prototype.addExpensesBlock = function () {
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  let cloneExpensesIteminputs = cloneExpensesItem.querySelectorAll("input");
  cloneExpensesIteminputs.forEach((item) => {
    item.value = "";
  });
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, addExpensesBtn);
  expensesItems = document.querySelectorAll(".expenses-items");
  numericInputs = document.querySelectorAll('input[placeholder="Сумма"]');
  textInputs = document.querySelectorAll('input[placeholder="Наименование"]');
  if (expensesItems.length === 3) {
    addExpensesBtn.style.display = "none";
  }
};
AppData.prototype.getExpenses = function () {
  expensesItems.forEach((item) => {
    let itemExpenses = item.querySelector(".expenses-title").value;
    let cashExpenses = item.querySelector(".expenses-amount").value;

    if (itemExpenses !== "" && cashExpenses !== "") {
      this.expenses[itemExpenses] = cashExpenses;
    }
  });
};
AppData.prototype.addIncomeBlock = function () {
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  let cloneIncomeIteminputs = cloneIncomeItem.querySelectorAll("input");
  cloneIncomeIteminputs.forEach((item) => {
    item.value = "";
  });
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, addIncomeBtn);
  incomeItems = document.querySelectorAll(".income-items");
  if (incomeItems.length === 3) {
    addIncomeBtn.style.display = "none";
  }
};
AppData.prototype.getIncome = function () {
  incomeItems.forEach((item) => {
    let itemIncome = item.querySelector(".income-title").value;
    let cashIncome = item.querySelector(".income-amount").value;

    if (itemIncome !== "" && cashIncome !== "") {
      this.income[itemIncome] = cashIncome;
    }
  });

  for (let key in this.income) {
    this.incomeMonth += +this.income[key];
  }
};
AppData.prototype.getAddExpenses = function () {
  let addExpenses = inputAdditionalExpensesItem.value.split(",");
  addExpenses.forEach((item) => {
    item = item.trim();
    if (item !== "") {
      this.addExpenses.push(item);
    }
  });
};
AppData.prototype.getAddIncome = function () {
  inputAdditionalIncomeItem.forEach((item) => {
    let itemValue = item.value.trim();
    if (itemValue !== "") {
      this.addIncome.push(itemValue);
    }
  });
};
AppData.prototype.periodChange = function () {
  periodAmount.innerHTML = rangePeriodSelect.value;
};
AppData.prototype.getExpensesMonth = function () {
  for (const prop in this.expenses) {
    this.expensesMonth += +this.expenses[prop];
  }
};
AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = this.budgetMonth / 30;
};
AppData.prototype.getTargetMonth = function () {
  return inputTargetAmount.value / this.budgetMonth;
};
AppData.prototype.calcSavedMoney = function () {
  return this.budgetMonth * rangePeriodSelect.value;
};
AppData.prototype.resetForm = function () {
  let calcForm = document.querySelector(".calc");
  let inputs = calcForm.querySelectorAll("input[type=text]");
  inputs.forEach((item) => {
    item.value = "";
  });

  rangePeriodSelect.value = 1;
  periodAmount.innerHTML = 1;

  let dataForm = document.querySelector(".data");
  let dataInputs = dataForm.querySelectorAll("input[type=text]");
  dataInputs.forEach((item) => {
    item.removeAttribute("disabled");
  });
  btnSatrt.style.display = "block";
  btnCancel.style.display = "none";

  for (let index = 1; index < incomeItems.length; index++) {
    incomeItems[0].parentNode.removeChild(incomeItems[index]);
  }
  addIncomeBtn.style.display = "block";
  for (let index = 1; index < expensesItems.length; index++) {
    expensesItems[0].parentNode.removeChild(expensesItems[index]);
  }
  addExpensesBtn.style.display = "block";

  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.income = {};
  this.addIncome = [];
  this.incomeMonth = 0;
  this.expenses = {};
  this.expensesMonth = 0;
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
};
AppData.prototype.eventsListeners = function () {
  document.addEventListener("DOMContentLoaded", this.startCheck);
  inputSalaryAmount.addEventListener("input", this.startCheck);
  btnSatrt.addEventListener("click", () => {
    let bindStart = this.start.bind(this);
    bindStart();
    this.start;

    let textItems = document.querySelectorAll("input[type=text]");
    textItems.forEach((item) => {
      item.setAttribute("disabled", true);
    });
    btnSatrt.style.display = "none";
    btnCancel.style.display = "block";
  });
  btnCancel.addEventListener("click", () => {
    let bindReset = this.resetForm.bind(this);
    bindReset();
    this.resetForm;
  });
  addExpensesBtn.addEventListener("click", this.addExpensesBlock);
  addIncomeBtn.addEventListener("click", this.addIncomeBlock);
  rangePeriodSelect.addEventListener("input", this.periodChange);
  data.addEventListener("click", () => {
    let numericInputs = document.querySelectorAll('input[placeholder="Сумма"]');
    let textInputs = document.querySelectorAll(
      'input[placeholder="Наименование"]'
    );
    textInputs.forEach((item) => {
      item.addEventListener("keyup", function () {
        //вешаем отслеживание события на все инпуты
        item.value = item.value.replace(/[^а-яА-ЯїЇєЄіІёЁ \W]/g, ""); // меняем значение инпута, если неправельный ввод
      });
    });

    numericInputs.forEach((item) => {
      item.addEventListener("keyup", function () {
        //вешаем отслеживание события на все инпуты
        item.value = item.value.replace(/[^\d]/g, ""); // меняем значение инпута, если неправельный ввод
      });
    });
  });
};

const appData = new AppData();
appData.eventsListeners();
