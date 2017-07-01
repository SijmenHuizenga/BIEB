document.addEventListener("deviceready", saveCategory, false);

function saveCategory() {
    window.localStorage.setItem("category-plannen", window.location.hash.substr(1));
}

function volgende(){
    var opmerking = document.getElementById("sterkte-planning").value;

    window.localStorage.setItem("sterkte-planning", opmerking);
    window.location = "./plannen3.html";
}