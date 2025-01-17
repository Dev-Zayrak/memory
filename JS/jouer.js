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
    const dataJoueurFromLS = localStorage.getItem("joueur")
    const convertJoueur= JSON.parse(dataJoueurFromLS)

    const dataUsersFromLS = localStorage.getItem("users")
    const convertUsers = JSON.parse(dataUsersFromLS)

    for(const key in convertUsers){
        if(convertJoueur.name ===  convertUsers[key].name){
            convertUsers[key].scores.push(move)
            convertUsers[key].scores.sort()
            if(convertUsers[key].scores.length > 5){
                convertUsers[key].scores.pop()
            }
            localStorage.setItem("users", JSON.stringify(convertUsers))
        }
    }

    // for (const key in convertUsers) {
    //     if(convertJoueur.name ===  convertUsers[key].name) {

            
    //         if(move < convertUsers[key].score5){

    //             //si tu bas score5
    //             if(move < convertUsers[key].score5 && move > convertUsers[key].score4){
    //                 convertUsers[key].score5 = move
    //             }

    //             //si tu bas score4
    //             if(move < convertUsers[key].score4 && move > convertUsers[key].score3){
    //                 convertUsers[key].score5 = convertUsers[key].score4
    //                 convertUsers[key].score4 = move
    //             }

    //             //si tu bas score3
    //             if(move < convertUsers[key].score3 && move > convertUsers[key].score2){
    //                 convertUsers[key].score5 = convertUsers[key].score4
    //                 convertUsers[key].score4 = convertUsers[key].score3
    //                 convertUsers[key].score3 = move
    //             }

    //             //si tu bas score2
    //             if(move < convertUsers[key].score2 && move > convertUsers[key].score1){
    //                 convertUsers[key].score5 = convertUsers[key].score4
    //                 convertUsers[key].score4 = convertUsers[key].score3
    //                 convertUsers[key].score3 = convertUsers[key].score2
    //                 convertUsers[key].score2 = move
    //             }

    //             //si tu bas score1
    //             if(move < convertUsers[key].score1){
    //                 convertUsers[key].score5 = convertUsers[key].score4
    //                 convertUsers[key].score4 = convertUsers[key].score3
    //                 convertUsers[key].score3 = convertUsers[key].score2
    //                 convertUsers[key].score2 = convertUsers[key].score1
    //                 convertUsers[key].score1 = move
    //             }
    //             localStorage.setItem("users", JSON.stringify(convertUsers))
    //         }
    //     }
    // }
}

function flipcard(){
    if (lockTerrain) return;
    if(this === firstC) return;
    this.classList.toggle("flip")
    if (!hasFlippedCard) {
        hasFlippedCard=true
        firstC=this
    } else {
        hasFlippedCard=false
        secondC=this
        checkForMatch()
    }
}

function lockC() {
    firstC.removeEventListener("click", flipcard)
    secondC.removeEventListener("click", flipcard)
    counter++;
    resetTerrain()
    if(counter===10) victory()
}

function hideC() {
    lockTerrain = true;
    setTimeout(() => {
        firstC.classList.remove("flip")
        secondC.classList.remove("flip")
        resetTerrain()
    }, 1000);
}

function checkForMatch (){
    if (firstC.dataset.nom == secondC.dataset.nom) lockC()
    else hideC()
}

function resetTerrain() {
    move++;
    firstMove()
    hasFlippedCard = false
    lockTerrain = false
    firstC = null
    secondC = null
}

(function shuffle(){
    $cards.forEach(card=>{
        let randomNumber = Math.floor(Math.random() * 20)
        card.style.order = randomNumber
    });
})()
