const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const completeButton = document.getElementById("completeButton");

const firstPage = document.getElementsByClassName("firstPage")[0];
const secondPage = document.getElementsByClassName("secondPage")[0];
const thirdPage = document.getElementsByClassName("thirdPage")[0];
var c;
var today = new Date().toISOString().split("T")[0];
document.getElementsByName("selectDate")[0].setAttribute("min", today);

const days = document.getElementsByClassName("days")[0];
const hours = document.getElementsByClassName("hours")[0];
const min = document.getElementsByClassName("min")[0];
const sec = document.getElementsByClassName("sec")[0];
const completeInfo = document.getElementById("completeInfo");

let savedCountdown;

function complete(y) {
  thirdPage.removeAttribute("hidden");
  completeInfo.textContent = `finished on ${y}`;
}

function countdown() {
  let x1 = document.getElementById("selectDate").value;
  let k1 = new Date(x1).getTime();
  let k = new Date().getTime();
  let remainingT = Math.round((k1 - k) / 1000) - 19800; //19800 is 5 hours 30 min that gets added on gmt
  if (remainingT < 0) {
    secondPage.setAttribute("hidden", true);
    clearInterval(c);
    complete(new Date(x1).toISOString().split("T")[0]);
  } else {
    let d = Math.floor(remainingT / 86400);
    let h = Math.floor((remainingT % 86400) / 3600);
    let m = Math.floor(((remainingT % 86400) % 3600) / 60);
    let s = Math.floor(((remainingT % 86400) % 3600) % 60);
    days.textContent = d;
    hours.textContent = h;
    min.textContent = m;
    sec.textContent = s;
  }
}

function handleSubmit(e) {
  if(e){
    e.preventDefault();
  }
  let x = document.getElementById("selectDate").value;
  if (x) {
    let date = new Date(x).toISOString().split("T")[0];
    if (date === today) {
      firstPage.setAttribute("hidden", true);
      complete(date);
    } else {
      firstPage.setAttribute("hidden", true);
      secondPage.removeAttribute("hidden");
      let tfirst = document.getElementById("titleFirst").value;
      if (tfirst) {
        document.getElementById("titleSecond").textContent = tfirst;
      }
      savedCountdown = {
        title: tfirst,
        date: x,
      };
      localStorage.setItem("countdown", JSON.stringify(savedCountdown));
      c = setInterval(countdown, 1000);
    }
  } else {
    alert("set countdown date");
  }
}

function handleReset() {
  clearInterval(c);
  secondPage.setAttribute("hidden", true);
  thirdPage.setAttribute("hidden", true);
  firstPage.removeAttribute("hidden");
  localStorage.removeItem('countdown');
}

function restorePreviousCountdown() {
  if (localStorage.getItem("countdown")) {
    savedCountdown = JSON.parse(localStorage.getItem("countdown"));
    document.getElementById("titleFirst").textContent = countdown.title;
    const dated = countdown.date;
    document.getElementById("selectDate").textContent = new Date(dated).getTime();
    handleSubmit();
  }
}

submitBtn.addEventListener("click", handleSubmit);
resetBtn.addEventListener("click", handleReset);
completeButton.addEventListener("click", handleReset);

//on Load, check localStorage
restorePreviousCountdown();