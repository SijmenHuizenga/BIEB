function volgende(){
    var opmerking = document.getElementById("opmerking-melding").value;

    if(opmerking == ""){
        crossalert("De opmerking is verplicht.", "Fout", "Terug");
        return;
    }

    window.localStorage.setItem("opmerking-melding", opmerking);
    window.location = "./melding2.html";
}