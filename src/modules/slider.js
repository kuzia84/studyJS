const slider = () => {
  const slider = document.querySelector(".portfolio-content"),
    slide = document.querySelectorAll(".portfolio-item"),
    portfolioDots = document.querySelector(".portfolio-dots");

  let currentSlide = 0,
    interval;

  // функция создает точки для каждого слайда
  const addDots = () => {
    for (let i = 0; i < slide.length; i++) {
      const dotElement = document.createElement("li");
      dotElement.classList.add("dot");
      portfolioDots.insertAdjacentElement("beforeend", dotElement);
    }
  };
  addDots();

  const dot = document.querySelectorAll(".dot");
  dot[0].classList.add("dot-active"); //добавляем первой точке класс активной точки

  const prevSlide = (element, index, strClass) => {
    element[index].classList.remove(strClass);
  };
  const nextSlide = (element, index, strClass) => {
    element[index].classList.add(strClass);
  };
  const autoplaySlide = () => {
    prevSlide(slide, currentSlide, "portfolio-item-active");
    prevSlide(dot, currentSlide, "dot-active");
    currentSlide++;

    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }

    nextSlide(slide, currentSlide, "portfolio-item-active");
    nextSlide(dot, currentSlide, "dot-active");
  };
  const startSlide = (time = 2000) => {
    interval = setInterval(autoplaySlide, time);
  };
  const stopSlide = () => {
    clearInterval(interval);
  };
  slider.addEventListener("click", (event) => {
    event.preventDefault();
    const target = event.target;

    if (!target.matches(".portfolio-btn, .dot")) {
      return;
    }

    prevSlide(slide, currentSlide, "portfolio-item-active");
    prevSlide(dot, currentSlide, "dot-active");

    if (target.matches("#arrow-right")) {
      currentSlide++;
    } else if (target.matches("#arrow-left")) {
      currentSlide--;
    } else if (target.matches(".dot")) {
      dot.forEach((element, index) => {
        if (element === target) {
          currentSlide = index;
        }
      });
    }

    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }

    if (currentSlide < 0) {
      currentSlide = slide.length - 1;
    }

    nextSlide(slide, currentSlide, "portfolio-item-active");
    nextSlide(dot, currentSlide, "dot-active");
  });

  slider.addEventListener("mouseover", (event) => {
    if (
      event.target.matches(".portfolio-btn") ||
      event.target.matches(".dot")
    ) {
      stopSlide();
    }
  });
  slider.addEventListener("mouseout", (event) => {
    if (
      event.target.matches(".portfolio-btn") ||
      event.target.matches(".dot")
    ) {
      startSlide();
    }
  });
  startSlide(2000);
};

export default slider;
