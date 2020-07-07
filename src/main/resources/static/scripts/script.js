const urlShort = 'https://www.omdbapi.com/?apikey=3c976051&plot=short&r=xml&t='
const urlFull = 'https://www.omdbapi.com/?apikey=3c976051&plot=full&r=xml&i='
var bk;
var searchDiv, resultDiv;
var searchId;
var userBookmarks;
var isBookmark = false;
var modal;
var username;
var loginButton;
var logoutButton;

//initialize variables
function init() {
    searchDiv = document.getElementById("search-container")
    resultDiv = document.getElementById("result-container")
    loginButton = document.getElementById("log-in");
    logoutButton = document.getElementById("log-out");
    modal = document.getElementById('login');

    resultDiv.style.display = "none";

    bk = document.getElementById('bookmarkHeart');

    getUser();
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//search for movie with sort plot
function search(param) {
    if (param === "") {
        searchDiv.classList.remove("result");
        resultDiv.style.display = "none";
    } else {
        searchDiv.classList.add("result");
        resultDiv.style.display = "block";
        document.getElementById("moreButton").style.display = "block";

        xhttp = new XMLHttpRequest();
        xhttp.open("GET", urlShort + param, true);
        xhttp.send();

        //TODO: JSON parse
        //TODO: getElement madness
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var xmlDoc = this.responseXML.getElementsByTagName("movie")[0];
                searchId = xmlDoc.attributes["imdbID"].nodeValue;

                console.log(xmlDoc.attributes);
                document.getElementById("poster").src = xmlDoc.attributes["poster"].nodeValue;
                document.getElementById("title").innerHTML = xmlDoc.attributes["title"].nodeValue;
                document.getElementById("plot").innerHTML = xmlDoc.attributes["plot"].nodeValue;
                document.getElementById("actors").innerHTML = xmlDoc.attributes["actors"].nodeValue;
                document.getElementById("director").innerHTML = xmlDoc.attributes["director"].nodeValue;
                document.getElementById("writer").innerHTML = xmlDoc.attributes["writer"].nodeValue;
                document.getElementById("rated").innerHTML = xmlDoc.attributes["rated"].nodeValue;
                document.getElementById("imdbRating").innerHTML = xmlDoc.attributes["imdbRating"].nodeValue;

                document.getElementById("genre").innerHTML = xmlDoc.attributes["genre"].nodeValue;
                document.getElementById("released").innerHTML = xmlDoc.attributes["released"].nodeValue;
                document.getElementById("runtime").innerHTML = xmlDoc.attributes["runtime"].nodeValue;

                checkIfBookmarked();
            }
        };

    }

}

//search for movie with full plot
function searchMore() {
    xhttp.open("GET", urlFull + searchId, true);
    xhttp.send();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var xmlDoc = this.responseXML.getElementsByTagName("movie")[0];

            document.getElementById("plot").innerHTML = xmlDoc.attributes["plot"].nodeValue;
            document.getElementById("moreButton").style.display = "none";
        }
    };
}

// If we are searching get if bookmarked by user
function checkIfBookmarked() {
    if (searchId) {
        xhttpB = new XMLHttpRequest();
        xhttpB.open("GET", "http://localhost:8080/bookmark/" + searchId, true);
        xhttpB.send();
        xhttpB.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    let response = JSON.parse(this.response);
                    isBookmark = response;
                } else {
                    isBookmark = false;
                }
                bookmarkColor();
            }
        };
    }
}

// add or delete from user bookmarks if logged in
function setBookmark() {
    if (document.cookie.indexOf("id") === -1) {
        document.getElementById('login').style.display = 'block';
    } else {
        xhttp = new XMLHttpRequest();
        if (isBookmark) {
            xhttp.open("DELETE", "http://localhost:8080/bookmark/" + searchId, true);
        } else {
            xhttp.open("POST", "http://localhost:8080/bookmark/" + searchId, true);
        }
        xhttp.send();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                isBookmark = !isBookmark;
                bookmarkColor();
            }
        }
    }
}

//Set heart button color
function bookmarkColor() {
    if (isBookmark) {
        bk.classList.remove("far");
        bk.classList.add("fas");
        bk.title = "Remove from Bookmarks";
    } else {
        bk.classList.remove("fas");
        bk.classList.add("far");
        bk.title = "Add to Bookmarks";
    }
}

// Show login form if trying to go to bookmarks and not logged in
function visitBookmarks() {
    if (document.cookie.indexOf("id") === -1) {
        document.getElementById('login').style.display = 'block';
        return false;
    } else {
        return true;
    }
}

// jQuery form to handle login
$('#login').ajaxForm({
    url: "/login",
    success: function(response) {
        document.getElementById('credentials-error').style.display = 'none';
        document.getElementById('login').style.display = 'none';

        username = response.email;

        login();
    },
    error: function() { // onError display error message
        document.getElementById('credentials-error').style.display = 'block';
    }
});

function on_logout_mouseover() {
    logoutButton.innerHTML = "Log-out";
}

function on_logout_mouseout() {
    logoutButton.innerHTML = username;
}

function logout() {
    document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

    logoutButton.style.display = "none";
    loginButton.style.display = "block";
}

// Set logout button with username
function login() {
    loginButton.style.display = "none";

    logoutButton.style.display = "block";
    logoutButton.innerHTML = username;

    checkIfBookmarked();
}

// If cookie exists the getUser name and login
function getUser() {
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/user", true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response);
            username = response.email;
            login();
        }
    }
}