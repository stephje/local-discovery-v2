const reviewAdventures = async (event) => {
    event.preventDefault();

    var ratingDescription = document.querySelector('#ratingDescription').value;
    var ratingInput1 = document.querySelector('#ratingInput1').value;
    var ratingInput2 = document.querySelector('#ratingInput2').value;
    var ratingInput3 = document.querySelector('#ratingInput3').value;
    var ratingInput4 = document.querySelector('#ratingInput4').value;
    var ratingInput5 = document.querySelector('#ratingInput5').value;

    var finalRating = 0;

    if (document.getElementById('ratingInput1').checked) {
        finalRating = document.getElementById('ratingInput1').value;
    } else if (document.getElementById('ratingInput2').checked) {
        finalRating = document.getElementById('ratingInput2').value;
    } else if (document.getElementById('ratingInput3').checked) {
        finalRating = document.getElementById('ratingInput3').value;
    } else if (document.getElementById('ratingInput4').checked) {
        finalRating = document.getElementById('ratingInput4').value;
    } else if (document.getElementById('ratingInput5').checked) {
        finalRating = document.getElementById('ratingInput5').value;
    }

    if (ratingDescription && finalRating != 0) {
        const response = await fetch('/api/review/cottesloe', {
            method: 'POST',
            body: JSON.stringify({ ratingDescription, finalRating }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            document.location.replace('/profile');
        }
    }
};

document
    .querySelector('.review-form')
    .addEventListener('submit', reviewAdventures);

