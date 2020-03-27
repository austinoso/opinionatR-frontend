
function logout() {
    let btn = document.createElement("button");
    btn.setAttribute("id", "logout");
    let nav = document.getElementsByClassName("navbar-nav")[0];
    btn.innerText = "logout"
    nav.appendChild(nav);
}

function listenForLogout() {
    const btn = document.getElementById("logout");
    btn.addEventListener("click", () => {
        const form = document.getElementsByClassName("form-inline")[0];
        form.setAttribute("hidden", false);
    })
}

function listenForUserSubmit(){
    const form = document.getElementsByClassName("form-inline")[0];    

    form.addEventListener("submit", (event) => {
        form.setAttribute("hidden", true);
        event.preventDefault();
        const username = event.target.name.value;        
        loginUser(username)   
        logout();     
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
        setUser(user)
    } else {
        newUser(user)
    }
    window.location.replace("./index.html");
}

function setUser(user) {
    // current user storage
    localStorage.setItem("userId", user.id)
    localStorage.setItem("userName", user.name)

    const nav = document.getElementsByClassName("nav-bar")[0];
    const p = document.createElement("p");
    p.innerText = localStorage.userName
    nav.append(p);
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