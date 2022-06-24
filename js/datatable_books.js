$(document).ready(() => {
  let url = "/books/list/";
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      $("#kt_datatable").DataTable({
        autoWidth: false,
        data: data,
        order: [[0, 'desc']],
        columns: [
          { data: "id" },
          { data: "title" },
          { data: "is_published_at" },
          { data: "created_at" },
          { data: "updated_at" },
          { data: { id: "id", title: "title", cover_image: "cover_image" } },
          { data: "sprite_variants_number" },
          { data: { id: "id", title: "title" } },
        ],
        columnDefs: [
          {
            targets: 0,
            render: (data) => {
              return `<div class="my-2">${data}</div>`;
            },
          },
          {
            targets: 1,
            render: (data) => {
              return `<div class="my-2 text-break">${data}</div>`;
            },
          },
          {
            targets: 2,
            render: (data) => {
              if (data === "No") {
                return `
                <div class="badge bg-danger text-wrap" style="width: 8rem;">
                  <div class="my-2">Not published</div>
                </div>
            `;
              } else {
                return `<div class="badge bg-success text-wrap" style="width: 8rem; height: 2.5rem;">
                          <div class="my-2">${data.replaceAll("-", "/")}</div>
                        </div>`;
              }
            },
          },
          {
            targets: 3,
            render: (data) => {
              return `<div class="my-2">${data.replaceAll("-", "/")}</div>`;
            },
          },
          {
            targets: 4,
            render: (data) => {
              return `<div class="my-2">${data.replaceAll("-", "/")}</div>`;
            },
          },
          {
            targets: 5,
            render: (data) => {
              var selector = data["cover_image"].replaceAll(".", "").replaceAll("/","");
              return `<a data-bs-toggle="modal" data-bs-target="#kt_modal_${selector}" title="View image" class="btn btn-sm btn-success">View image</a>
                      <div class="modal fade" tabindex="-1" id="kt_modal_${selector}">
                          <div class="modal-dialog modal-dialog-centered modal-lg" style="max-height:90%">
                              <div class="modal-content">
                                  <div class="modal-header">
                                      <h5 class="modal-title">${data["title"]}</h5>
                                      <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
                                        </svg>
                                      </div>
                                  </div>
                                  <div class="modal-body">
                                      <img style="width: 100%; height: 100%;" src="${data["cover_image"]}" />
                                  </div>
                                  <div class="modal-footer">
                                      <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                                  </div>
                              </div>
                          </div>
                      </div>
                      `;
            },
          },
          {
            targets: 6,
            render: (data) => `<div class="my-2">${data}</div>`,
          },
          {
            targets: 7,
            render: (data) => {
              return `
              <div class="d-flex">
                <a title="Generate book" href="/generateBook/${data["id"]}" class="btn btn-icon btn-sm btn-warning me-1"><i class="bi bi-book"></i></a>
                <a title="Edit book" href="/books/${data["id"]}" class="btn btn-icon btn-sm btn-info me-1"><i class="bi bi-vector-pen"></i></a>
                <a title="View pages" href="/pages/${data["id"]}" class="btn btn-icon btn-sm btn-success me-1"><i class="bi bi-images"></i></a>
                <a data-bs-toggle="modal" data-bs-target="#kt_modal_${data["id"]}" title="Delete book" class="btn btn-icon btn-sm btn-danger"><i class="bi bi-trash2"></i></a>
              <div>
              <div class="modal fade" tabindex="-1" id="kt_modal_${data["id"]}">
                  <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                          <div class="modal-header">
                              <h5 class="modal-title">Delete ${data["title"]}</h5>
                              <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
                            </svg>
                              </div>
                          </div>
                          <div class="modal-body">
                              <p>Are you sure you would like to delete the book "${data["title"]}" ?</p>
                          </div>
                          <div class="modal-footer">
                              <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                              <button onClick="requestDeleteHandler(${data["id"]})" type="button" class="btn btn-danger" data-bs-dismiss="modal">DELETE</button>
                          </div>
                      </div>
                  </div>
              </div>
              `;
            },
          },
        ],
      });
    });
});
