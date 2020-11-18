const toggleMenu = () => {
  const menu = document.querySelector("menu"),
    btnMenu = document.querySelector(".menu");

  const menuHandler = () => {
    menu.classList.toggle("active-menu");
  };

  document.body.addEventListener("click", (event) => {
    let target = event.target;
    if (
      target.classList.contains("close-btn") ||
      target.classList.contains("scroll-link") ||
      target.parentNode === btnMenu
    ) {
      menuHandler();
    } else {
      target = target.closest(".active-menu");
      if (!target && menu.classList.contains("active-menu")) {
        menuHandler();
      }
    }
  });
};

export default toggleMenu;
