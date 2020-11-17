//https://api.exchangeratesapi.io/latest?base=RUB
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const currency = document.getElementById("currency"),
    form1 = document.getElementById("form1"),
    form2 = document.getElementById("form2"),
    label1 = document.getElementById("label1"),
    currency1 = document.getElementById("currency1"),
    currency2 = document.getElementById("currency2"),
    reverseLabel2 = document.getElementById("reverse-label2"),
    reverseCurrency1 = document.getElementById("reverse-currency1"),
    reverseCurrency2 = document.getElementById("reverse-currency2");
  let rates;

  const getData = () => {
    fetch("https://api.exchangeratesapi.io/latest?base=RUB")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Network status not 200");
        }
        return response.json();
      })
      .then((response) => {
        rates = response.rates;
        return rates;
      });
  };
  getData();

  const fillForm = (value) => {
    if (value === "USD") {
      label1.textContent = "Доллар США (USD)";
      reverseLabel2.textContent = "Доллар США (USD)";
    } else if (value === "EUR") {
      label1.textContent = "Евро (EUR)";
      reverseLabel2.textContent = "Евро (EUR)";
    } else {
      label1.textContent = "Выберите валюту";
      reverseLabel2.textContent = "Выберите валюту";
    }
  };
  currency.addEventListener("change", () => fillForm(currency.value));

  const calculate = (curr) => {
    if (curr) {
      const rate = rates[curr];
      const result = currency1.value / rate;
      currency2.value = result.toFixed(2);
    } else {
      alert("Выберите валюту!");
    }
  };
  form1.addEventListener("submit", (event) => {
    event.preventDefault();
    calculate(currency.value);
  });

  const reverseCalculate = (curr) => {
    if (curr) {
      const rate = rates[curr];
      const result = reverseCurrency1.value * rate;
      reverseCurrency2.value = result.toFixed(2);
    }
  };
  form2.addEventListener("submit", (event) => {
    event.preventDefault();
    reverseCalculate(currency.value);
  });
});
