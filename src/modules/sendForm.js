const sendForm = (formId) => {
  const errorMessage = "Что-то пошло не так!";
  const successMessage = "Спасибо, мы скоро с вами свяжемся!";
  const form = document.getElementById(formId);
  const statusMessage = document.createElement("div");
  const loadMessage = `
      <div class="sk-wave">
        <div class="sk-rect sk-rect-1"></div>
        <div class="sk-rect sk-rect-2"></div>
        <div class="sk-rect sk-rect-3"></div>
        <div class="sk-rect sk-rect-4"></div>
        <div class="sk-rect sk-rect-5"></div>
      </div>
    `;
  statusMessage.style.cssText = "font-size: 2rem;";

  form.addEventListener("input", (event) => {
    const target = event.target;

    if (target.matches(".form-name")) {
      target.value = target.value.replace(/[^а-я ]/gi, "");
    }
    if (target.matches(".mess")) {
      target.value = target.value.replace(/[^а-я \-\.\!\?\;\:]/gi, "");
    }

    if (target.matches(".form-phone")) {
      if (target.value.match(/^\+?\d+$/gi)) {
        target.style.backgroundColor = "green";
      } else {
        target.style.backgroundColor = "red";
      }
    }
  });

  const postData = (body) =>
    fetch("./server.php", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.insertAdjacentElement("afterend", statusMessage);
    statusMessage.innerHTML = loadMessage;
    const formData = new FormData(form),
      body = {};
    formData.forEach((val, key) => {
      body[key] = val;
    });
    postData(body)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Network stattun not 200");
        }
        statusMessage.textContent = successMessage;
      })
      .catch((error) => {
        statusMessage.textContent = errorMessage;
        console.error(error);
      });
    document.getElementById(formId).reset();
    form.querySelector(".form-phone").style.backgroundColor = "";
    setTimeout(() => {
      statusMessage.innerHTML = "";
    }, 8000);
  });
};

export default sendForm;
