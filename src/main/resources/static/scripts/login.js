var modal = document.getElementById('id01');

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function register()
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "/register", true );
    xmlHttp.send();
}
