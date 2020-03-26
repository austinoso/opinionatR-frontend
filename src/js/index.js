
function renderPolls(){
    fetchPolls().then(polls => polls.forEach(poll => {
        renderPoll(poll)
    }));
}

function fetchPolls(){
    return fetch('https://opinionatr-api.herokuapp.com/polls')
    .then(resp => resp.json())
}

function renderPoll(poll){
    // pollDiv = document.createElement('div')
    // pollDiv.innerText = poll.question
    console.log(poll)
}


// let config = {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     },
//     body: JSON.stringify({ question: 'do we do good?', company_id: 1 })
// }

renderPolls()