const changeProfileImage = () => {
    var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
    const changeImageUrl = `/changeUserProfileImage`;
    const imageInput = $('#profile-image-upload')[0].files[0];
    const formData = new FormData();
    formData.append("image", imageInput);

    fetch(changeImageUrl, {
        method: "POST",
        headers: {
            "X-CSRFToken": csrftoken,
        },
        body: formData,
    })
    .then((response) => response.json())
    .then((_) => {
        window.location.reload();
    })
    .catch((error) => {
        console.log("Error:", error);
    });

}