//RECUPERATION DONNÉE LOCALSTORAGE
const datasLocalstorage = localStorage.getItem("users")
const convertData = JSON.parse(datasLocalstorage)

const $validation = document.getElementById("connexionForm")
$validation.addEventListener("submit", (event) =>{
    event.preventDefault(); //bloque le rechargement de la page
    let userName
    let userPwd
    let validPwd
    let validMail
    let trueName=false;
    let truePwd=false;
    let $failConnexion = document.getElementById("fail-msg-sign-in")
    // let $errorName= document.getElementById("error-name-sign-in")
    // let $errorPwd = document.getElementById("error-pwd-sign-in")
    const profil1 = {};

    const $inputs = event.currentTarget.querySelectorAll("input")
    $inputs.forEach((input) => {
        switch(input.id){
            case "name-sign-in": 
            userName = input.value
            break
            case "pwd-sign-in": userPwd = input.value
        }
    });
    //boucle et message NAME + recuperation vraie mdp si nom existe
    for (const key in convertData) {
                if (userName === convertData[key].name) {
                    validPwd = convertData[key].pwd
                    validMail = convertData[key].mail
                    trueName=true;
                }
    }

    if(trueName && userPwd === validPwd) truePwd=true
    else $failConnexion.textContent="Nom ou / et mot de passe inconnu"

    // si les données remplis sont bonnes
    if(trueName && truePwd){
        let $successMsg = document.getElementById("success-msg-sign-in")
        // $errorName.textContent=""
        // $errorPwd.textContent=""
        $successMsg.textContent = "connexion validée !"
        setTimeout(() => {
        location.href="../HTML/profil.html"
        }, 3000);
    }

    //vider les messages d'erreurs lors d'une re-saisie
    const $name = document.getElementById("name-sign-in")
    $name.addEventListener("input", function () {
        $failConnexion.textContent=""
    })
    const $pwd = document.getElementById("pwd-sign-in")
    $pwd.addEventListener("input", function () {
        $failConnexion.textContent=""
    })

    //ENVOYER NOM + MAIL DANS LOCALSTORAGE POUR ETRE RECUP DANS LE PROFIL APRES
    profil1.name = userName
    profil1.mail = validMail
    localStorage.setItem("joueur", JSON.stringify(profil1))
})