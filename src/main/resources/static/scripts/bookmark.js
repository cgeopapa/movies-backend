//get all user bookmarks and display them in the list
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

}