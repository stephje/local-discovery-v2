//get a new path then load the page accordingly
document.querySelector('.completeButton').addEventListener('click', () => {
    let path = createNewPath();
    document.location.assign(path)
});

//Take the current path, split it into components, rebuild it with the last component as the new sequence number
function createNewPath() {
    let currentPath = window.location.pathname;
    let pathComponents = currentPath.split('/');

    newPath = `/api/review/${pathComponents[2]}`
    return newPath;
};