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
    })
}

function usernameNav() {
    const form = document.getElementByClassName("form-inline");
    
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        
        form.hidden=true;
    })
}

function fetchUserCompanies(userId){
    return fetch(`https://opinionatr-api.herokuapp.com/users/${userId}`)
    .then(resp => resp.json())
}

async function renderUserCompanies(userId){
    if (!!userId){
        const user = await fetchUserCompanies(userId)
        user.companies.forEach(company => {
            renderCompany(company)
        });
    } else {
        window.location.replace("index.html")
    }
}

function renderCompany(company){
    const companiesSection = document.getElementById('companiesList')
    const newCompEl = makeCompanyCard(company)
    companiesSection.appendChild(newCompEl)
}

function makeCompanyCard(companyInfo){
    const card = document.createElement('div')
    card.className = 'card'
    const cardBody = document.createElement('div')
    cardBody.className = 'card-body'
    cardBody.id = companyInfo.id
    cardBody.innerText = companyInfo.name
    card.appendChild(cardBody)
    return card
}

function listenForCompanyCard(){
    const companiesSection = document.getElementById('companiesList')
    companiesSection.addEventListener('click', function(e){
        showCompany(e.target.id)
    })
}

async function showCompany(companyId){
    const company = await fetchSingleCompany(companyId).then(resp => resp.json())
    const shownCompany = document.getElementById('showCompany')
    shownCompany.children['company-name'].innerText = company.name
    shownCompany.children['company-bio'].innerText = company.bio
    shownCompany.children['questionForm'].hidden = false
    shownCompany.children['questionForm'].dataset.companyId = companyId
}

function listenForQuestionForm(){
    const questionForm = document.getElementById('questionForm')
    questionForm.addEventListener('submit', function(e){
        e.preventDefault()
        postPoll(e.target.question.value, e.target.dataset.companyId)
    })
}

function postPoll(question, companyId){
    config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            question: question,
            company_id: companyId
        })
    }
    fetch('https://opinionatr-api.herokuapp.com/polls', config)
    .then(resp => resp.json()).then(data => console.log(data))
}

function fetchSingleCompany(id){
    return fetch(`https://opinionatr-api.herokuapp.com/companies/${id}`)
}

newCompany()
renderUserCompanies(localStorage.user)
listenForCompanyCard()
listenForQuestionForm()