
const loadImageButton = document.getElementById("loadImage");
const addEmailButton = document.getElementById("addEmail");
const listOfPicturesBody = document.getElementById("list-of-pictures");
let array = [];

function fetchData(url){
    return fetch(url)
        .then(checkStatus)
        //.then(res => res.json())
        .catch(error => console.log('Looks like there was a problem', error))
        //.then (data => console.log(data))
}

fetchData("https://picsum.photos/1000/1000")
    .then (data => generateImageHTML(data.url, data.type))

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function generateImageHTML(dataUrl, dataType) {
    const html = 
    `<img class="test" id="img" src='${dataUrl}' alt='${dataType}' width="500" height="500">`
    ;
    listOfPicturesBody.innerHTML = html;
}

function generateImage() {
    const img = document.getElementById("img");
    fetchData("https://picsum.photos/1000/1000")
        .then (data => {
            img.src = data.url;
            img.alt = data.type;
        })
}

function createEmail() {
    let emailField = $('#email').val();
    const imgSrc = document.getElementById("img");
    email = {
        email: `${emailField}`,
        pictures: {}
    };
    array.push(email);
}

loadImageButton.addEventListener("click", generateImage);
addEmailButton.addEventListener("click", createEmail);






//function generateImage(data) {
    //const options = data.map(item => 
        //console.log(item)
       // `<img class="test" src='${item.url}' alt='${item.type}' width="500" height="500">`
    //).join('');
    //listOfPicturesBody.innerHTML = options;
//}