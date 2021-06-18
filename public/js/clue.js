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

//function that is invoked if the geolocation is successfully retrieved
async function ifGeoLocationRetrieved(pos) {
    //get user coordinates
    userLat = pos.coords.latitude;
    userLon = pos.coords.longitude;

    //get distance to waypoint
    let distance = await getDistance(userLat, userLon);

    // uncomment following line to bypass distance requirement for testing purposes
    // distance = 10

    if (distance < 20) {
        //DISPLAY SUCCESS MESSAGE
        let path = createNewPath();
        document.location.assign(path)
    } else {
        console.log("Too far from waypoint")
        // DISPLAY DISTANCE
        // DISPLAY FAILURE MESSAGE
    }
};

//what to do if geolocation is unable to be retrieved
function error() {
    console.log(
        "Unable to retrieve geolocation. Please check that you have allowed location services in your browser."
    );
};

async function getDistance(userLat, userLon){
    //construct request route
    let currentPath = window.location.pathname;
    var queryURL = `${currentPath}/location?lat=${userLat}&lon=${userLon}`

    //wait for response then parse body of response into JSON
    const response = await fetch(queryURL);
    return response.json();
};

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
};