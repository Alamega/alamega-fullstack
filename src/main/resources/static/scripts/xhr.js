function getToken() {
  let matches = document.cookie.match(new RegExp("(?:^|; )" + "token".replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
  return document.cookie.match(new RegExp("(?:^|; )" + "token".replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"))
    ? decodeURIComponent(matches[1])
    : undefined;
}

let xhr = new XMLHttpRequest();
xhr.open("GET", "/GetMyName");
xhr.send(getToken());
xhr.onload = function () {
  if (xhr.status != 200) {
    console.log("Ошибка");
  } else {
    console.log(xhr.response);
  }
};
