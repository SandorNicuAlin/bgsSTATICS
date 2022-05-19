const deleteVariantHandler = (variantId, spriteId) => {
  const url = `/variants/${variantId}`;
  var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
  fetch(url, {
    method: "DELETE",
    headers: {
      "X-CSRFToken": csrftoken,
      "Content-Type": "application/json",
    },
  })
    .then((_) => {
      window.location.href = `/sprites/${spriteId}`;
    })
    .then((err) => {
      console.log("Error: " + err);
    });
};
