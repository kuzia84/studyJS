"use strict";

const btnSatrt = document.getElementById("start"),
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
  depositAmount = document.querySelector(".deposit-amount"),
  depositPercent = document.querySelector(".deposit-percent"),
  depositBank = document.querySelector(".deposit-bank"),
  inputAdditionalExpensesItem = document.querySelector(
    ".additional_expenses-item"
  ),
  inputIncomeTitle = document.querySelector(".income-title"),
  inputSalaryAmount = document.querySelector(".salary-amount"),
  data = document.querySelector(".data");

let expensesItems = document.querySelectorAll(".expenses-items"),
  incomeItems = document.querySelectorAll(".income-items"),
  numericInputs = document.querySelectorAll('input[placeholder="Сумма"]'),
  textInputs = document.querySelectorAll('input[placeholder="Наименование"]');

class AppData {
  constructor() {
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
  }

  startCheck() {
    if (inputSalaryAmount.value === "" || inputSalaryAmount.value === null) {
      btnSatrt.setAttribute("disabled", true);
      return;
    } else {
      btnSatrt.removeAttribute("disabled");
    }
  }
  start() {
    this.budget = +inputSalaryAmount.value;

    this.getExpInc();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();
    this.getBudget();

    this.showResult();
  }
  showResult() {
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
  }
  addExpensesBlock() {
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
  }
  addIncomeBlock() {
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
  }
  getExpInc() {
    const count = (item) => {
      const startStr = item.className.split("-")[0],
        itemTitle = item.querySelector(`.${startStr}-title`).value,
        itemName = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle !== "" && itemName !== "") {
        this[startStr][itemTitle] = itemName;
      }
    };
    expensesItems.forEach(count);
    incomeItems.forEach(count);

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }
  getAddExpenses() {
    let addExpenses = inputAdditionalExpensesItem.value.split(",");
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== "") {
        this.addExpenses.push(item);
      }
    });
  }
  getAddIncome() {
    inputAdditionalIncomeItem.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        this.addIncome.push(itemValue);
      }
    });
  }
  periodChange() {
    periodAmount.innerHTML = rangePeriodSelect.value;
  }
  getExpensesMonth() {
    for (const prop in this.expenses) {
      this.expensesMonth += +this.expenses[prop];
    }
  }
  getBudget() {
    const monthDeposit = this.moneyDeposit * this.percentDeposit;
    this.budgetMonth =
      this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = this.budgetMonth / 30;
  }
  getTargetMonth() {
    return inputTargetAmount.value / this.budgetMonth;
  }
  calcSavedMoney() {
    return this.budgetMonth * rangePeriodSelect.value;
  }
  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }
  changePersent() {
    const valueSelect = this.value;
    if (valueSelect === "other") {
      depositPercent.style.display = "inline-block";
      depositPercent.removeAttribute("disabled");
      depositPercent.value = "";
    } else {
      depositPercent.style.display = "none";
      depositPercent.setAttribute("disabled", true);
      depositPercent.value = valueSelect;
    }
  }
  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = "inline-block";
      depositAmount.style.display = "inline-block";
      this.deposit = true;
      depositBank.addEventListener("change", this.changePersent);
    } else {
      depositBank.style.display = "none";
      depositAmount.style.display = "none";
      depositBank.value = "";
      depositAmount.value = "";
      this.deposit = false;
      depositBank.removeEventListener("change", this.changePersent);
    }
  }
  resetForm() {
    expensesItems = document.querySelectorAll(".expenses-items");
    numericInputs = document.querySelectorAll('input[placeholder="Сумма"]');
    textInputs = document.querySelectorAll('input[placeholder="Наименование"]');
    incomeItems = document.querySelectorAll(".income-items");

    const calcForm = document.querySelector(".calc"),
      inputs = calcForm.querySelectorAll("input[type=text]");
    inputs.forEach((item) => {
      item.value = "";
    });

    rangePeriodSelect.value = 1;
    periodAmount.innerHTML = 1;

    const dataForm = document.querySelector(".data"),
      dataInputs = dataForm.querySelectorAll("input[type=text]");
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

    depositBank.style.display = "none";
    depositAmount.style.display = "none";
    depositBank.value = "";
    depositAmount.value = "";
    this.deposit = false;
    depositBank.removeEventListener("change", this.changePersent);
    depositPercent.style.display = "none";
    depositPercent.setAttribute("disabled", true);
    depositCheck.checked = false;
    depositBank.removeAttribute("disabled");
    depositCheck.removeAttribute("disabled");

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
    this.startCheck();
  }
  eventsListeners() {
    document.addEventListener("DOMContentLoaded", this.startCheck);
    inputSalaryAmount.addEventListener("input", this.startCheck);
    btnSatrt.addEventListener("click", () => {
      if (depositCheck.checked) {
        if (
          !parseFloat(depositPercent.value) ||
          depositPercent.value > 100 ||
          depositPercent.value <= 0
        ) {
          alert("Введите число от 1 до 100");
          return;
        } else {
          depositPercent.value = depositPercent.value / 100;
        }
      }
      const bindStart = this.start.bind(this);
      bindStart();
      this.start;

      const textItems = document.querySelectorAll("input[type=text]");
      textItems.forEach((item) => {
        item.setAttribute("disabled", true);
      });
      depositBank.setAttribute("disabled", true);
      depositCheck.setAttribute("disabled", true);
      btnSatrt.style.display = "none";
      btnCancel.style.display = "block";
    });
    btnCancel.addEventListener("click", () => {
      const bindReset = this.resetForm.bind(this);
      bindReset();
      this.resetForm;
    });
    addExpensesBtn.addEventListener("click", this.addExpensesBlock);
    addIncomeBtn.addEventListener("click", this.addIncomeBlock);
    rangePeriodSelect.addEventListener("input", this.periodChange);
    data.addEventListener("click", () => {
      numericInputs = document.querySelectorAll('input[placeholder="Сумма"]');
      textInputs = document.querySelectorAll(
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
    depositCheck.addEventListener("change", this.depositHandler.bind(this));
  }
}

const appData = new AppData();
appData.eventsListeners();
