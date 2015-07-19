function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition,showError);
    } else {
        document.getElementById("location").innerHTML = "Geolocation is not supported by this browser.";
    }
}

var x = document.getElementById("location");
var xDisplayError = "You need to be in Thistown Thisstate and allow location tracking to use this site.";

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            hidePage();
            break;
        case error.POSITION_UNAVAILABLE:
            hidePage();
            break;
        case error.TIMEOUT:
            hidePage();
            break;
        case error.UNKNOWN_ERROR:
            hidePage();
            break;
    }
}

function hidePage() {
    document.getElementById("allContents").style.display = "none";
    x.innerHTML = "You need to be in Thistown Thisstate and allow location tracking to use this site.";
}

function showPosition(position) {
  if (position.coords.latitude > 40 && position.coords.latitude < 41 && position.coords.longitude > -74 && position.coords.longitude < -73){
    document.getElementById("location").innerHTML = "In Thistown Thisstate"
    //hidePage();
  } else {
    hidePage();
  }
}

function storeLocal() {
    var email=document.getElementById("email").value;
    var description=document.getElementById("description").value;
    var price=document.getElementById("price").value;
    var score=localStorage.getItem(email + "_!SCORE!_");
    if (score == null) score = 0;
    if (email != ""){
         localStorage.setItem(email.toLowerCase() + "_!POST!_", "<b>" + description + " $" + price + "/hr</b>" + "<br>" + email + "(Reps: " + score + ")");
    }
}

function storeRep() {
    var reppee=document.getElementById("reppee").value;
    var repper=document.getElementById("repper").value;
    var comments=document.getElementById("comments").value;
    var commentChain=localStorage.getItem(reppee + "_!COMMENT!_");
    if (commentChain == null) commentChain = reppee;
    if (repper != ""){
        localStorage.setItem(reppee.toLowerCase() + "_!COMMENT!_", commentChain + "<br>" + "From " + repper + " : " + comments);
        var score = localStorage.getItem(reppee.toLowerCase() + "_!SCORE!_");
        score ++;
        localStorage.setItem(reppee.toLowerCase() + "_!SCORE!_", score);
    }
}

function showJobs() {

    //localStorage.clear();
    var email=document.getElementById("email").value.toLowerCase();
    var output = "Posts are deleted every Sunday: ";
    for (var key in localStorage){
        if (email != "" && key.indexOf(email + "_!POST!_") != -1){
            output = output + "<br><br>" + localStorage.getItem(key);
        }
    }
    document.getElementById("jobs").innerHTML = output;
}

function showReps() {

    //localStorage.clear();
    var output="Rep History:";
    var reppee=document.getElementById("reppee").value;
    for (var key in localStorage){
        if (key.indexOf(reppee + "_!COMMENT!_") != -1){
            output = output + "<br><br>" + localStorage.getItem(key);
        }
    }
    document.getElementById("scores").innerHTML = output;
}

function showSearch() {

    //localStorage.clear();
    var output="Search Results:";
    var query=document.getElementById("searchBox").value.toLowerCase();
    for (var key in localStorage){
        if (localStorage.getItem(key).toLowerCase().indexOf(query) != -1
          &&key.indexOf("_!COMMENT!_") == -1
          &&key.indexOf("_!SCORE!_") == -1 ){
            output = output + "<br><br>" + localStorage.getItem(key);
        }
    }
    document.getElementById("searchResults").innerHTML = output;
}

function post() {
    document.getElementById("search").style.display = "none";
    document.getElementById("post").style.display = "block";
    document.getElementById("rep").style.display = "none";

    document.getElementById("searchResults").style.display = "none";
    document.getElementById("jobs").style.display = "block";
    document.getElementById("scores").style.display = "none";
}

function rep() {
    document.getElementById("search").style.display = "none";
    document.getElementById("post").style.display = "none";
    document.getElementById("rep").style.display = "block";

    document.getElementById("searchResults").style.display = "none";
    document.getElementById("jobs").style.display = "none";
    document.getElementById("scores").style.display = "block";
}

function search() {
    document.getElementById("search").style.display = "block";
    document.getElementById("post").style.display = "none";
    document.getElementById("rep").style.display = "none";

    document.getElementById("searchResults").style.display = "block";
    document.getElementById("jobs").style.display = "none";
    document.getElementById("scores").style.display = "none";
}

function clearPosts() {
  for (var key in localStorage){
      if (key.indexOf("_!POST!_") != -1){
          localStorage.removeItem(key);
      }
  }
}
