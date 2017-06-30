function verzenden(){
    var data = {
        type: "MELDING",
        lat: window.localStorage.getItem("lat-melding"),
        lng: window.localStorage.getItem("lng-melding"),
        opmerking: window.localStorage.getItem("opmerking-melding"),
        sterkte: window.localStorage.getItem("sterkte-melding")
    };
    ws.send(JSON.stringify(data));
    console.log("sent POS", data);
}
var ws;

document.addEventListener("deviceready", function(){
    ws = new WebSocket("ws://35.157.253.195/api");
    //ws = new WebSocket("ws://localhost:8090/api");
    navigator.geolocation.getCurrentPosition(onLocationReceived, onLocationError);
    document.getElementById("opmerking-melding").value = window.localStorage.getItem("opmerking-melding");
    document.getElementById("sterkte-melding").value = window.localStorage.getItem("opmerking-melding");
}, false);

function onLocationReceived(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    console.log("lat : " + lat + " lng : " + lng);
    document.getElementById("location-melding").value = "lat : " + lat + " lng : " + lng;
    window.localStorage.setItem("lat-melding", lat);
    window.localStorage.setItem("lng-melding", lng);
}

function onLocationError(error) {
    console.error('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}