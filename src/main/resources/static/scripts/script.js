const urlShort = 'http://www.omdbapi.com/?apikey=3c976051&plot=short&r=xml&t='
const urlFull = 'http://www.omdbapi.com/?apikey=3c976051&plot=full&r=xml&i='
var bk;
var searchDiv, resultDiv;
var searchId;
var userBookmarks;

function init()
{    
    searchDiv = document.getElementById("search-container")
    resultDiv = document.getElementById("result-container")
    
    resultDiv.style.display = "none";
    
    bk = document.getElementsByClassName('bookmark')[0];
}

function search(param)
{
    if(param === "")
    {
        searchDiv.classList.remove("result");
        resultDiv.style.display = "none";
    }
    else
    {
        searchDiv.classList.add("result");
        resultDiv.style.display = "block";
        document.getElementById("moreButton").style.display = "block";

        if(userBookmarks === undefined)
        {
            getBookmarks();
        }
        
        xhttp = new XMLHttpRequest();
        xhttp.open("GET", urlShort + param, true);
        xhttp.send();

        //TODO: JSON parse
        //TODO: getElement madness
        xhttp.onreadystatechange = function ()
        {
            if (this.readyState == 4 && this.status == 200)
            {
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
            }
        };
    }

}

function searchMore()
{
    xhttp.open("GET", urlFull + searchId, true);
    xhttp.send();

    xhttp.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            var xmlDoc = this.responseXML.getElementsByTagName("movie")[0];

            document.getElementById("plot").innerHTML = xmlDoc.attributes["plot"].nodeValue;
            document.getElementById("moreButton").style.display = "none";
        }
    };
}

function getBookmarks()
{
    xhttpBookmarks = new XMLHttpRequest();
    xhttpBookmarks.open("GET", "http://localhost:8080/bookmarks", true);
    xhttpBookmarks.send();
    xhttpBookmarks.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            let response = JSON.parse(this.response);
            userBookmarks = response;
        }
    }    
}

function setBookmark() {
    if (bk.classList.contains("far")) {
        bk.classList.remove("far");
        bk.classList.add("fas");
    } else {
        bk.classList.remove("fas");
        bk.classList.add("far");
    }

    xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8080/bookmark/"+searchId, true);
    xhttp.send();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            console.log("OK");
        }
    }
}
