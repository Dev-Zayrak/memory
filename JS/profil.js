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
    // affichage top score du joueur
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

// top score

let topScores = {"admin": 0}
// regarder si le joueur a deja un score dans le hash
//   si oui on compare les scores et on garde le plus bas
//   si non on l'ajoutes dans le hash
for(const key1 in convertUsers){
    for(const key2 in topScores){
        if(convertUsers[key1].scores[0] === undefined){
            break
        }
        if(convertUsers[key1].name === key2){
            if(topScores[key2] > convertUsers[key1].scores[0]){
                topScores[key2] = convertUsers[key1].scores[0]
            }
        }else{
            topScores[convertUsers[key1].name] = convertUsers[key1].scores[0]
        }
    }
}

delete topScores['admin']

// on trie le hash par ordre croissant des valeurs
const entries = Object.entries(topScores);
entries.sort(([, valueA], [, valueB]) => valueA - valueB);
const sortTopScores = Object.fromEntries(entries);

// on gardes uniquement les 5 premieres pairs (cle.valeur) et on supprimes les autres
const finaltopScores = {}
let count = 0
for(const key in sortTopScores){
    if(count>4) break
    finaltopScores[key] = sortTopScores[key]
    count++
}

// on boucle pour afficher les noms des joueurs et leurs scores
const $noTopScore = document.getElementById("top1")
if (Object.keys(finaltopScores).length === undefined) $noTopScore.textContent = "Aucun score enregistrer."
else{
    const $allScores = []
    for(let i=1; i<6; i++){
        $allScores.push(document.getElementById("top"+i))
    }

    let y = 0;
    let z = 1;
    for(const key in finaltopScores){
        $allScores[y].textContent = "Top " + z + " : " + key + " - " + finaltopScores[key]
        y++
        z++
    }
}