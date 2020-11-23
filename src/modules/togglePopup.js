const togglePopup = () => {
  const popup = document.querySelector(".popup"),
    popupContent = popup.querySelector(".popup-content"),
    popupBtns = document.querySelectorAll(".popup-btn");

  const animatePopup = () => {
    popupContent.style.opacity = 0;
    const animationStart = Date.now();
    const animationTimer = setInterval(() => {
      const timePassed = Date.now() - animationStart;

      if (timePassed > 500) {
        clearInterval(animationTimer);
        return;
      }

      draw(timePassed);

      function draw(timePassed) {
        popupContent.style.opacity = timePassed * 0.002;
      }
    }, 20);
  };

  popupBtns.forEach((item) =>
    item.addEventListener("click", () => {
      popup.style.display = "block";
      if (document.body.clientWidth > 768) {
        animatePopup();
      }
    })
  );

  popup.addEventListener("click", (event) => {
    let target = event.target;

    if (target.classList.contains("popup-close")) {
      popup.style.display = "none";
    } else {
      target = target.closest(".popup-content");

      if (!target) {
        popup.style.display = "none";
      }
    }
  });
};

export default togglePopup;
