(function () {
  const sendingBut = document.querySelector(".block-input__but"),
    data = document.querySelector(".block-input__input");

  sendingBut.addEventListener("click", () => {
    if (data.value.match(/\w+@\w+\.\w+/)) {
      data.style.border = "0";
      message("Thank you!");
      sending(data.value);
    } else {
      data.style.border = "2px solid rgba(139, 0, 0, 0.9)";
    }
  });

  function message(mes) {
    const newElement = document.createElement("div");
    newElement.classList.add("message");
    newElement.textContent = mes;

    stateBlock(".under_main__block", "none");
    document.querySelector(".under_main__block").append(newElement);

    setTimeout(function () {
      document
        .querySelector(".under_main__block")
        .childNodes.forEach((item) => {
          if (item.classList.contains("message")) {
            item.remove();
          }
        });
      stateBlock(".under_main__block", "flex");
    }, 1500);
  }

  function stateBlock(selector, state) {
    document.querySelector(selector).childNodes.forEach((item) => {
      if (
        item.classList.contains("under_main__block-text") &&
        item.style.display == "none"
      ) {
        item.style.display = "block";
        return;
      }

      item.style.display = state;
    });
  }

  function sending(inform) {
    fetch("server.php", {
      method: "POST",
      body: inform,
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((data) => {
        console.log(data);
      })
      .catch(() => {
        console.log("erorr");
      })
      .finally(() => {
        data.value = "";
      });
  }
})();
