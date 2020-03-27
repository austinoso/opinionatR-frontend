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
    console.log(poll)
    const pollEl = document.getElementById('poll')
    pollEl.innerText = poll.question
}


if (window.location.search) {
    setPoll()
} else {
    window.location.replace('./index.html')
}
