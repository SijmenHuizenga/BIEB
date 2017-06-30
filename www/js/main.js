document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    ws = new WebSocket("ws://35.157.253.195/api");
    //ws = new WebSocket("ws://localhost:8090/api");
    ws.onopen = sentLocation;
}
var ws;

function sentLocation(){
    navigator.geolocation.getCurrentPosition(onLocationReceived, onLocationError);
}

function onLocationReceived(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    console.log("lat : " + lat + " lng : " + lng);

    ws.send(JSON.stringify({
        type: "POS",
        lat: lat,
        lng: lng
    }));
    console.log("sent POS");
	navigator.notification.alert(
		'Uw locatie is succesvol vezonden', null, "Verzonden!", "Sluiten"
	)
}

function onLocationError(error) {
    console.error('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}