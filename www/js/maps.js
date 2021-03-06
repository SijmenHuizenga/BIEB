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
            container.innerHTML = container.innerHTML + "<br>" +
            "<div class='maps-wrapper'><div class='maps-time-start'>meldings tijdstip: " + melding.tijdstip + "</div><br>" +
            "<div class='maps-opmerking'>opmerking: " + melding.opmerking + "</div><br>" +
            "<div class='maps-sterkte'>sterkte: " + melding.sterkte + "</div>";
        });
    };

    //container.innerHTML = container.innerHTML + 'Extra stuff';
}