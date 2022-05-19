const uploadPageImageHandler = async (combinationId) => {
    const jstree_div = $("#jstree_div");
    const book_id = jstree_div.attr('book-id');
    const url = `/updatePages/${combinationId}`;
    var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

    var image_input = $("#page_combination_image")[0].files[0];
    const formData = new FormData();
    formData.append("image", image_input);

    fetch(url, {
        method: "POST",
        headers: {
            "X-CSRFToken": csrftoken,
        },
        body: formData,
    })
    .then((response) => response.json())
    .then((_) => {
        window.location.href = `/pages/${book_id}`;
    })
    .catch((error) => {
        console.error("Error:", error);
    });
};

const createPageTextHandler = async (pageTextId) => {
    const jstree_div = $("#jstree_div");
    const book_id = jstree_div.attr('book-id');
    const url = '/createPageText';
    const csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
    const fontSize = $('#font_size_input').val();
    const coordX = $('#x_coordinate_input').val();
    const coordY = $('#y_coordinate_input').val();
    const text = $('#page_text_input').val();
    const color = $('#color_input').val();
    const align = document.querySelector('input[name="alignradio"]:checked').value;
    const fill = document.getElementById('showCell').checked;

    const data = {
        'page_id': pageTextId,
        'font_size': fontSize,
        'text_box_x': coordX,
        'text_box_y': coordY,
        'text': text,
        'color': color,
        'align': align,
        'fill': fill,
    };

    fetch(url, {
        method: 'POST',
        headers: {
            "X-CSRFToken": csrftoken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        if(!response.ok) {
            $('#font_size_input').removeClass('is-invalid');
            $('#x_coordinate_input').removeClass('is-invalid');
            $('#y_coordinate_input').removeClass('is-invalid');
            $('#page_text_input').removeClass('is-invalid');
            if(fontSize === ''){
                $('#font_size_input').addClass('is-invalid');
                setTimeout(() => {
                    $('#font_size_input').removeClass('is-invalid');
                },1500)
            }
            if(coordX === '') {
                $('#x_coordinate_input').addClass('is-invalid');
                setTimeout(() => {
                    $('#x_coordinate_input').removeClass('is-invalid');
                },1500)
            }
            if(parseFloat(coordX) === 0 || parseFloat(coordX) < 0 || parseFloat(coordX) > 100) {
                $('#x_coordinate_input').addClass('is-invalid');
                setTimeout(() => {
                    $('#x_coordinate_input').removeClass('is-invalid');
                },1500)
            }
            if(coordY === ''){
                $('#y_coordinate_input').addClass('is-invalid');
                setTimeout(() => {
                    $('#y_coordinate_input').removeClass('is-invalid');
                },1500)
            }
            if(parseFloat(coordY) === 0 || parseFloat(coordY) < 0 || parseFloat(coordY) > 100) {
                $('#y_coordinate_input').addClass('is-invalid');
                setTimeout(() => {
                    $('#y_coordinate_input').removeClass('is-invalid');
                },1500)
            }
            if(text === '') {
                $('#page_text_input').addClass('is-invalid');
                setTimeout(() => {
                    $('#page_text_input').removeClass('is-invalid');
                },1500)
            }
            
            return;
        }
        window.location.href = `/pages/${book_id}`;
    })
    .catch((err) => {
        console.log('Error: ', err);
    });
};

const deletePageTextHandler = async (pageTextId) => {
    const jstree_div = $("#jstree_div");
    const book_id = jstree_div.attr('book-id');
    const deletePageUrl = `/deletePageText/${pageTextId}`;
    const csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

    fetch(deletePageUrl, {
        method: 'DELETE',
        headers: {
            "X-CSRFToken": csrftoken,
        }
    })
    .then((_) => {
        window.location.href = `/pages/${book_id}`;
    })
    .catch((err) => {
        console.log('Error: ', err);
    })
};

const updatePageTextHandler = async (pageTextId, pageId) => {
    const jstree_div = $("#jstree_div");
    const book_id = jstree_div.attr('book-id');
    const updatePageUrl = `/updatePageText/${pageTextId}`;
    const csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

    const saveButton = $(`#update_pagetext_button_${pageTextId}`);

    const fontSize = $(`#font_size_input_update_${pageTextId}`).val();
    const coordX = $(`#x_coordinate_input_update_${pageTextId}`).val();
    const coordY = $(`#y_coordinate_input_update_${pageTextId}`).val();
    const pageText = $(`#page_text_input_update_${pageTextId}`).val();
    const color = $(`#color_input_update_${pageTextId}`).val();
    const align = document.querySelector(`input[name="alignradio_${pageTextId}"]:checked`).value;
    const fill = document.getElementById(`showCell_${pageTextId}`).checked;

    const data = {
        'page': pageId,
        'font_size': fontSize,
        'text_box_x': coordX,
        'text_box_y': coordY,
        'text': pageText,
        'color': color,
        'align': align,
        'fill': fill,
    };
    
    fetch(updatePageUrl, {
        method: 'PUT',
        headers: {
            "X-CSRFToken": csrftoken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        if(!response.ok) {
            $(`#font_size_input_update_${pageTextId}`).removeClass('is-invalid');
            $(`#x_coordinate_input_update_${pageTextId}`).removeClass('is-invalid');
            $(`#y_coordinate_input_update_${pageTextId}`).removeClass('is-invalid');
            $(`#page_text_input_update_${pageTextId}`).removeClass('is-invalid');
            if(fontSize === ''){
                $(`#font_size_input_update_${pageTextId}`).addClass('is-invalid');
                setTimeout(() => {
                    $(`#font_size_input_update_${pageTextId}`).removeClass('is-invalid');
                },1500)
            }
            if(coordX === '') {
                $(`#x_coordinate_input_update_${pageTextId}`).addClass('is-invalid');
                setTimeout(() => {
                    $(`#x_coordinate_input_update_${pageTextId}`).removeClass('is-invalid');
                },1500)
            }
            if(parseFloat(coordX) < 0 || parseFloat(coordX) > 100) {
                $(`#x_coordinate_input_update_${pageTextId}`).addClass('is-invalid');
                setTimeout(() => {
                    $(`#x_coordinate_input_update_${pageTextId}`).removeClass('is-invalid');
                },1500)
            }
            if(coordY === ''){
                $(`#y_coordinate_input_update_${pageTextId}`).addClass('is-invalid');
                setTimeout(() => {
                    $(`#y_coordinate_input_update_${pageTextId}`).removeClass('is-invalid');
                },1500)
            }
            if(parseFloat(coordY) < 0 || parseFloat(coordY) > 100) {
                $(`#y_coordinate_input_update_${pageTextId}`).addClass('is-invalid');
                setTimeout(() => {
                    $(`#y_coordinate_input_update_${pageTextId}`).removeClass('is-invalid');
                },1500)
            }
            if(pageText === '') {
                $(`#page_text_input_update_${pageTextId}`).addClass('is-invalid');
                setTimeout(() => {
                    $(`#page_text_input_update_${pageTextId}`).removeClass('is-invalid');
                },1500)
            }
            return;
        }
        saveButton.html(`
        <i class="bi bi-check"></i> Saved
        `);
        setTimeout(() => {
            saveButton.html('Save');
        }, 2000);
    })
    .catch((err) => {
        console.log('Error: ', err);
    });
};

const printTextOnImage = async (pageCombinationId, variablesForThisBook) => {
    const csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
    printTextOnImageButton = $('#print_text_on_image');
    const variablesList = variablesForThisBook.split(',');
    var data = {};
    variablesList.forEach((variable) => {
        const variableInput = $(`#variable_input_${variable}`)
        data[`${variable}`] = variableInput.val();
    });
    printTextOnImageButton.val()
    printTextOnImageButton.html(`
    <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
    </div>
    `);
    const printTextOnImageUrl = `/printTextOnImage/${pageCombinationId}`;

    fetch(printTextOnImageUrl, {
        method: 'POST',
        headers: {
            "X-CSRFToken": csrftoken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),

    })
    .then((response) => response.blob())
    .then((blob) => {
        var a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = "test.pdf";
        a.click();
        printTextOnImageButton.html(`Preview`);
        // $('#image_page_container').attr("src", latestImage + `?v=${new Date().getTime()}`);
    })
    .catch((error) => {
        console.log('Error: ', error);
    })
};

const imageInputHandler = async () => {
    const input = $('#page_combination_image');
    const button = $('#page-image-button');
    input[0].files.length !== 0 ? button[0].disabled = false : button[0].disabled = true;
};

function addVariableToTextFieldHandler(variable, pageTextId) {
    let textFieldJS;
    arguments.length == 1 
        ? textFieldJS = document.getElementById('page_text_input') 
        : textFieldJS = document.getElementById(`page_text_input_update_${pageTextId}`);
    let currentTextFieldVal = textFieldJS.value;
    const cursorIndex = textFieldJS.selectionStart;
    textFieldJS.value = currentTextFieldVal.slice(0, cursorIndex) + '{{' + variable + '}}' + currentTextFieldVal.slice(cursorIndex);
    
}

    const currentPath = $(location).attr('pathname');
    if(currentPath.includes('/pages')) {
    const jstree_div = $("#jstree_div");
    const book_id = jstree_div.attr('book-id');
    const url = `/listPages/${book_id}`;
    var variablesListForThisBook = [];
    
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        let variablesSpans = ``;
        let variablesInputs = ``;
        let variables = data[0].variables;
        const variablesList = variables.split('; ');
        variablesList.pop();
        variablesListForThisBook.push([...variablesList]);
        variablesList.forEach((variable) => {
            variablesSpans += `
            <a href="javascript: " onClick="addVariableToTextFieldHandler('${variable}')"><span class="badge badge-secondary">${variable}</span></a>
            `;
            variablesInputs += `
            <input type="text" placeholder="${variable}" id="variable_input_${variable}" class="form-control m-2" name="variable_input_${variable}" >`;
        });
    
        let pages = [];
        data.forEach((page) => {
            pages.push(page.page_number)
        })
        pages = [... new Set(pages)];
    
        const newData = [];
    
        pages.forEach((page) => {
            newData.push({
                "id": 'page'+page,
                "parent": "#",
                "text": `Page ${page}`,
                "icon" : "fa fa-folder text-success",
                "metadata": {'image': `Page ${page}`},
            })
        })
    
        data.forEach((combination) => {
            newData.push({
                "id": combination.id,
                "parent": 'page'+combination.page_number,
                "text": combination.sprite_variant_combination,
                "icon": "fa fa-file text-waring",
                "metadata": {'image': combination.image},
            })
        })
        

        jstree_div.jstree({
            "core" : {
                "themes" : {
                    "responsive": false
                },
                "check_callback" : true,
                'data': newData,
            },
            "types" : {
                "default" : {
                    "icon" : "fa fa-folder text-primary"
                },
                "file" : {
                    "icon" : "fa fa-file  text-primary"
                }
            },
            "state" : { "key" : "demo2" },
            "plugins" : ["types", "state"]
        });
        
        jstree_div.on('select_node.jstree', function (_, data) {
            var i, j, r = [];
            var image, combinationId;
            for(i = 0, j = data.selected.length; i < j; i++) {
              r.push(data.instance.get_node(data.selected[i]).text);
              image = data.instance.get_node(data.selected[i]).original.metadata.image;
              combinationId = data.instance.get_node(data.selected[i]).id;
            }

            const listPageTextsUrl = `/listPageTexts/${combinationId}`;
            fetch(listPageTextsUrl)
            .then((response) => response.json())
            .then((data) => {
                const textView = $('#page_texts_view');

                // Create span for every variable
                data.forEach((pageText) => {
                    let variablesSpans = ``;
                    let variables = pageText.variables;
                    const variablesList = variables.split('; ');
                    variablesList.pop();
                    variablesList.forEach((variable) => {
                        variablesSpans += `
                        <a href="javascript: ");" onClick="addVariableToTextFieldHandler('${variable}',${pageText.id})"><span class="badge badge-light">${variable}</span></a>
                        `
                    });
                
                    textView.append(`
                    <div class="border border-1 border-gray-100 form-group mb-8 px-5 rounded row py-10">
                    <div class="d-flex">
                        <div class="mb-4">
                            <label class="form-label">Align:</label>
                            <div class="btn-group btn-group-sm ms-4" role="group" aria-label="Align radio">
                                <input type="radio" class="btn-check" name="alignradio_${pageText.id}" value="L" id="btnradio1_${pageText.id}" autocomplete="off" ${pageText.align === 'L' ? 'checked' : ''}>
                                <label class="btn btn-light-primary" for="btnradio1_${pageText.id}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-align-start" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13a.5.5 0 0 1 .5-.5z"/>
                                <path d="M3 7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7z"/>
                            </svg></label>

                                <input type="radio" class="btn-check" name="alignradio_${pageText.id}" value="C" id="btnradio2_${pageText.id}" autocomplete="off" ${pageText.align === 'C' ? 'checked' : ''}>
                                <label class="btn btn-light-primary" for="btnradio2_${pageText.id}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-align-center" viewBox="0 0 16 16">
                                <path d="M8 1a.5.5 0 0 1 .5.5V6h-1V1.5A.5.5 0 0 1 8 1zm0 14a.5.5 0 0 1-.5-.5V10h1v4.5a.5.5 0 0 1-.5.5zM2 7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7z"/>
                            </svg></label>

                                <input type="radio" class="btn-check" name="alignradio_${pageText.id}" value="R" id="btnradio3_${pageText.id}" autocomplete="off" ${pageText.align === 'R' ? 'checked' : ''}>
                                <label class="btn btn-light-primary" for="btnradio3_${pageText.id}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-align-end" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M14.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 1 0v-13a.5.5 0 0 0-.5-.5z"/>
                                <path d="M13 7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7z"/>
                            </svg></label>
                            </div>
                        </div>
                        <div class="p-2 ms-2 mb-4">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="showCell_${pageText.id}" ${pageText.fill ? 'checked' : ''}>
                                <label class="form-check-label" for="showCell_${pageText.id}">
                                    Show cell
                                </label>
                            </div>
                        </div>
                    </div>
                        <div class="col-md-3">
                            <label for="font_size_input_update_${pageText.id}" class="form-label">Font Size:</label>
                            <input type="number" name="font_size_input_update_${pageText.id}" id="font_size_input_update_${pageText.id}" class="form-control mb-2 mb-md-0" placeholder="Enter font size" value="${pageText.font_size}">
                        </div>
                        <div class="col-md-4">
                            <label for="x_coordinate_input_update_${pageText.id}" class="form-label">Text box X:</label>
                            <input type="number" name="x_coordinate_input_update_${pageText.id}" id="x_coordinate_input_update_${pageText.id}" min="0" max="100" class="form-control mb-2 mb-md-0" placeholder="Enter X coordinate" value="${pageText.text_box_x}">
                        </div>
                        <div class="col-md-4">
                            <label for="y_coordinate_input_update_${pageText.id}" class="form-label">Text box Y:</label>
                            <input type="number" name="y_coordinate_input_update_${pageText.id}" id="y_coordinate_input_update_${pageText.id}" min="0" max="100" class="form-control mb-2 mb-md-0" placeholder="Enter Y coordinate" value="${pageText.text_box_y}">
                        </div>
                        <div class="col-md-1">
                                <label for="color_input_update_${pageText.id}" class="form-label">Color:</label>
                                <input type="color" class="mw-100 form-control form-control-color" id="color_input_update_${pageText.id}" value="${pageText.color}" title="Choose your color">
                            </div>
                        <div class="row-md-3 mt-3">
                            <label for="page_text_input_update_${pageText.id}" class="form-label">Text</label>
                            <div class="ps-1 pb-3">
                                ${variablesSpans}
                            </div>
                            <textarea id="page_text_input_update_${pageText.id}" name="page_text_input_update_${pageText.id}" class="form-control" placeholder="Enter text">${pageText.text}</textarea>
                        </div>
                        <div style="text-align: end;" class="row-md-2 mt-5">
                            <button style="height: 40px;" id="update_pagetext_button_${pageText.id}" onClick="updatePageTextHandler(${pageText.id},${pageText.page})" class="btn btn-sm btn-info me-1" type="button">Save</button>
                            <button style="height: 40px;" type="button" onClick="deletePageTextHandler(${pageText.id})" class="btn btn-sm btn-danger">Delete</button>
                        </div>
                    </div>
                    `);
                    autosize($(`#page_text_input_update_${pageText.id}`));

                });
            })
            .catch(err => {
                console.log(err);
            });

            if(image === null || String(image).includes('Page')) {
            
                image === null && $('#jstree_upload_button').html(`
                    <div class="mt-8 d-flex">
                        <div class="flex-grow-1 me-3">
                            <input onChange="imageInputHandler()" accept="image/*" id="page_combination_image" name="page_combination_image" type="file" class="form-control" />
                        </div>
                        <div class>
                            <button style="height: 42px;" id="page-image-button" disabled onClick="uploadPageImageHandler(${combinationId})" class="btn btn-sm btn-primary">Upload</button>
                        </div>
                    </div>
                    <div style="background-color: #e4e6ef;" id="page_texts_view" class="rounded border d-flex flex-column p-10 mt-5">
                    <div class="d-flex justify-content-between">
                        <h1 class="mb-8">Texts for this page</h1>
                        <button data-bs-toggle="modal" data-bs-target="#kt_modal_1" class="mb-6 btn btn-primary" type="button">Export these texts to every combination of this page</button>
                        <div class="modal fade" tabindex="-1" id="kt_modal_1">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Exporting texts</h5>

                                        <!--begin::Close-->
                                        <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
                                            <span class="svg-icon svg-icon-2x"></span>
                                        </div>
                                        <!--end::Close-->
                                    </div>

                                    <div class="modal-body">
                                        <p>Ești sigur că dorești să aplici aceste texte pe fiecare combinație din această pagină?</p>
                                    </div>

                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                                        <button onclick="window.location.href='exportTexts/${data.node.id}'" type="button" id="" class="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="rounded border border-secondary d-flex flex-column p-10 mt-5">
                        <h1 class="mb-8">Add text</h1>
                        <div class="form-group row mb-5">
                            <div class="d-flex">
                                <div class="mb-4">
                                    <label class="form-label">Align:</label>
                                    <div class="border border-3 border-primary btn-group btn-group-sm ms-4 rounded rounded-3" role="group" aria-label="Align radio">
                                        <input type="radio" class="btn-check" name="alignradio" value="L" id="btnradio1" autocomplete="off" checked>
                                        <label class="btn btn-light-primary" for="btnradio1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-align-start" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13a.5.5 0 0 1 .5-.5z"/>
                                        <path d="M3 7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7z"/>
                                    </svg></label>

                                        <input type="radio" class="btn-check" name="alignradio" value="C" id="btnradio2" autocomplete="off">
                                        <label class="btn btn-light-primary" for="btnradio2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-align-center" viewBox="0 0 16 16">
                                        <path d="M8 1a.5.5 0 0 1 .5.5V6h-1V1.5A.5.5 0 0 1 8 1zm0 14a.5.5 0 0 1-.5-.5V10h1v4.5a.5.5 0 0 1-.5.5zM2 7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7z"/>
                                    </svg></label>

                                        <input type="radio" class="btn-check" name="alignradio" value="R" id="btnradio3" autocomplete="off">
                                        <label class="btn btn-light-primary" for="btnradio3"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-align-end" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M14.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 1 0v-13a.5.5 0 0 0-.5-.5z"/>
                                        <path d="M13 7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7z"/>
                                    </svg></label>
                                    </div>
                                </div>
                                <div class="p-2 ms-2 mb-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="showCell" checked>
                                        <label class="form-check-label" for="showCell">
                                            Show cell
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <label for="font_size_input" class="form-label">Font Size:</label>
                                <input type="number" name="font_size_input" id="font_size_input" class="form-control mb-2 mb-md-0" placeholder="Enter font size">
                            </div>
                            <div class="col-md-4">
                                <label for="x_coordinate_input" class="form-label">Text box X:</label>
                                <input type="number" name="x_coordinate_input" id="x_coordinate_input" min="0" max="100" class="form-control mb-2 mb-md-0" placeholder="Enter X coordinate">
                            </div>
                            <div class="col-md-4">
                                <label for="y_coordinate_input" class="form-label">Text box Y:</label>
                                <input type="number" name="y_coordinate_input" id="y_coordinate_input" min="0" max="100" class="form-control mb-2 mb-md-0" placeholder="Enter Y coordinate">
                            </div>
                            <div class="col-md-1">
                                <label for="color_input" class="form-label">Color:</label>
                                <input type="color" class="mw-100 form-control form-control-color" id="color_input" value="#563d7c" title="Choose your color">
                            </div>
                            <div class="row-md-3 mt-3">
                                <label for="page_text_input" class="form-label">Text</label>
                                <div class="ps-1 pb-3">
                                    ${variablesSpans}
                                </div>
                                <textarea id="page_text_input" name="page_text_input" class="form-control" placeholder="Enter text"></textarea>
                            </div>
                            <div style="text-align: end;" class="row-md-2 mt-5">
                                <button onClick="createPageTextHandler(${combinationId})" class="btn btn-info" type="button">Save</button>
                            </div>
                        </div>
                    </div>
                `);
                String(image).includes('Page') && $('#jstree_upload_button').html(`
                <center>Select a specific combination.</center>
                `)
                autosize($('#page_text_input'));
            }
            else {
            
            var imageText = String(image);
            var selector = imageText.replaceAll(".", "").replaceAll("/", "");
   
            $('#jstree_upload_button').html(`
                <div class="mt-5 d-flex">
                    <div class="flex-grow-1 me-3">
                    <input onChange="imageInputHandler()" accept="image/*" id="page_combination_image" name="page_combination_image" type="file" class="form-control" />
                    </div>
                    <div class>
                        <button style="height: 42px;" id="page-image-button" disabled type="button" onClick="uploadPageImageHandler(${combinationId})" class="btn btn-sm btn-primary text-small">Upload</button>
                        <button style="height: 42px;" data-bs-toggle="modal" data-bs-target="#kt_modal_${selector}" title="View image" class="btn btn-sm btn-info text-small ms-1">View image</button>
                        <div class="modal fade" tabindex="-1" id="kt_modal_${selector}">
                            <div class="modal-dialog modal-dialog-centered modal-lg" style="max-height:90%">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">${data.node.text}</h5>
                                        <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="modal-body">
                                        <img style="width: 100%; height: 100%;" src="${imageText}" />
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button style="height: 42px;" id="print_text_on_image" type="button" onClick="printTextOnImage(${combinationId},'${variablesListForThisBook}')" class="text-small btn btn-success btn-sm ms-1">Preview</button>
                    </div>
                </div>
                <div class="pt-5 accordion" id="kt_accordion_1">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="kt_accordion_1_header_2">
                            <button style="background-color: #e4e6ef;" class="accordion-button fs-4 fw-bold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#kt_accordion_1_body_2" aria-expanded="false" aria-controls="kt_accordion_1_body_2">
                            Assign values to variables
                            </button>
                        </h2>
                        <div id="kt_accordion_1_body_2" class="accordion-collapse collapse" aria-labelledby="kt_accordion_1_header_2" data-bs-parent="#kt_accordion_1">
                            <div class="accordion-body">
                                ${variablesInputs}
                            </div>
                        </div>
                    </div>
                </div>
                <div style="background-color: #e4e6ef;" id="page_texts_view" class="rounded border d-flex flex-column p-10 mt-5">
                <div class="d-flex justify-content-between">
                    <h1 class="mb-8">Texts for this page</h1>
                    <button data-bs-toggle="modal" data-bs-target="#kt_modal_1" class="mb-6 btn btn-primary" type="button">Export these texts to every combination of this page</button>
                    <div class="modal fade" tabindex="-1" id="kt_modal_1">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Exporting texts</h5>

                                    <!--begin::Close-->
                                    <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
                                        <span class="svg-icon svg-icon-2x"></span>
                                    </div>
                                    <!--end::Close-->
                                </div>

                                <div class="modal-body">
                                    <p>Ești sigur că dorești să aplici aceste texte pe fiecare combinație din această pagină?</p>
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                                    <button onclick="window.location.href='exportTexts/${data.node.id}'" type="button" id="" class="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <div class="rounded border border-secondary d-flex flex-column p-10 mt-5">
                        <h1 class="mb-8">Add text</h1>
                        <div class="form-group row mb-5">
                            <div class="d-flex">
                                <div class="mb-4">
                                    <label class="form-label">Align:</label>
                                    <div class="border border-3 border-primary btn-group btn-group-sm ms-4 rounded rounded-3" role="group" aria-label="Align radio">
                                        <input type="radio" class="btn-check" name="alignradio" value="L" id="btnradio1" autocomplete="off" checked>
                                        <label class="btn btn-light-primary" for="btnradio1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-align-start" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13a.5.5 0 0 1 .5-.5z"/>
                                        <path d="M3 7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7z"/>
                                    </svg></label>

                                        <input type="radio" class="btn-check" name="alignradio" value="C" id="btnradio2" autocomplete="off">
                                        <label class="btn btn-light-primary" for="btnradio2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-align-center" viewBox="0 0 16 16">
                                        <path d="M8 1a.5.5 0 0 1 .5.5V6h-1V1.5A.5.5 0 0 1 8 1zm0 14a.5.5 0 0 1-.5-.5V10h1v4.5a.5.5 0 0 1-.5.5zM2 7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7z"/>
                                    </svg></label>

                                        <input type="radio" class="btn-check" name="alignradio" value="R" id="btnradio3" autocomplete="off">
                                        <label class="btn btn-light-primary" for="btnradio3"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-align-end" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M14.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 1 0v-13a.5.5 0 0 0-.5-.5z"/>
                                        <path d="M13 7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7z"/>
                                    </svg></label>
                                    </div>
                                </div>
                                <div class="p-2 ms-2 mb-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="showCell" checked>
                                        <label class="form-check-label" for="showCell">
                                            Show cell
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <label for="font_size_input" class="form-label">Font Size:</label>
                                <input type="number" name="font_size_input" id="font_size_input" class="form-control mb-2 mb-md-0" placeholder="Enter font size">
                            </div>
                            <div class="col-md-4">
                                <label for="x_coordinate_input" class="form-label">Text box X:</label>
                                <input type="number" name="x_coordinate_input" id="x_coordinate_input" min="0" max="100" class="form-control mb-2 mb-md-0" placeholder="Enter X coordinate">
                            </div>
                            <div class="col-md-4">
                                <label for="y_coordinate_input" class="form-label">Text box Y:</label>
                                <input type="number" name="y_coordinate_input" id="y_coordinate_input" min="0" max="100" class="form-control mb-2 mb-md-0" placeholder="Enter Y coordinate">
                            </div>
                            <div class="col-md-1">
                                <label for="color_input" class="form-label">Color:</label>
                                <input type="color" class="mw-100 form-control form-control-color" id="color_input" value="#563d7c" title="Choose your color">
                            </div>
                            <div class="row-md-3 mt-3">
                                <label for="page_text_input" class="form-label">Text</label>
                                <div class="ps-1 pb-3">
                                    ${variablesSpans}
                                </div>
                                <textarea id="page_text_input" name="page_text_input" class="form-control" placeholder="Enter text"></textarea>
                            </div>
                            <div style="text-align: end;" class="row-md-2 mt-5">
                                <button onClick="createPageTextHandler(${combinationId})" class="btn btn-info" type="button">Save</button>
                            </div>
                        </div>
                    </div>
            `);
            autosize($('#page_text_input'));
            for (let index = 0; index < variablesList.length; index++) {
                const variable = variablesList[index];
                const variableInput = document.getElementById(`variable_input_${variable}`);
                variableInput.value = window.localStorage.getItem(`${book_id}-${variable}`)
                variableInput.addEventListener('input', (event) => {
                   window.localStorage.setItem(`${book_id}-${variable}`, event.target.value)
                })
            }
            }
          })     
    })
    .catch((err) => {
        console.log('Error: ', err);
    });
}
