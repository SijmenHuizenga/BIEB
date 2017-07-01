function verzenden(){
    document.getElementById("verzendknop").innerHTML="Verzenden...";

    //YYYY-MM-DD HH24:MM
    var s = document.getElementById("start-time").value;
    var e = document.getElementById("end-time").value;

    console.log(s);
    console.log(e);

    var data = {
        type: "PLANNING",
        categorie: window.localStorage.getItem("category-plannen"),
        lat: window.localStorage.getItem("lat-plannen"),
        lng: window.localStorage.getItem("lng-plannen"),
        sterkte: window.localStorage.getItem("sterkte-planning"),
        startstamp: s,
        eindstamp: e
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
    window.localStorage.setItem("lat-plannen", lat);
    window.localStorage.setItem("lng-plannen", lng);
}

function onLocationError(error) {
    console.error('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}