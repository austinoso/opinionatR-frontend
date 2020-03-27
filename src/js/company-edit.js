
// function listenForSubmitEdit() {
//     const editBtn = document.getElementById("edit-company");
    
//     editBtn.addEventListener("click", (event) => {
//         const cId = event.target.id
//         console.log(cId);
                
//         // fetch("https://opinionatr-api.herokuapp.com/companies/", {
//         //     method: "PATCH",
//         //     headers: {
//         //         method: "PATCH",
//         //         headers: {
//         //             "Content-Type": "application/json"
//         //         },
//         //         body: JSON.stringify({
                    
//         //         })
//         //     }
//         // })
//     })
// }

function listenForCompanyCard(){
    const companiesSection = document.getElementById('companiesList')
    companiesSection.addEventListener('click', (e) => {                
        if (e.target.id == "edit-company"){
            const id = e.target.dataset.id;
            console.log(id);
            createEditForm(id);
        }        
    })
}

function createEditForm(id) {
    console.log(id);
    const form = document.createElement("form");
    form.id = "edit-company"
    const nLabel = document.createElement("label");
    nLabel.for = "name"
    const nInput = document.createElement("input");
    nInput.type = "text";
    nInput.id = "name";
    nInput.placeholder = "name";

    const bLabel = document.createElement("label");
    bLabel.for = "bio"
    const bInput = document.createElement("input");
    bInput.type = "textarea"
    bInput.id = "bio"
    bInput.placeholder = "bio";

    const submit = document.createElement("button");
    submit.type = "submit"
    submit.name = "submit"
    submit.innerText = "Edit"

    form.append(nLabel, nInput, bLabel, bInput, submit);
    const place = document.getElementById("showCompany")
    place.append(form);

    form.addEventListener("submit", (e) => {
        e.preventDefault();        
        
        name = nInput.value
        bio = bInput.value        
        console.log(id);
        updateBackEnd(name, bio, id);
        form.hidden = true;
    })
}

function updateBackEnd(name, bio, id) {
    fetch(`https://opinionatr-api.herokuapp.com/companies/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            bio: bio
        })

    })
}

listenForCompanyCard();