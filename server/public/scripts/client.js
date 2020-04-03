$(document).ready(init);

let cats = [];

function init() {
  $("#js-submit-cat").on("submit", submitCat);
  $(".js-cat-output").on("click", ".js-btn-delete-cat", deleteCat);
  $(".js-cat-output").on("click", ".js-btn-toggle-owned", toggleCat);
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

function deleteCat() {
  const catId = $(this)
    .parent()
    .data("id");

  $.ajax({
    type: "DELETE",
    url: `/cat/${catId}`,
  })
    .then(response => {
      getCats();
    })
    .catch(err => {
      console.warn(err);
    });
}

function toggleCat() {
  const owned = {
    owned: $(this)
      .parent()
      .data("owned"),
  };
  const catId = $(this)
    .parent()
    .data("id");

  $.ajax({
    type: "PUT",
    url: `/cat/${catId}`,
    data: owned,
  })
    .then(response => {
      getCats();
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
    $(".js-cat-output").append(`
        <div data-id=${cat.id} data-owned=${cat.owned}>
            <span>${cat.name}</span>
            <button class="js-btn-delete-cat">X</button>
            <button class="js-btn-toggle-owned">O</button>
        </div>
    `);

    if (cat.owned === true) {
      const $el = $(".js-cat-output")
        .children()
        .last();
      $el.addClass("owned");
    }
  }
}
