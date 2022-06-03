const container = document.querySelectorAll("div.annualContainer")[0];
const annuals = document.querySelectorAll("div.annuals")[0];
const degx = document.querySelectorAll("div.degx")[0];
const degy = document.querySelectorAll("div.degy")[0];
const degz = document.querySelectorAll("div.degz")[0];
const unFoldBtn = document.getElementById("unFoldBtn");
const trigger = document.getElementById("trigger");
function spread() {
  if (trigger.innerText == "1") {
    container.style.overflow = "visible";
    container.style.height = "auto";
    annuals.style.height = "auto";
    degx.style.top = "22px";
    degy.style.transform = "rotate(-45deg)";
    degz.style.transform = "rotate(45deg)";

    trigger.innerText = "2";
  } else if (trigger.innerText == "2") {
    container.style.overflow = "hidden";
    container.style.height = "72px";
    annuals.style.height = "80px";
    degx.style.top = "8px";
    degy.style.transform = "rotate(45deg)";
    degz.style.transform = "rotate(-45deg)";
    trigger.innerText = "1";
  }
}
unFoldBtn.addEventListener("click", spread);
