async function removeHandler(spriteId, bookId) {
  const url = `/books/${spriteId}/sprite`;
  var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

  fetch(url, {
    method: "DELETE",
    headers: {
      "X-CSRFToken": csrftoken,
      'Content-Type': 'application/json',
    },
  })
    .then((_) => {
      window.location.href = `/books/${bookId}`
    })
    .catch((err) => {
      console.log("Error: " + err);
    });
}
