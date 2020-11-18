const calc = (price = 100) => {
  const calcBlock = document.querySelector(".calc-block"),
    calcType = document.querySelector(".calc-type"),
    calcSquare = document.querySelector(".calc-square"),
    calcCount = document.querySelector(".calc-count"),
    calcDay = document.querySelector(".calc-day"),
    totalValue = document.getElementById("total");

  const animateValue = (total) => {
    let count = 0;
    const animate = setInterval(() => {
      count += 10;
      totalValue.textContent = count;
      if (count >= total) {
        clearInterval(animate);
        totalValue.textContent = total;
      }
    }, 0);
    clearInterval(animate - 1);
  };

  const countSum = () => {
    let total = 0,
      countValue = 1,
      dayValue = 1;

    if (calcCount.value > 1) {
      countValue += (calcCount.value - 1) / 10;
    }

    if (calcDay.value && calcDay.value < 5) {
      dayValue *= 2;
    } else if (calcDay.value && calcDay.value < 10) {
      dayValue *= 1.5;
    }

    const typeValue = calcType.options[calcType.selectedIndex].value,
      squareValue = +calcSquare.value;

    if (typeValue && squareValue) {
      total = Math.ceil(
        price * typeValue * squareValue * countValue * dayValue
      );
      animateValue(total);
    }
  };

  calcBlock.addEventListener("change", (event) => {
    const target = event.target;

    if (target.matches("input") || target.matches("select")) {
      countSum();
    }
  });
};

export default calc;
