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

    //Get Cottesloe USer data
    const responseCott = await fetch(`/api/users/cottesloe`);
    const userCottesloe = await responseCott.json();


    //Show Date
    if (userCottesloe.dateCompletedRecent === null) {
        document.querySelector('#cottesloe-date').innerHTML = `<b>Not Completed</b>`
    } else {
        document.querySelector('#cottesloe-date').innerHTML = `<b>Last Completed:</b> ${userCottesloe.dateCompletedRecent}`
    }

    //get progress
    var progress = Math.round(userCottesloe.sequence / 8 * 100);

    if (userCottesloe.sequence <= 0.125) {
        document.querySelector(`#cottesloe-progress`).innerHTML = "0%"

    } else {
        document.querySelector(`#cottesloe-bar`).innerHTML = `${progress}%`
        document.querySelector(`#cottesloe-bar`).style.width = `${progress}%`;
    }
};

getUserKingspark()

async function getUserKingspark() {

    const responseKings = await fetch(`/api/users/kingspark`);
    const userKingspark = await responseKings.json();

    //Show Date
    if (userKingspark.dateCompletedRecent === null) {
        document.querySelector('#kingspark-date').innerHTML = `<b>Not Completed</b>`
    } else {
        document.querySelector('#kingspark-date').innerHTML = `<b>Last Completed:</b> ${userKingspark.dateCompletedRecent}`
    }

    //get progress
    var progress = Math.round(userKingspark.sequence / 28 * 100);

    if (userKingspark.sequence <= 0.125) {
        document.querySelector(`#kingspark-progress`).innerHTML = "0%"

    } else {
        document.querySelector(`#kingspark-bar`).innerHTML = `${progress}%`
        document.querySelector(`#kingspark-bar`).style.width = `${progress}%`;
    }
};