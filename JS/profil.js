// recup du ls joueur
const dataJoueurFromLS = localStorage.getItem("joueur")
const convertJoueur = JSON.parse(dataJoueurFromLS)

// recup du ls users
const dataUsersFromLS = localStorage.getItem("users")
const convertUsers = JSON.parse(dataUsersFromLS)

//boucle pour recup les scores
let scores=[]
for(const key in convertUsers){
    if(convertJoueur.name ===  convertUsers[key].name){
        scores = convertUsers[key].scores
    }
}

// affichage nom + mail
const $nameProfil = document.getElementById("nameProfil")
$nameProfil.textContent = "Nom d'utilisateur : "+convertJoueur.name
const $mailProfil = document.getElementById("mailProfil")
$mailProfil.textContent= "Email : "+convertJoueur.mail

// affichage si aucun score enregistrer
const $noScore = document.getElementById("score1")
if (scores.length == 0) $noScore.textContent = "Aucun score enregistrer."

else{
    // affichage top score
    const $scores = []
    for(let i=1; i<6; i++){
        $scores.push(document.getElementById("score"+i))
    }

    let y = 1;
    for(let i=0; i<scores.length; i++){
        $scores[i].textContent = "Score " + y + " : " + scores[i] + " coups"
        y++
    }
}

// top 5

let top1name
let top1score =2000
let top2name
let top2score =2000
let top3name
let top3score =2000
let top4name
let top4score =2000
let top5name
let top5score =2000

// récupérer le top 5
//top 1
for (const key in convertUsers) {
    if(convertUsers[key].score1 < top1score){
        top1score = convertUsers[key].score1
        top1name = convertUsers[key].name
    }
}

//top 2
for (const key in convertUsers) {
    if(
        convertUsers[key].score1 >= top1score &&
        convertUsers[key].score1 < top2score &&
        convertUsers[key].name != top1name
        ){
            top2score = convertUsers[key].score1
            top2name = convertUsers[key].name
    }
    if(
        convertUsers[key].score2 >= top1score &&
        convertUsers[key].score2 < top2score &&
        convertUsers[key].name != top1name
        ){
            top2score = convertUsers[key].score2
            top2name = convertUsers[key].name
    }
    if(
        convertUsers[key].score3 >= top1score &&
        convertUsers[key].score3 < top2score &&
        convertUsers[key].name != top1name
        ){
            top2score = convertUsers[key].score3
            top2name = convertUsers[key].name
    }
    if(
        convertUsers[key].score4 >= top1score &&
        convertUsers[key].score4 < top2score &&
        convertUsers[key].name != top1name
        ){
            top2score = convertUsers[key].score4
            top2name = convertUsers[key].name
    }
    if(
        convertUsers[key].score5 >= top1score &&
        convertUsers[key].score5 < top2score &&
        convertUsers[key].name != top1name
        ){
            top2score = convertUsers[key].score5
            top2name = convertUsers[key].name
    }
}

//top 3
for (const key in convertUsers) {
    if(
        convertUsers[key].score1 >= top2score &&
        convertUsers[key].score1 < top3score &&
        convertUsers[key].name != top1name &&
        convertUsers[key].name != top2name
        ){
            top3score = convertUsers[key].score1
            top3name = convertUsers[key].name
        }
    if(
        convertUsers[key].score2 >= top2score &&
        convertUsers[key].score2 < top3score &&
        convertUsers[key].name != top1name &&
        convertUsers[key].name != top2name
        ){
            top3score = convertUsers[key].score2
            top3name = convertUsers[key].name
    }
    if(
        convertUsers[key].score3 >= top2score &&
        convertUsers[key].score3 < top3score &&
        convertUsers[key].name != top1name &&
        convertUsers[key].name != top2name
        ){
            top3score = convertUsers[key].score3
            top3name = convertUsers[key].name
    }
    if(
        convertUsers[key].score4 >= top2score &&
        convertUsers[key].score4 < top3score &&
        convertUsers[key].name != top1name &&
        convertUsers[key].name != top2name
        ){
            top3score = convertUsers[key].score4
            top3name = convertUsers[key].name
    }
    if(
        convertUsers[key].score5 >= top2score &&
        convertUsers[key].score5 < top3score &&
        convertUsers[key].name != top1name &&
        convertUsers[key].name != top2name
        ){
            top3score = convertUsers[key].score5
            top3name = convertUsers[key].name
    }
}

