document.addEventListener("deviceready", loadMeldingen, false);
document.addEventListener("deviceready", initMap, false);

function loadMeldingen() {
    var container = document.getElementById("meldingencontainer");

    var ws = openWS();
    ws.onopen = function(){
        ws.send(JSON.stringify({
            type: "GETMELDINGEN"
        }));
    };
    ws.onmessage = function(msg) {
        JSON.parse(msg.data).forEach(function(melding) {
            console.log(melding);
            container.innerHTML = container.innerHTML + "<br />" +
            "locatie: " + melding.lat + " " + melding.lng + "<br />" +
            "opmerking: " + melding.opmerking + "<br />" +
            "sterkte: " + melding.sterkte;
        });
    };

    //container.innerHTML = container.innerHTML + 'Extra stuff';
}