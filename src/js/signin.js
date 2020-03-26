function listenForUserSubmit(){
    const form = document.getElementById("user-form") 
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = event.target.name.value;        
        loginUser(username)
    })
}

function loginUser(name){
    fetch("https://opinionatr-api.herokuapp.com/users")
    .then(res => res.json())
    .then(users => findUser(users, name))
}

function findUser(users, name){
    const user = users.find(user => user.username === name)
    if (!!user){
        debugger
        setUser(user)
    } else {
        newUser(user)
    }
    window.location.replace("./index.html");
}

function setUser(user) {
    // current user storage
    localStorage.setItem("user", user.id)
}

function newUser(user) {    

    fetch("https://opinionatr-api.herokuapp.com/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            username: user.username              
        })
    }).then(res => res.json()).then(data => setUser(data))
}

listenForUserSubmit()