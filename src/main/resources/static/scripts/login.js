var modal = document.getElementById('login');
var username;
var logoutButton, loginButton;

$('#login').ajaxForm({
    url: "/login",
    success: function(response){
        document.getElementById('credentials-error').style.display='none';
        document.getElementById('login').style.display='none'
        
        username = response.email;

        loginButton = document.getElementById("log-in")
        loginButton.style.display = "none";

        logoutButton = document.getElementById("log-out")
        logoutButton.style.display = "block";
        logoutButton.innerHTML = username;
    },
    error: function (){
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

function on_logout_mouseover()
{
    logoutButton.innerHTML = "Log-out";
}

function on_logout_mouseout()
{
    logoutButton.innerHTML = username;
}

function logout()
{
    document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

    logoutButton.style.display = "none";
    loginButton.style.display = "block";
}

