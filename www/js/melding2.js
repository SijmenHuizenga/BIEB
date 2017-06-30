function volgende(){
    var opmerking = document.getElementById("sterkte-melding").value;

    if(opmerking == ""){
        crossalert("De sterkte is verplicht.", "Fout", "Terug");
        return;
    }

    window.localStorage.setItem("sterkte-melding", opmerking);
    window.location = "./melding3.html";
}