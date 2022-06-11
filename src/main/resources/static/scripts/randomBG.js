const MAX_IMG_COUNT = 8;

function getRandInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

var firstRandImg;
var secondRandImg;

if (localStorage.bg1 && localStorage.bg2) {
  firstRandImg = localStorage.bg1;
  secondRandImg = localStorage.bg2;
} else {
  firstRandImg = getRandInt(MAX_IMG_COUNT);
  secondRandImg = getRandInt(MAX_IMG_COUNT);
  while (firstRandImg == secondRandImg) {
    secondRandImg = getRandInt(MAX_IMG_COUNT);
  }
  localStorage.setItem("bg1", firstRandImg);
  localStorage.setItem("bg2", secondRandImg);
}

function getRandFon() {
  if (window.matchMedia("(max-width: 800px)").matches) {
    document.getElementById("body").style.background = "url(images/randBG/chika" + firstRandImg + ".png) top left/100% repeat-y fixed";
    document.getElementById("body").style.backgroundSize = "100% auto";
  } else {
    document.getElementById("body").style.background =
      "url(images/randBG/chika" +
      firstRandImg +
      ".png) top left/60vh 100vh repeat-y fixed, url(images/randBG/chika" +
      secondRandImg +
      ".png) top right/60vh 100vh repeat-y fixed";
    document.getElementById("body").style.backgroundSize = "auto 100%";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  window.onresize = function () {
    getRandFon();
  };
  window.onload = function () {
    getRandFon();
  };
});
