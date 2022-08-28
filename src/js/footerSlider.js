(function () {
  const sliderWrap = document.querySelector(".slider__wrapper"),
    sliderElements = document.querySelectorAll(
      ".slider__wrapper .slider__content"
    ),
    butNext = document.querySelector(".slider__next"),
    butBack = document.querySelector(".slider__back"),
    width = window.getComputedStyle(
      document.querySelector(".footer__slider")
    ).width,
    slidersSize = `${+width.slice(0, -2) * sliderElements.length}px`;

  sliderWrap.style.width = slidersSize;

  sliderElements.forEach((item) => {
    item.style.width = width;
  });

  butBack.addEventListener("click", () => {
    movieSlider("right");
  });

  butNext.addEventListener("click", () => {
    movieSlider("left");
  });

  let d = 0;

  function movieSlider(direction) {
    turnButtons("none");

    let matrix = window
      .getComputedStyle(sliderWrap)
      .getPropertyValue("transform");
    let translateX = +matrix.match(/\d\d+/);

    if (direction == "right") {
      if (!!translateX) {
        let movingBack = Math.round(translateX - width.slice(0, -2));
        sliderWrap.style.transform = `translateX(-${movingBack}px)`;
      } else {
        let lastSlide = +slidersSize.slice(0, -2) - +width.slice(0, -2);
        sliderWrap.style.transform = `translateX(-${lastSlide}px)`;
      }
    }

    if (direction == "left") {
      if (!!translateX) {
        let slidElLen = sliderElements.length - 1;

        if (translateX >= +width.slice(0, -2) * slidElLen) {
          sliderWrap.style.transform = "translateX(0px)";
          turnButtons("auto");
          return;
        }

        let movingNext = Math.round(translateX + +width.slice(0, -2));
        sliderWrap.style.transform = `translateX(-${movingNext}px)`;
      } else {
        sliderWrap.style.transform = `translateX(-${width})`;
      }
    }

    setTimeout(() => {
      turnButtons("auto");
    }, 1000);
  }

  function turnButtons(state) {
    let buttons = [butNext, butBack].forEach((item) => {
      item.style.pointerEvents = `${state}`;
    });
  }
})();
