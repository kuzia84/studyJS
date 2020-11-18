const calcValidation = () => {
  const calcBlock = document.querySelector(".calc-block");
  calcBlock.addEventListener("input", (event) => {
    const target = event.target;

    if (target.matches("input")) {
      target.value = target.value.replace(/\D/g, "");
    }
  });
};

export default calcValidation;
