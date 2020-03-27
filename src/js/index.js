
async function renderPolls(){
    const polls = await fetchPolls()
    polls.forEach(poll => {
        renderPoll(poll)
    });
}

function fetchPolls(){
    return fetch('https://opinionatr-api.herokuapp.com/polls')
        .then(resp => resp.json())
}

function renderPoll(poll){
    const pollsElement = document.getElementById('polls')

    pollsElement.prepend(makePollCol(poll))
}

function makePollCol(poll){
    const pollCol = document.createElement('div')
    pollCol.className = 'col-lg-3 col-md-4 col-sm-6'
    const pollCard = document.createElement('div')
    pollCard.className = 'card'
    pollCol.appendChild(pollCard)
    pollCard.appendChild(makePollBody(poll))
    return pollCol
}

function makePollBody(poll){
    const pollBody = document.createElement('div')
    pollBody.className = 'card-body'
    const header = document.createElement('h6')
    header.className = 'card-title'
    header.innerText = poll.question
    const button = document.createElement('a')
    button.className = 'btn btn-primary'
    button.innerText = "Respond"
    button.href = `./polls.html?poll=${poll.id}`
    const cardFooter = document.createElement('footer')
    cardFooter.innerText = poll.company.name
    cardFooter.className = 'blockquote-footer'
    pollBody.appendChild(header)
    pollBody.appendChild(button)
    pollBody.appendChild(cardFooter)

    return pollBody
}

renderPolls()