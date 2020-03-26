
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
                user_id: user
            })
        })
    })
}