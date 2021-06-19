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

ContinueViaSequence()

document
    .querySelector('.filter-form')
    .addEventListener('submit', filterAdventures);

// Sequence replace link code with api fetch GET request
async function ContinueViaSequence() {
    try {
        const response = await fetch('/api/users/sequence', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(`-------response is ${JSON.stringify(response.body.sequence)}-----------`);
        console.log(`-------response is ${response.sequence}-----------`);

        document.querySelector('#tests').innerHTML = 'Goodbye';

    } catch (err) {
        res.status(500).json(err);
    };
}


// router.get('/', async (req, res) => {
//     try {
//       const CatergoryData = await Category.findAll({
//         include: [Product]
//       });
//       res.status(200).json(CatergoryData);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

