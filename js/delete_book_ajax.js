const requestDeleteHandler = (id) => {
  var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
  
  $.ajax({
    url: "/books/" + id,
    beforeSend: function (xhr) {
      xhr.setRequestHeader("X-CSRFToken", csrftoken);
    },
    type: "DELETE",
    success: (_) => {
      let url = "/books/list/";
      fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        $('#kt_datatable').DataTable().clear().draw();
        $('#kt_datatable').DataTable().rows.add(data);
        $('#kt_datatable').DataTable().columns.adjust().draw();
      })
    }
  });
};
