function newCompany() {
    const form = document.getElementById("create-company-form");
    
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = event.target.name.value;
        const bio = event.target.bio.value;

        fetch("https://opinionatr-api.herokuapp.com/companies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                bio: bio,
                // from local storage
                // was set in newUser.js
                user_id: localStorage.getItem('user')
            })
        })
        window.location.replace("show.html")
    })
}

function fetchCompanies(){
    return fetch('https://opinionatr-api.herokuapp.com/companies')
    .then(resp => resp.json())
}

async function renderCompanies(){
    const companies = await fetchCompanies()
    companies.forEach(company => {
        renderCompany(company)
    });
}

function renderCompany(company){
    const companiesSection = document.getElementById('companies')
    const newCompEl = document.createElement('div')
    newCompEl.appendChild(newElement("h4", company.name, "company-name"))
    newCompEl.appendChild(newElement("p", company.bio, "company-bio"))
    companiesSection.appendChild(newCompEl)
}

function newElement(type, content, id){
    const el = document.createElement(type)
    el.id = id
    el.textContent = content
    return el
}

newCompany()