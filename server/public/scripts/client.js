$(document).ready(init);

function init() {
  console.log("JQ up and rollin");

  $("#js-submit-cat").on("submit", submitCat);
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
  });
}

function clearInput() {
  $("#js-input-cat").val("");
}
