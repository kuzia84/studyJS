"use strict";
const animateObj = document.querySelector(".animate"),
  startAnimation = document.querySelector(".startAnimation");
let counter = 0,
  animationInterval,
  animate = false;
const animateMe = function () {
  animationInterval = requestAnimationFrame(animateMe);

  if (counter <= 50) {
    counter++;
    animateObj.style.borderRadius = counter + "%";
  } else {
    counter = 0;
    animateObj.style.borderRadius = counter + "%";
  }
};

startAnimation.addEventListener("click", () => {
  if (!animate) {
    animationInterval = requestAnimationFrame(animateMe);
    animate = true;
  } else {
    animate = false;
    cancelAnimationFrame(animationInterval);
  }
});
