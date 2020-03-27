
function logout() {
    let btn = document.createElement("button");
    btn.setAttribute("id", "logout");
    let nav = document.getElementById("user");
    btn.innerText = "logout"
    btn.className = "btn-sm btn-primary"
    nav.appendChild(btn);

}

function listenForLogout() {
    const btn = document.getElementById("logout");
    btn.addEventListener("click", () => {
        //form.setAttribute("hidden", false);
        const signInForm = document.getElementById('user-signIn')
        signInForm.hidden = false
        localStorage.removeItem('userId')
        localStorage.removeItem('userName')
        location.reload()   
    })
}

function listenForUserSubmit(){
    const form = document.getElementById('user-signIn');

    form.addEventListener("submit", (event) => {
        form.setAttribute("hidden", true);
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
        setUser(user)
    } else {
        newUser(name)
    }
    window.location.replace("./index.html");
}

function setUser(user) {
    console.log(user)    
    // current user storage
    localStorage.setItem("userId", user.id)
    localStorage.setItem("userName", user.username)
    location.reload()
}

function newUser(name) {
    fetch("https://opinionatr-api.herokuapp.com/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            username: name
        })
    }).then(res => res.json()).then(data => setUser(data))
}

function userSigned(){
    if (!!localStorage.userId){
        const userNav = document.getElementById('user')
        const signInForm = document.getElementById('user-signIn')
        signInForm.hidden = true
        userNav.append(localStorage.userName)
        logout();
    }
}
    
userSigned()
listenForUserSubmit()
listenForLogout();