//top 4
for (const key in convertUsers) {
    
    if(
        convertUsers[key].score1 >= top3score &&
        convertUsers[key].score1 < top4score &&
        convertUsers[key].name != top1name &&
        convertUsers[key].name != top2name &&
        convertUsers[key].name != top3name
        ){
            top4score = convertUsers[key].score1
            top4name = convertUsers[key].name
    }
    if(
        convertUsers[key].score2 >= top3score &&
        convertUsers[key].score2 < top4score &&
        convertUsers[key].name != top1name &&
        convertUsers[key].name != top2name &&
        convertUsers[key].name != top3name
        ){
            top4score = convertUsers[key].score2
            top4name = convertUsers[key].name
    }
    if(
        convertUsers[key].score3 >= top3score &&
        convertUsers[key].score3 < top4score &&
        convertUsers[key].name != top1name &&
        convertUsers[key].name != top2name &&
        convertUsers[key].name != top3name
        ){
            top4score = convertUsers[key].score3
            top4name = convertUsers[key].name
    }
    if(
        convertUsers[key].score4 >= top3score &&
        convertUsers[key].score4 < top4score &&
        convertUsers[key].name != top1name &&
        convertUsers[key].name != top2name &&
        convertUsers[key].name != top3name
        ){
            top4score = convertUsers[key].score4
            top4name = convertUsers[key].name
    }
    if(
        convertUsers[key].score5 >= top3score &&
        convertUsers[key].score5 < top4score &&
        convertUsers[key].name != top1name &&
        convertUsers[key].name != top2name &&
        convertUsers[key].name != top3name
        ){
            top4score = convertUsers[key].score5
            top4name = convertUsers[key].name
    }
}

//top 5
for (const key in convertUsers) {
    if(
        convertUsers[key].score1 >= top4score &&
        convertUsers[key].score1 < top5score &&
        convertUsers[key].name != top1name &&
        convertUsers[key].name != top2name &&
        convertUsers[key].name != top3name &&
        convertUsers[key].name != top4name
        ){
            top5score = convertUsers[key].score1
            top5name = convertUsers[key].name
    }
    if(convertUsers[key].score2 >= top4score &&
        convertUsers[key].score2 < top5score &&
        convertUsers[key].name != top1name &&
        convertUsers[key].name != top2name &&
        convertUsers[key].name != top3name &&
        convertUsers[key].name != top4name
        ){
            top5score = convertUsers[key].score2
            top5name = convertUsers[key].name
    }
    if(convertUsers[key].score3 >= top4score &&
        convertUsers[key].score3 < top5score &&
        convertUsers[key].name != top1name &&
        convertUsers[key].name != top2name &&
        convertUsers[key].name != top3name &&
        convertUsers[key].name != top4name
        ){
            top5score = convertUsers[key].score3
            top5name = convertUsers[key].name
    }
    if(convertUsers[key].score4 >= top4score &&
        convertUsers[key].score4 < top5score &&
        convertUsers[key].name != top1name &&
        convertUsers[key].name != top2name &&
        convertUsers[key].name != top3name &&
        convertUsers[key].name != top4name
        ){
            top5score = convertUsers[key].score4
            top5name = convertUsers[key].name
    }
    if(convertUsers[key].score5 >= top4score &&
        convertUsers[key].score5 < top5score &&
        convertUsers[key].name != top1name &&
        convertUsers[key].name != top2name &&
        convertUsers[key].name != top3name &&
        convertUsers[key].name != top4name
        ){
            top5score = convertUsers[key].score5
            top5name = convertUsers[key].name
    }
}


// afficher top 5
const $top0 = document.getElementById("top0")
const $top1 = document.getElementById("top1")
const $top2 = document.getElementById("top2")
const $top3 = document.getElementById("top3")
const $top4 = document.getElementById("top4")
const $top5 = document.getElementById("top5")


if (top1score > 1000) $top0.textContent = "Aucun score enregistrer."
else{
    $top1.textContent = "Top 1 "+ top1name+ " : "+ top1score + " coups"

    if(top2score < 1000) $top2.textContent = "Top 2 "+ top2name+ " : "+ top2score + " coups"
    if(top3score < 1000) $top3.textContent = "Top 3 "+ top3name+ " : "+ top3score + " coups"
    if(top4score < 1000) $top4.textContent = "Top 4 "+ top4name+ " : "+ top4score + " coups"
    if(top5score < 1000) $top5.textContent = "Top 5 "+ top5name+ " : "+ top5score + " coups"
}