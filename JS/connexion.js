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
    let $errorName= document.getElementById("error-name")
    let $errorPwd = document.getElementById("error-pwd")
    const profil1 = {};

    const $inputs = event.currentTarget.querySelectorAll("input")
    $inputs.forEach((input) => {
        switch(input.id){
            case "name": 
            userName = input.value
            break
            case "pwd": userPwd = input.value
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
    if(!trueName) $errorName.textContent="Nom inconnu"

    //validation + message PWD
    if(userPwd === validPwd) truePwd=true;
    else $errorPwd.textContent="Mot de passe inconnu"

    // si les données remplis sont bonnes
    if(trueName && truePwd){
        let $successMsg = document.getElementById("success-msg")
        $errorName.textContent=""
        $errorPwd.textContent=""
        $successMsg.textContent = "connexion validée !"
        setTimeout(() => {
        location.href="../HTML/profil.html"
        }, 2000);
    }

    //vider les messages d'erreurs lors d'une re-saisie
    const $name = document.getElementById("name")
    $name.addEventListener("input", function () {
        $errorName.textContent=""
    })
    const $pwd = document.getElementById("pwd")
    $pwd.addEventListener("input", function () {
        $errorPwd.textContent=""
    })

    //ENVOYER NOM + MAIL DANS LOCALSTORAGE POUR ETRE RECUP DANS LE PROFIL APRES


    profil1.name = userName
    profil1.mail = validMail
    console.log("profil1name :",profil1.name);
    console.log("profil1mail :",profil1.mail);
    localStorage.setItem("joueur", JSON.stringify(profil1))
})