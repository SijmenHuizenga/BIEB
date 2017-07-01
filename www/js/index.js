document.addEventListener("deviceready", function(){
    ws = openWS();
    ws.onmessage = function(event){
        alert(event.data)
    }
}, false);