function getPoll(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const poll = urlParams.get('poll')
    return poll
}

function fetchSinglePoll(poll){
    return fetch(`https://opinionatr-api.herokuapp.com/polls/${poll}`)
        .then(resp => resp.json())
}

async function setPoll(){
    const poll = await fetchSinglePoll(getPoll())
    renderPoll(poll)
}

function renderPoll(poll){
    const pollEl = document.getElementById('poll')
    pollEl.children['company-name'].innerText = `${poll.company.name} asks...`
    pollEl.children['poll-question'].innerText = poll.question
    renderResponses(poll.responses)
}

function listenForResponseForm(){
    const responseForm = document.getElementById('response-form')
    responseForm.addEventListener('submit', function(e){
        e.preventDefault()
        postResponse(e.target)
        e.target.response.value = ' '
    })
}

function postResponse(response){
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            content: response.response.value,
            user_id: localStorage.userId,
            poll_id: getPoll()
        })
    }

    fetch('https://opinionatr-api.herokuapp.com/responses', config)
        .then(resp => resp.json()).then(responseData => renderResponse(responseData))
}

function renderResponses(responses){
    responses.forEach(response => {
        renderResponse(response)
    });
}

function renderResponse(response){
    const responsesSection = document.getElementById('responses')
    responsesSection.prepend(makeResponseCard(response))
}

function makeResponseCard(response){
    const responseCard = document.createElement('div')
    responseCard.className = 'card response-card'
    responseCard.append(makeResponseCardBody(response))
    return responseCard
}

function makeResponseCardBody(response){
    const responseCardBody = document.createElement('div')
    responseCardBody.className = 'card-body'
    const responseContent = document.createElement('blockquote')
    responseContent.dataset.id = response.id
    const content = document.createElement('p')
    content.className = "content"
    content.innerText = response.content
    const username = document.createElement('footer')
    username.className= 'blockquote-footer'
    username.innerText = response.user.username
    responseCardBody.append(responseContent)
    responseContent.append(content)
    responseContent.append(username)
    if (response.user.id == localStorage.userId){
        const editButton = document.createElement('button')
        editButton.className = "btn-sm btn-secondary"
        editButton.class = "edit-button"
        editButton.innerText = 'Edit'
        editButton.addEventListener('click', function(e){
            editResponse(e.target.parentElement)
        })
        responseContent.append(editButton)
    }
    responseContent.prepend(buildEditForm(responseContent))
    return responseCardBody
}


function editResponse(parentElement){
    if (parentElement.firstChild.hidden === true){
        parentElement.firstChild.hidden = false
        parentElement.children[1].hidden = true
    } else {
        parentElement.firstChild.hidden = true
        parentElement.children[1].hidden = false
    }
}

function buildEditForm(parentElement){
    const form = document.createElement('form')
    form.className = "form"
    form.id = `edit-form-${parentElement.dataset.id}`
    form.dataset.id = parentElement.dataset.id
    const responseField = document.createElement('textarea')
    responseField.className = "form-control"
    responseField.name = "content"
    responseField.innerText = parentElement.children[0].innerText
    const submitButton = document.createElement('input')
    submitButton.type = 'submit'
    submitButton.className = "btn-sm btn-primary"
    form.append(responseField)
    form.append(submitButton)
    form.addEventListener('submit', function(e){
        e.preventDefault()
        updateResponse(e.target)
    })
    form.hidden = true
    return form
}

function updateResponse(formData){
    config = {
        method: 'PATCH',
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        },
        body: JSON.stringify({
            content: formData.content.value
        })
    }

    fetch(`https://opinionatr-api.herokuapp.com/responses/${formData.dataset.id}`, config)
        .then(resp => resp.json()).then(response => updateResponseDom(response, formData.dataset.id))
}

function updateResponseDom(response, id){
    const card = document.querySelector(`[data-id='${id}']`)
    card.children[1].innerText = response.content
    card.children[0].hidden = true
    card.children[1].hidden = false
}

listenForResponseForm()

if (window.location.search) {
    setPoll()
} else {
    window.location.replace('./index.html')
}
