const createNewPath = async (event) => {
    event.preventDefault();

    let currentPath = window.location.pathname;
    let pathComponents = currentPath.split('/');
    Adventure = pathComponents[2]
    newPath = `/api/review/${Adventure}`


    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    dateFinished = dd + '/' + mm + '/' + yyyy;


    const response = await fetch(`/api/completion/${Adventure}`, {
        method: 'POST',
        body: JSON.stringify({ dateFinished }),
        headers: { 'Content-Type': 'application/json' },
    });

    document.location.replace(newPath);

};

document
    .querySelector('#completeButton')
    .addEventListener('click', createNewPath);
