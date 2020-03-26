
function newPoll() {

    const form = document.getElementById("poll-form")

    form.addEventListener("submit", (event) => {

        event.preventDefault;

        const question = document.getElementById("question");

        fetch("https://opinionatr-api.herokuapp.com/polls", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: question
            })
        }).then(res => res.json).then(post => renderPost(post))
    })
}

function renderPost(post) {
    // post question/poll to site
}