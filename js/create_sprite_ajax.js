async function createSpriteHandler(id) {
  var url = `/books/${id}/sprite`;
  var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

  var name_input = $("#sprite_name").val();
  var image_input = $("#sprite_image")[0].files[0];

  const formData = new FormData();
  formData.append("name", name_input);
  formData.append("image", image_input);

  fetch(url, {
    method: "POST",
    headers: {
      "X-CSRFToken": csrftoken,
    },
    body: formData,
  })
    .then((_) => {
      window.location.href = `/books/${id}`
      
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
