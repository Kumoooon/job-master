const firstNameValue = document.getElementById("firstname");
const lastNameValue = document.getElementById("lastname");
const positionValue = document.getElementById("Position");
const annualValue = document.getElementById("totalannual");
const phoneNumberValue = document.getElementById("phonenumber");
const emailValue = document.getElementById("email");
postsList.addEventListener("click", (e) => {
  e.preventDefault();
  let sendData = {
    fn: e.target.dataset.fn,
    ln: e.target.dataset.ln,
    ps: e.target.dataset.ps,
    an: e.target.dataset.an,
    pn: e.target.dataset.pn,
    em: e.target.dataset.em,
    id: e.target.dataset.id,
  };
  localStorage.setItem("sendData", JSON.stringify(sendData));
  location.href = "/employeeManagement-Edit.html";
});
