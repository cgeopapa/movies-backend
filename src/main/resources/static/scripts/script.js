const xhttp = new XMLHttpRequest();
const urlShort = 'http://www.omdbapi.com/?apikey=3c976051&plot=short&r=xml&t='
const urlFull = 'http://www.omdbapi.com/?apikey=3c976051&plot=full&r=xml&i='
var searchDiv, resultDiv;
var searchId;

function init()
{
    searchDiv = document.getElementById("search-container")
    resultDiv = document.getElementById("result-container")

    resultDiv.style.display = "none";
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

        xhttp.open("GET", urlShort + param, true);
        xhttp.send();

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
