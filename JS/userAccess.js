const container = document.getElementById('container')
const registerBtn = document.getElementById('register')
const loginBtn = document.getElementById('login')

document.addEventListener("DOMContentLoaded", ()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const formType = urlParams.get("form");

    if(formType === "register"){
        container.classList.add("active")
    }
})



registerBtn.addEventListener('click', ()=>{
    container.classList.add("active")
})

loginBtn.addEventListener('click', ()=>{
    container.classList.remove("active")
})
