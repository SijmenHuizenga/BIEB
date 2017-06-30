function crossalert(msg, title, knop) {
    if(navigator.notification == undefined)
        alert(title+":\n"+msg);
    else
        navigator.notification.alert(msg, null, title, knop);
}