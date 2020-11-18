const changeTeamImg = () => {
  const commandPhoto = document.querySelectorAll(".command__photo");
  commandPhoto.forEach((element) => {
    const oldPhoto = element.src,
      newPhoto = element.dataset.img;
    element.addEventListener("mouseenter", () => {
      element.src = newPhoto;
    });
    element.addEventListener("mouseleave", () => {
      element.src = oldPhoto;
    });
  });
};

export default changeTeamImg;
