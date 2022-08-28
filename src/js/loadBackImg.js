(function () {
  const element = document.querySelector("header");

  document.addEventListener("scroll", loadGoodPage);

  function loadGoodPage(e) {
    if (e.target.scrollingElement.scrollTop > element.clientHeight) {
      element.style.backgroundImage = 'url("img/back_header_good.png")';
    }
  }
})();
