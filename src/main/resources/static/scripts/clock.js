var date;
var time;
var clockv = document.getElementById("clock");

function clock() {
  date = new Date();
  time = [date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()];
  if (time[0] < 10) {
    time[0] = "0" + time[0];
  }
  if (time[1] < 10) {
    time[1] = "0" + time[1];
  }
  if (time[2] < 10) {
    time[2] = "0" + time[2];
  }
  if (time[3] < 10) {
    time[3] = "00" + time[3];
  }
  if (time[3] < 100 && time[3] >= 10) {
    time[3] = "0" + time[3];
  }
  clockv.innerHTML = [time[0], time[1], time[2]].join(":") + " " + time[3];
}

setInterval("clock()", 1);
