const postsList = document.querySelector(".list2");
const url = "http://timworx.com:21011/employees";
const url2 = "http://timworx.com:21011/annuals";
const searchAreaText = document.getElementById("searchArea");
const annuals = document.querySelector(".annuals");

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

const postsList2 = document.querySelector(".list2");
postsList2.addEventListener("click", (e) => {
  e.preventDefault();
  const _id = e.target.dataset.id;
  const _fn = e.target.dataset.fn;
  const _ln = e.target.dataset.ln;
  const _an = e.target.dataset.an;

  localStorage.setItem("id", _id);
  localStorage.setItem("fn", _fn);
  localStorage.setItem("ln", _ln);
  localStorage.setItem("an", _an);
  location.href = "/annualManagement-Detail.html";
});

function nullOrNot() {
  output = "";
  const filteringData = (posts) => {
    const a = posts.filter((post) =>
      (post.firstname + post.lastname).includes(searchAreaText.value)
    );

    a.forEach((post) => {
      output += `<div class="employee" id="edit-post" data-id=${post.id} data-fn=${post.firstname} data-ln=${post.lastname} data-ps=${post.position} data-an=${post.annual} data-pn=${post.phonenumber} data-em=${post.email}><div class="nameTag2">${post.firstname}${post.lastname}</div> <div class="positionTag">${post.position}</div><div class="tell">Tell. ${post.phonenumber}</div><div class="Email">E-mail. ${post.email}</div></div>`;
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
