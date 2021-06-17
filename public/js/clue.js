// const { json } = require("sequelize/types");

const checkInButton = document.querySelector("#checkInButton");

checkInButton.addEventListener('click', () => {

    //option for getLocation function, prioritizes accuracy over speed
    const options = {
        enableHighAccuracy: true,
    };

    //get user's geolocation
    navigator.geolocation.getCurrentPosition(
        ifGeoLocationRetrieved,
        error,
        options
    );

});

async function fetchWaypointCoordinates(){
    //construct request route
    let currentPath = window.location.pathname;
    var queryURL = `${currentPath}/location`

    //wait for response then parse body of response into JSON
    const response = await fetch(queryURL);
    let location = await response.json();

    //return object containing lat and longitude
    return location;

}

//function that is invoked if the geolocation is successfully retrieved
async function ifGeoLocationRetrieved(pos) {
    //get user coordinates
    userLat = pos.coords.latitude;
    userLon = pos.coords.longitude;

    // console.log("User lat:", userLat, "User lon:", userLon)

    //get waypoint coordinates
    waypointCoordinates = await fetchWaypointCoordinates();
    waypointLat = waypointCoordinates.latitude;
    waypointLon = waypointCoordinates.longitude;

    // console.log("Waypoint Coordinates:", waypointCoordinates);
    // console.log("Waypoint lat:", waypointLat, "Waypoint lon:", waypointLon);

    let distance = await checkDistanceToObject(userLat, userLon, waypointLat, waypointLon);
    distance = Number(distance);
    console.log("distance", distance);

    // to bypass distance requirement for testing
    // distance = 10

    if (distance < 20) {
        //DISPLAY SUCCESS MESSAGE
        let path = createNewPath();
        document.location.assign(path)
    } else {
        // DISPLAY DISTANCE
        // DISPLAY FAILURE MESSAGE
    }
}

//check the distance between user's coordinates and waypoint coordinates
async function checkDistanceToObject(userLat, userLon, waypointLat, waypointLon) {
  
    var userCoords = new google.maps.LatLng(userLat, userLon);
    var waypointCoords = new google.maps.LatLng(waypointLat, waypointLon);

    //get distance in metres
    distanceMetres = google.maps.geometry.spherical.computeDistanceBetween(
        userCoords,
        waypointCoords
      );

      return(distanceMetres);
  
  }


//what to do if geolocation is unable to be retrieved
function error() {
    console.log(
        "Unable to retrieve geolocation. Please check that you have allowed location services in your browser."
    );
}

//Take the current path, split it into components, rebuild it with the last component as the new sequence number
function createNewPath() {
    let currentPath = window.location.pathname;
    let pathComponents = currentPath.split('/');
    let nextSequenceNumber = Number(pathComponents[3]) + 1;
    let newPath = "";
    for (let i = 1; i < (pathComponents.length - 1); i++) {
        newPath += "/";
        newPath += pathComponents[i];
    }
    newPath = `${newPath}/${nextSequenceNumber}`
    return newPath;
};

function getNextSequenceNumber() {
    let currentPath = window.location.pathname;
    let pathComponents = currentPath.split('/');
    let nextSequenceNumber = Number(pathComponents[3]) + 1;
    return nextSequenceNumber;
}