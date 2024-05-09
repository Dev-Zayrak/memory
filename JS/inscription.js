//RECUPERATION DONNÉE LOCALSTORAGE
const datasLocalstorage = localStorage.getItem("users")
const convertData = JSON.parse(datasLocalstorage)

// NAME
let $name = document.getElementById("name")
let $errorName = document.getElementById("error-name")
let $errorName2 = document.getElementById("error-name2")
const regexName = /(^[0-9a-zA-Z-]+$)/
let availableName
let regexNameBoolean
$name.addEventListener("input",function nameCheck() {
    availableName = true
    //controle si nom déjà pris
    for(const key in convertData){
        if($name.value == convertData[key].name){
            $errorName.textContent="nom déjà pris"
            availableName = false;
            console.log("log1 ",availableName);
            return
        }else $errorName.textContent=""
    }
    //controle si nom valide regex
    if(!regexName.test($name.value) || $name.value.length < 3) {
        $errorName.textContent="3 caractères minimum. Caractères spéciaux non-autorisés"
        regexNameBoolean = false
    }
    else {
        $errorName.textContent=""
        regexNameBoolean = true
    }

    console.log(availableName);
})

// MAIL
let $mail = document.getElementById("mail")
let $errorMail = document.getElementById("error-mail")
const regexMail = /(?=.*[a-zA-Z]).{2,}@(?=.*[a-zA-Z]).{2,}\.(?=.*[a-zA-Z]).{2,}/
let availableMail
let regexMailBoolean
$mail.addEventListener("input", function mailCheck() {
    availableMail=true
    //controle si mail déjà pris
    for(const key in convertData){
        if($mail.value == convertData[key].mail){
            $errorMail.textContent="mail déjà pris"
            availableMail = false;
            return
        }else $errorMail.textContent=""
    }
    //controle si mail valide regex
    if(!regexMail.test($mail.value)) {
        $errorMail.textContent="Votre e-mail doit être sous le format : contact@nom-de-domaine.fr"
        regexMailBoolean=false
    }
    else {
        $errorMail.textContent=""
        regexMailBoolean=true
    }
})

// PASSWORD
let $password = document.getElementById("pwd")
let $errorPwd = document.getElementById("error-pwd")
let regexPwdBoolean
let samePwd
const regexPwd = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}/
$password.addEventListener("input", function pdwCheck() {
    if(!regexPwd.test($password.value)) {
        $errorPwd.textContent="6 caractères minimum. Doit obligatoirement contenir 1 minuscule, 1 majuscule, 1 chiffre, 1 caractère spécial"
        regexPwdBoolean=false
    }
    else {
        $errorPwd.textContent=""
        regexPwdBoolean=true
    }
    if($check.value != $password.value) {
        $errorCheck.textContent="Les deux saisies ne sont pas identiques"
        samePwd=false
    }
    else {
        $errorCheck.textContent=""
        samePwd=true
    }
})
//controle si mdp sont identiques
let $check = document.getElementById("check")
let $errorCheck = document.getElementById("error-Check")
$check.addEventListener("input", function pdwEqual() {
    if($check.value != $password.value) {
        $errorCheck.textContent="Les deux saisies ne sont pas identiques"
        samePwd=false
    }
    else {
        $errorCheck.textContent=""
        samePwd=true
    }
})
//message puissance mdp
let $pwdPower = document.getElementById("pwd-power")
let power;
$password.addEventListener("input", function () {
    if($password.value.length!=0){
        if($password.value.length>0 && $password.value.length<7) power = "FAIBLE"
        else if($password.value.length>6 && $password.value.length<10) power = "MOYEN"
        else power = "FORT"
        $pwdPower.textContent="Le mot de passe est "+ power
    }
    else $pwdPower.textContent=""
})


// LOCAL STORAGE
// stockers informations
const user = {};
// clef d'enregistrement dans le local storage
const Key_LocalStorage = "users"
const $inscriptionForm = document.getElementById("inscriptionForm")
$inscriptionForm.addEventListener("submit", (event) =>{

    if(availableName && regexNameBoolean && availableMail && regexMailBoolean && regexPwdBoolean && samePwd){
        const $inputs = event.currentTarget.querySelectorAll("input")
        $inputs.forEach((input)=>{
            switch (input.id) {
                case "name":  user.name = input.value
                break
                case "mail": user.mail = input.value
                break
                case "pwd": 
                user.pwd = input.value
                user.score1 = 1001
                user.score2 = 1002
                user.score3 = 1003
                user.score4 = 1004
                user.score5 = 1005
            }
        })
        saveUser(Key_LocalStorage, user)

        event.preventDefault();
        let $successMsg = document.getElementById("success-msg")
        $successMsg.textContent = "Inscription validée !"
        setTimeout(() => {
        location.href="connexion.html"
        }, 2000);

    }else{
        event.preventDefault();
        let $failMsg = document.getElementById("fail-msg")
        $failMsg.textContent = "Formulaire mal rempli"
        setTimeout(() => {
            $failMsg.textContent =""
        }, 5000);
    }
})

//FUNCTION
function saveUser(key, user) {
    // Get old users
    const users = getUsers(key)
    // add new One
    users.push(user)
    // Save in LS
    localStorage.setItem(key, JSON.stringify(users))
}
function getUsers(key) {
    // Get users or array if empty
    const datasFromLocalstorage = localStorage.getItem(key)

    const convertUsers = JSON.parse(datasFromLocalstorage) || []

    return convertUsers
    // return JSON.parse(localStorage.getItem(key)) || []
}