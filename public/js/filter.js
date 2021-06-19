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

