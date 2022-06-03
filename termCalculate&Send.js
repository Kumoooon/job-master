const 트리거 = document.getElementById("to");
트리거.addEventListener("input", input);
const fromday = document.getElementById("fromday");
const today = document.getElementById("today");
fromday.textContent = "시작";
today.textContent = "끝";
function input() {
  addEventListener;
  let 시작 = document.querySelector(".from").value;
  let 끝 = document.querySelector(".to").value;
  let 시작점 = 시작.replace(/\-/g, "");
  let 끝점 = 끝.replace(/\-/g, "");

  const 시작날짜 = new Date(
    시작점.substring(0, 4),
    시작점.substring(4, 6) - 1,
    시작점.substring(6, 8)
  );
  const 끝날짜 = new Date(
    끝점.substring(0, 4),
    끝점.substring(4, 6) - 1,
    끝점.substring(6, 8)
  );
  const 기간 = Math.abs(끝날짜.getTime() - 시작날짜.getTime());
  const 기간트 = Math.floor(기간 / (1000 * 60 * 60 * 24));
  let 기간출력 = document.querySelector(".total");
  기간출력.textContent = 기간트 + 1;
  // fromday.textContent = 시작;
  // today.textContent = 끝;

  // const days = document.querySelector(".total").textContent;
  // days = 출력;

  fromday.textContent = 시작;
  today.textContent = 끝;
}
//
const insertDate = document.getElementById("from");
insertDate.addEventListener("input", () => {
  let 시작 = document.querySelector(".from").value;

  fromday.textContent = 시작;
});
//
const id = JSON.parse(localStorage.getItem("id"));

const addPostForm2 = document.querySelector(".add-post-form2");
const fromValue = document.getElementById("from");
const toValue = document.getElementById("to");
const totalValue = document.getElementById("total");
const url2 = "http://timworx.com:21011/annuals";
const left = JSON.parse(localStorage.getItem("leftover"));

const intoInteger = Number(left);

addPostForm2.addEventListener("submit", (e) => {
  e.preventDefault();
  if (totalValue.textContent > intoInteger) {
    alert("연차가 부족합니다");
    return;
  } else {
    fetch(url2, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fromday: fromValue.value,
        today: toValue.value,
        term: totalValue.textContent,
        employees_id: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const dataArr = [];
        dataArr.push(data);
        renderPosts(data);
      });
    location.href = "/annualManagement-Detail.html";
  }
});
