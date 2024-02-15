function search(){
    document.getElementById("log").innerHTML += "<br>[JS] Loaded Variables";
    var searchenginesJSON = {
        "google":{"location": "https://www.google.com/search?q="},
        "duckduckgo":{"location": "https://duckduckgo.com/?q="},
        "seznam":{"location": "https://search.seznam.cz/?q="},
        "brave":{"location": "https://search.brave.com/search?q="}
        };
   
        console.log(searchenginesJSON);
        var path = searchenginesJSON[engine].location + query;
        document.getElementById("log").innerHTML += "<br>[Redirect Path] " +path;
        document.getElementById("log").innerHTML += "<br>Redirecting...";

   
    window.location.replace(path);
  }