let target = document.querySelector("#dynamic");

function randomString() {
  let stringArr = [
    "제주도로 가볼까요?",
    "잘 다녀오세요",
    "좋은 하루 되세요",
    "연차 내기 좋은 날씨에요",
    "반갑습니다",
    "고생하셨습니다",
    "힘내세요",
    "노고가 많으셨습니다",
    "감사합니다",
  ];

  function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  let selectString = stringArr[rand(0, stringArr.length)];
  let selectStringArr = selectString.split("");
  return selectStringArr;
}

function resetTyping() {
  target.textContent = "";
  dynamic(randomString());
}
function dynamic(randomArr) {
  if (randomArr.length > 0) {
    target.textContent += randomArr.shift();
    setTimeout(function () {
      dynamic(randomArr);
    }, 80);
  } else {
    setTimeout(resetTyping, 3000);
  }
}

const blink = () => {
  target.classList.toggle("active");
};
setInterval(blink, 500);
setInterval(dynamic(randomString()), 3000);
