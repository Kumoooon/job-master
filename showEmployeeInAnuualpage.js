const postsList = document.querySelector(".list2");
const url = "http://timworx.com:21011/employees";
const searchAreaText = document.getElementById("searchArea");
let output = "";
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    renderPosts(data);
  });
const renderPosts = (posts) => {
  posts.forEach((post) => {
    output += `<div class="annualContainer" id="edit-post" data-id=${post.id} data-fn=${post.firstname} data-ln=${post.lastname} data-ps=${post.position} data-an=${post.annual} data-pn=${post.phonenumber} data-em=${post.email}>${post.firstname}${post.lastname}</div>`;
  });
  postsList.innerHTML = output;
};

function nullOrNot() {
  output = "";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      firteringData(data);
    });
  const firteringData = (posts) => {
    const a = posts.filter((post) =>
      post.firstname.includes(searchAreaText.value)
    );
    console.log(a);
    a.forEach((post) => {
      output += `<div class="employee" id="edit-post" data-id=${post.id} data-fn=${post.firstname} data-ln=${post.lastname} data-ps=${post.position} data-an=${post.annual} data-pn=${post.phonenumber} data-em=${post.email}>${post.firstname}${post.lastname}</div>`;
    });
    postsList.innerHTML = output;
  };
}

searchAreaText.addEventListener("input", nullOrNot);
