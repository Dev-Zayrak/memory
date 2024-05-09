const $cards = document.querySelectorAll(".card")

$cards.forEach(card => card.addEventListener("click", flipcard))


document.addEventListener("keyup", function (key) {
    if(key.keyCode == 32) location.reload()
})

//savoir si c'est la 1ere ou 2eme carte cliquer 
let hasFlippedCard = false
let firstC, secondC
let lockTerrain=false
let counter =0
let move =0

//afficher le compteur
let $count = document.getElementById("count")
function firstMove() {
    $count.textContent="Nombre de coups : "+move
}

//message de victoire
const $modal = document.querySelector(".modal");
const $closeButton = document.querySelector(".close-button");
const $modalScore = document.getElementById("modal-score")


function toggleModal() {
    $modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === $modal) {
        toggleModal();
    }
}
$closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

const $newGameButton = document.querySelector(".new-game");
$newGameButton.addEventListener("click", function(key){
    location.reload()
});

function victory() {
    setTimeout(() => {
            scoreboard()
            $modalScore.textContent = "Nombre de coups : "+move
            toggleModal()
        }, 1500);
}

function scoreboard() {
       // recuperer les données joueur du ls
    const dataJoueurFromLS = localStorage.getItem("joueur")
    const convertJoueur= JSON.parse(dataJoueurFromLS)

    // recuperer les données USERS du ls
    const dataUsersFromLS = localStorage.getItem("users")
    const convertUsers = JSON.parse(dataUsersFromLS)
    // boucle pour récupérer USERS
    for (const key in convertUsers) {
        if(convertJoueur.name ===  convertUsers[key].name) {

            //ajouter les nouvelles données si amelioration du score
            if(move < convertUsers[key].score5){

                //si tu bas score5
                if(move < convertUsers[key].score5 && move > convertUsers[key].score4){
                    convertUsers[key].score5 = move
                }

                //si tu bas score4
                if(move < convertUsers[key].score4 && move > convertUsers[key].score3){
                    convertUsers[key].score5 = convertUsers[key].score4
                    convertUsers[key].score4 = move
                }

                //si tu bas score3
                if(move < convertUsers[key].score3 && move > convertUsers[key].score2){
                    convertUsers[key].score5 = convertUsers[key].score4
                    convertUsers[key].score4 = convertUsers[key].score3
                    convertUsers[key].score3 = move
                }

                //si tu bas score2
                if(move < convertUsers[key].score2 && move > convertUsers[key].score1){
                    convertUsers[key].score5 = convertUsers[key].score4
                    convertUsers[key].score4 = convertUsers[key].score3
                    convertUsers[key].score3 = convertUsers[key].score2
                    convertUsers[key].score2 = move
                }

                //si tu bas score1
                if(move < convertUsers[key].score1){
                    convertUsers[key].score5 = convertUsers[key].score4
                    convertUsers[key].score4 = convertUsers[key].score3
                    convertUsers[key].score3 = convertUsers[key].score2
                    convertUsers[key].score2 = convertUsers[key].score1
                    convertUsers[key].score1 = move
                }
                localStorage.setItem("users", JSON.stringify(convertUsers))
            }
        }
    }
}


//change le nom de la classe quand on clique sur la carte
function flipcard(){
    if (lockTerrain) return;  //le return arrete la fonction
    if(this === firstC) return; //empeche de cliquer deux fois sur la meme carte
    this.classList.toggle("flip") //rajoute "flip" dans le nom de la classe
    if (!hasFlippedCard) { //si il n'y a pas de carte retourné lorsque le joueur clique sur une carte
        hasFlippedCard=true
        firstC=this
    } else { // si il y a une carte retournée
        hasFlippedCard=false
        secondC=this
        checkForMatch()
    }
}

//si deux cartes sont identiques
function lockC() {
    firstC.removeEventListener("click", flipcard)
    secondC.removeEventListener("click", flipcard)
    counter++;
    resetTerrain()
    if(counter===10) victory()
}

//si deux cartes sont différentes
function hideC() {
    lockTerrain = true;
    setTimeout(() => {
        firstC.classList.remove("flip")
        secondC.classList.remove("flip")
        resetTerrain()
    }, 500);
}

// controle si les deux cartes sont identiques
function checkForMatch (){
    if (firstC.dataset.nom == secondC.dataset.nom) lockC()  //si les deux cartes match on les verrouilles
    else hideC()  // si les deux cartes sont différentes ont les retournent automatiquement
}

//reset les cartes pour ne pas verrouiller la premiere carte cliquer
function resetTerrain() { 
    move++;
    firstMove()
    hasFlippedCard = false
    lockTerrain = false
    firstC = null
    secondC = null
}

//Quand on mets une fonction entre parenthèses elle est immédiatement invoqué
//Cela s'appelles IIFE (Immediately Invoked Function Expression)
(function shuffle(){
    $cards.forEach(card=>{
        let randomNumber = Math.floor(Math.random() * 20)
        card.style.order = randomNumber
    });
})()