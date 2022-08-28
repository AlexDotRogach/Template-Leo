(function () {
  //tabs
  const next = document.querySelector(".next"),
    back = document.querySelector(".back"),
    intr = document.querySelectorAll(".intorduc span");

  function nextTab(but) {
    but.addEventListener("click", () => {
      for (let i = 0; i < intr.length; i++) {
        if (!intr[i].nextElementSibling) {
          intr[i].classList = "";
          anim(intr[0]);
          intr[0].classList = "span__active";
        }

        if (intr[i].classList == "span__active") {
          anim(intr[i].nextElementSibling);
          intr[i].nextElementSibling.classList.add("span__active");
          intr[i].classList = "";
          return;
        }
      }
    });
  }

  function backTab(but) {
    but.addEventListener("click", () => {
      for (let i = 0; i < intr.length; i++) {
        if (intr[i].classList == "span__active" && i == 0) {
          anim(intr[intr.length - 1]);
          intr[intr.length - 1].classList = "span__active";
          intr[i].classList = "";
          break;
        }

        if (intr[i].classList == "span__active") {
          anim(intr[i].previousElementSibling);
          intr[i].previousElementSibling.classList = "span__active";
          intr[i].classList = "";
          break;
        }
      }
    });
  }

  function anim(elem) {
    let i = 1;

    insideAnim();

    function insideAnim() {
      if (i >= 10) {
        elem.style.opacity = 1;
        return;
      } else {
        elem.style.opacity = `0.${i}`;
        i += 0.4;
        requestAnimationFrame(insideAnim);
      }
    }
  }

  nextTab(next);
  backTab(back);

  // main tabs
  const items = document.querySelectorAll(".inform_items .inform_items__item"),
    inform = document.querySelectorAll(".main_section .inform_main"),
    screenWidth = window.screen.width;

  document.querySelector(".inform_items").addEventListener("click", (e) => {
    if (e.target.classList == "inform_items") {
      items.forEach((e, ind) => {
        e.classList.remove("inform_items__item_active");
        inform[ind].style.display = "none";
        inform[0].style.display = "block";
        setTimeout(function () {
          inform[0].style.transform = "translateX(0)";
        }, 100);
      });
    }
  });

  if (screenWidth > 1050) {
    items.forEach((item, indIte) => {
      item.addEventListener("click", () => {
        items.forEach((e) => {
          e.classList.remove("inform_items__item_active");
        });

        inform.forEach((item, indInfo) => {
          if (indIte == indInfo) {
            item.style.display = "block";
            setTimeout(function () {
              item.style.transform = "translateX(0)";
            }, 100);
          } else {
            item.style.transform = "translateX(-2000px)";
            item.style.display = "none";
          }
        });

        item.classList.toggle("inform_items__item_active");
      });
    });
  } else {
    items.forEach((item, indIte) => {
      item.addEventListener("click", () => {
        items.forEach((e) => {
          e.classList.remove("inform_items__item_active");
        });

        inform.forEach((item, indInfo) => {
          item.style.transform = "translateX(-2000px)";
          item.style.display = "none";

          if (indIte == indInfo) {
            item.style.display = "block";

            setTimeout(function () {
              item.style.transform = "translateX(0)";
            }, 100);
          }
        });

        item.classList.toggle("inform_items__item_active");
      });
    });
  }
})();
