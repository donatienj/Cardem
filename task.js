const stimulus = document.getElementById("stimulus");
const startBtn = document.getElementById("startBtn");

let essais = 0;
const maxEssais = 5;

let debutEssai;
let pret = false;
let resultats = [];

// demander l'identifiant participant
const participant = prompt("Entrez votre identifiant anonymisé (ex: P001)");

startBtn.addEventListener("click", lancerEssai);

function lancerEssai(){

    //cacher le bouton dès le début du test
    startBtn.style.display = "none";

    stimulus.style.backgroundColor = "white";
    pret = false;

    const delai = 1000 + Math.random() * 3000;

    setTimeout(() => {
        stimulus.style.backgroundColor = "red";
        debutEssai = performance.now();
        pret = true;
    }, delai);
}

document.addEventListener("keydown", (event) => {

    if(event.code === "Space" && pret){

        let rt = performance.now() - debutEssai;

        essais++;

        resultats.push({
            participant: participant,   //  ajouté
            essai: essais,
            rt: Math.round(rt)
        });

        stimulus.style.backgroundColor = "white";
        pret = false;

        if(essais < maxEssais){
            lancerEssai();
        } else {
            finTest();
        }
    }
});

function finTest(){

    console.table(resultats);

    let csv = "participant,essai,rt\n";

    resultats.forEach(r => {
        csv += `${r.participant},${r.essai},${r.rt}\n`;
    });

    const blob = new Blob([csv], {type: "text/csv"});

    const lien = document.createElement("a");

    lien.href = URL.createObjectURL(blob);
    lien.download = "resultats.csv";
    lien.click();

    alert("Test terminé");
}
