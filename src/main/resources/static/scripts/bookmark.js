function oninit() {
    errormsg = document.getElementById('errormsg');
}

$('#mybookmark').ajaxForm({
    url: "/bookmarks",
    success: function(response) {
        document.getElementById('poster').src.style.display = 'block';
    },
    error: function() {
        console.log("error");
    }
})


xhttp = new XMLHttpRequest();
xhttp.open("GET", "http://localhost:8080/bookmark/", true);
xhttp.send();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var xmlDoc = this.responseXML.getElementsByTagName("movie")[0];
        searchId = xmlDoc.attributes["imdbID"].nodeValue;

        console.log(xmlDoc.attributes);
        document.getElementById("poster").src = xmlDoc.attributes["poster"].nodeValue;
        document.getElementById("title").innerHTML = xmlDoc.attributes["title"].nodeValue;
        document.getElementById("plot").innerHTML = xmlDoc.attributes["plot"].nodeValue;

        checkIfBookmarked();
    }
};