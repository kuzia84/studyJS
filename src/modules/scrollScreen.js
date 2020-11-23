const scrollScreen = () => {
  const scrollLinks = document.querySelectorAll(".scroll-link");

  scrollLinks.forEach((element) => {
    const animateScroll = () => {
      const toBlock = element.getAttribute("href"),
        scrollTo = document.querySelector(toBlock),
        scrollToBlock = scrollTo.offsetTop;
      const animationStart = Date.now();
      const animationTimer = setInterval(() => {
        const timePassed = Date.now() - animationStart;

        if (timePassed > 510) {
          clearInterval(animationTimer);
          return;
        }

        draw(timePassed);

        function draw(timePassed) {
          const scrollValue = timePassed * 0.002 * scrollToBlock;
          document.documentElement.scrollTop = scrollValue;
        }
      }, 20);
    };

    element.addEventListener("click", () => {
      animateScroll();
    });
  });
};

export default scrollScreen;
