const generateBookHandler = (bookId) => {
    const csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
    const combinationSelector = document.getElementById('bookgen_combination_selector').value;
    const accordionVariables = document.getElementById('accordion_variables');
    const inputsVariables = accordionVariables.getElementsByTagName("*");
    const generateBookButton = document.getElementById('generate_book_button');
    generateBookButton.innerHTML = `
    <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
    </div>
    `;
    data= {
        'combination': combinationSelector,
        'variables': {}
    }
    for(i=0;i<inputsVariables.length;i++){
        data['variables'][`${inputsVariables[i].getAttribute('placeholder')}`] = inputsVariables[i].value
    }
    const generateBookPdfUrl = `/generateBookPdf/${bookId}`;
    fetch(generateBookPdfUrl, {
        method: 'POST',
        headers: {
            "X-CSRFToken": csrftoken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if(!response.ok) {
            window.location.reload();
            return;
        }
        return response.blob()
    })
    .then(blob =>{
        var a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = "test.pdf";
        a.click();
        generateBookButton.innerHTML = `Generate`;
    })
    .catch(err => {
        console.log(err);
    })
}