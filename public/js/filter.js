const filterAdventures = async (event) => {
    event.preventDefault();

    const indoor = document.querySelector('#indoors').checked;
    var distance = document.querySelector('#distance').value;
    var time = document.querySelector('#time').value;

    // if undefined set to highest number
    if (distance === "") {
        distance = 10001
    }

    // if undefined set to highest number
    if (time === "") {
        time = 300
    }

    document.location.replace(`/profile/filter/indoor/${indoor}/distance/${distance}/time/${time}`);

};

document
    .querySelector('.filter-form')
    .addEventListener('submit', filterAdventures);


getUserCottesloe()

async function getUserCottesloe() {

    const responseCott = await fetch(`/api/users/cottesloe`);
    const userCottesloe = await responseCott.json();

    console.log(`------------${JSON.stringify(userCottesloe)}-----------`)
    console.log(`-------------${typeof userCottesloe}-----------`)

    if (userCottesloe.dateCompletedRecent === null) {
        document.querySelector('#cottesloe-date').innerHTML = `Not Completed`
    } else {
        document.querySelector('#cottesloe-date').innerHTML = `Last Completed on ${userCottesloe.dateCompletedRecent}`
    }

};

getUserKingspark()

async function getUserKingspark() {

    const responseKings = await fetch(`/api/users/kingspark`);
    const userKingspark = await responseKings.json();


    if (userKingspark.dateCompletedRecent === null) {
        document.querySelector('#kingspark-date').innerHTML = `Not Completed`
    } else {
        document.querySelector('#kingspark-date').innerHTML = `Last Completed on ${userKingspark.dateCompletedRecent}`
    }

};