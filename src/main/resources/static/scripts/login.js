var modal = document.getElementById('login');

$('#login').ajaxForm({
    url : "/login",
    success : function(){
        document.getElementById('credentials-error').style.display='none';
        document.getElementById('login').style.display='none'
    },
    error : function (){
        document.getElementById('credentials-error').style.display='block';
    }
}); 

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

