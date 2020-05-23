// xhttp = new XMLHttpRequest();
// xhttp.open("GET", "http://localhost:8080/bookmark/", true);
// xhttp.send();
// xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         var xmlDoc = this.responseXML.getElementsByTagName("movie")[0];
//         searchId = xmlDoc.attributes["imdbID"].nodeValue;

//         console.log(xmlDoc.attributes);
//         document.getElementById("poster").src = xmlDoc.attributes["poster"].nodeValue;
//         document.getElementById("title").innerHTML = xmlDoc.attributes["title"].nodeValue;
//         document.getElementById("plot").innerHTML = xmlDoc.attributes["plot"].nodeValue;

//         checkIfBookmarked();
//     }
// };

function getBookmarks() {
    let ul = document.getElementById("movie-list");
    fetch("/userbookmarks").then(function(response){
        return response.json();
    }).then(function(jsonResp){
        jsonResp.forEach(movieID => {
            xhttp = new XMLHttpRequest();
            xhttp.open("GET", 'http://www.omdbapi.com/?apikey=3c976051&plot=small&r=json&i=' + movieID, true);
            xhttp.send();
            xhttp.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200) {
                    let response = JSON.parse(this.response);
                    let li = document.createElement("li");
                    let title = document.createElement("h3");
                    title.innerHTML = response.Title;
                    li.appendChild(title);
                    let poster = document.createElement("img");
                    poster.src = response.Poster;
                    poster.alt = "poster";
                    li.appendChild(poster);
                    let plot = document.createElement("p");
                    plot.innerHTML = response.Plot;
                    li.appendChild(plot);
                    ul.appendChild(li);
                }
            }
        });
    })

    // let xmlHttp = new XMLHttpRequest();
    // xmlHttp.responseType = "json";
    // xmlHttp.open("GET", "/bookmarks", true);
    // xmlHttp.onload = function(){
    //     let resp = xmlHttp.response;
    //     for(movie in resp)
    //         {
    //             console.log(movie.poster);
    //         }
    // }
    // xmlHttp.send(null);
    // xmlHttp.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {
    //         let response = JSON.parse(this.response);
    //         userBookmarks = response;

    //         for(movie in response)
    //         {
    //             console.log(movie.poster);
    //         }

            // if (response) {
            //     var xmlDoc = this.responseXML.getElementsByTagName("movie")[0];

            //     document.getElementById("poster").src = xmlDoc.attributes["poster"].nodeValue;

            // }
    //     }
    // }
}