document.addEventListener("keydown", (event) => {
  const k = event.code;
  if (k == "KeyW" || k == "ArrowUp") {
    console.log("Нажато вверх");
  } else if (k == "KeyS" || k == "ArrowDown") {
    console.log("Нажато вниз");
  } else if (k == "KeyA" || k == "ArrowLeft") {
    console.log("Нажато влево");
  } else if (k == "KeyD" || k == "ArrowRight") {
    console.log("Нажато вправо");
  } else {
    console.log("Нажато " + event.code);
  }
});

document.addEventListener("mousemove", (event) => {
  console.log(event.clientX, event.clientY);
});
