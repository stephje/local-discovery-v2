const nextButton = document.querySelector('#nextButton');

//get a new path then load the page accordingly
nextButton.addEventListener('click', () => {
    let path = createNewPath();
    document.location.assign(path)
});

//Take the current path, split it into components, rebuild it with the last component as the new sequence number
function createNewPath(){
    let currentPath = window.location.pathname;
    let pathComponents = currentPath.split('/');
    let sequenceNumber = Number(pathComponents[3]) + 1;
    let newPath = "";
    for (let i = 1; i < (pathComponents.length - 1); i++) {
        newPath += "/";
        newPath += pathComponents[i];
    }
    newPath = `${newPath}/${sequenceNumber}`
    return newPath;
};