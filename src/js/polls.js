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
            user_id: localStorage.user,
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
    responseCard.className = 'card'
    responseCard.append(makeResponseCardBody(response))
    return responseCard
}

function makeResponseCardBody(response){
    const responseCardBody = document.createElement('div')
    responseCardBody.className = 'card-body'
    const responseContent = document.createElement('p')
    responseContent.innerText = response.content
    responseCardBody.append(responseContent)
    return responseCardBody
}

listenForResponseForm()

if (window.location.search) {
    setPoll()
} else {
    window.location.replace('./index.html')
}
