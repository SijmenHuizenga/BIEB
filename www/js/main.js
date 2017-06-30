function crossalert(msg, title, knop) {
    if(navigator.notification == undefined)
        alert(title+":\n"+msg);
    else
        navigator.notification.alert(msg, null, title, knop);
}
function openWS(){
    return new WebSocket("ws://35.157.253.195/api");
  //return new WebSocket("ws://localhost:8090/api");
}