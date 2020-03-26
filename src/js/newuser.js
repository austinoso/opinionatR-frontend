
function newUser() {
    const form = document.getElementById("user-form") {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            
            const name = event.target.name.value;

            fetch("https://opinionatr-api.herokuapp.com/users", {
                method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,                
            })
        })
    }
}