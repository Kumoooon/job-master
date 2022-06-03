const postsList = document.querySelector(".list");
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
    output += `<div class="employee" id="edit-post" data-id=${post.id} data-fn=${post.firstname} data-ln=${post.lastname} data-ps=${post.position} data-an=${post.annual} data-pn=${post.phonenumber} data-em=${post.email}><div class="nameTag2">${post.firstname}${post.lastname}</div> <div class="positionTag">${post.position}</div><div class="tell">Tell. ${post.phonenumber}</div><div class="Email">E-mail. ${post.email}</div></div>`;
  });
  postsList.innerHTML = output;
};

function nullOrNot() {
  output = "";
  const filteringData = (posts) => {
    const a = posts.filter((post) =>
      (post.firstname + post.lastname).includes(searchAreaText.value)
    );

    a.forEach((post) => {
      output += `<div class="employee" id="edit-post" data-id=${post.id} data-fn=${post.firstname} data-ln=${post.lastname} data-ps=${post.position} data-an=${post.annual} data-pn=${post.phonenumber} data-em=${post.email}><div class="nameTag2">${post.firstname}${post.lastname}</div> <div class="positionTag">${post.position}</div><div class="tell">Tell. ${post.phonenumber}</div><div class="Email">Email. ${post.email}</div></div>`;
    });
    postsList.innerHTML = output;
  };
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      filteringData(data);
    });
}

const search = document.getElementById("searchBtn");
search.addEventListener("click", nullOrNot);
