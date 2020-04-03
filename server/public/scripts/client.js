$(document).ready(init);

let cats = [];

function init() {
  $("#js-submit-cat").on("submit", submitCat);

  getCats();
}

function submitCat(event) {
  event.preventDefault();

  const catInput = $("#js-input-cat").val();

  postCat(catInput);

  clearInput();
}

function postCat(cat) {
  const dataForServer = {
    cat: cat,
  };

  $.ajax({
    type: "POST",
    url: "/cat",
    data: dataForServer,
  })
    .then(response => {
      getCats();
    })
    .catch(err => {
      console.warn(err);
    });
}

function getCats() {
  $.ajax({
    type: "GET",
    url: "/cat",
  })
    .then(response => {
      cats = response;
      renderCats();
    })
    .catch(err => {
      console.warn(err);
    });
}

function clearInput() {
  $("#js-input-cat").val("");
}

function renderCats() {
  $(".js-cat-output").empty();
  for (let cat of cats) {
    $(".js-cat-output").append(`<li>${cat.name}</li>`);
  }
}
