function verzenden(){
    document.getElementById("verzendknop").innerHTML="Verzenden...";
    var data = {
        type: "PLANNING",
        categorie: window.localStorage.getItem("category-plannen"),
        lat: window.localStorage.getItem("lat-plannen"),
        lng: window.localStorage.getItem("lng-plannen"),
        sterkte: window.localStorage.getItem("sterkte-planning"),
        startstamp: "", //todo
        eindstamp: "" //todo
    };
    ws.send(JSON.stringify(data));
    console.log("sent!", data);
    document.getElementById("verzendknop").innerHTML = "Verzenden...";
    crossalert("Bedankt! De planning is voltooid.", "Klaar", "Ok");
    window.location = "./index.html";
}
var ws;

document.addEventListener("deviceready", function(){
    ws = openWS();
    navigator.geolocation.getCurrentPosition(onLocationReceived, onLocationError);
}, false);

function onLocationReceived(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    console.log("lat : " + lat + " lng : " + lng);
    document.getElementById("location-plannen").value = "lat : " + lat + " lng : " + lng;
    window.localStorage.setItem("lat-plannen", lat);
    window.localStorage.setItem("lng-plannen", lng);
}

function onLocationError(error) {
    console.error('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}