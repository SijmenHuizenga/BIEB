document.addEventListener("deviceready", initListener, false);

function initListener(){
    document.getElementById("sterkte-slider").addEventListener('input', updateHinderTeksten, false);
    updateHinderTeksten();
}

function updateHinderTeksten(){
    var sterkte = document.getElementById("sterkte-slider").value;
    document.getElementById("overlaststerkte").innerHTML = sterkte;
    if(sterkte < 20){
        document.getElementById("overlastnaam").innerHTML = "Laag";
        document.getElementById("overlastvoorbeeld").innerHTML = "Stemgeluid, apparatengeluid";
    } else if(sterkte < 40){
        document.getElementById("overlastnaam").innerHTML = "Hoorbaar";
        document.getElementById("overlastvoorbeeld").innerHTML = "Harde tv, stofzuiger, meerdere personen die telefoneren";
    } else if(sterkte < 60){
        document.getElementById("overlastnaam").innerHTML = "Irritant";
        document.getElementById("overlastvoorbeeld").innerHTML = "Wekker, vrachtverkeer, deurbel";
    } else if(sterkte < 80) {
        document.getElementById("overlastnaam").innerHTML = "Zeer hinderlijk";
        document.getElementById("overlastvoorbeeld").innerHTML = "Dichtbij vrachtwagen, schreeuwen, juichen, gillen";
    } else {
        document.getElementById("overlastnaam").innerHTML = "Extreem luid";
        document.getElementById("overlastvoorbeeld").innerHTML = "Rockconcert, kettingzaag";
    }
}