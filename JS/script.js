function loadFragment(elementId, file){
    fetch(file)
    .then(response => response.text())
    .then(data => document.getElementById(elementId).innerHTML = data)
    .catch(error => console.error("Erreur de chargement :", error));
}

loadFragment("footer", "../HTML/fragment/fragment-footer.html")