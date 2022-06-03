const addPostForm = document.querySelector(".add-post-form");
const firstNameValue = document.getElementById("firstname");
const lastNameValue = document.getElementById("lastname");
const positionValue = document.getElementById("Position");
const annualValue = document.getElementById("totalannual");
const phoneNumberValue = document.getElementById("phonenumber");
const emailValue = document.getElementById("eemail");
const submitBtn = document.querySelector(".addEmployeeBtn");
const url = "http://timworx.com:21011/employees";

addPostForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstname: firstNameValue.value,
      lastname: lastNameValue.value,
      position: positionValue.value,
      annual: annualValue.value,
      phonenumber: phoneNumberValue.value,
      email: emailValue.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const dataArr = [];
      dataArr.push(data);
      renderPosts(data);
    });
  location.href = "/employeeManagement.html";
});
