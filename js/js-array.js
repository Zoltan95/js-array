
const loadImageButton = document.getElementById("loadImage");
const listOfPicturesBody = document.getElementById("list-of-pictures");

function fetchData(url){
    return fetch(url)
        //.then (data => console.log(data))
        //.then (data => generateImageHTML(data.url, data.type))
}

fetchData("https://picsum.photos/1000/1000")
    .then (data => generateImageHTML(data.url, data.type))

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

loadImageButton.addEventListener("click", generateImage);
//function generateImage(data) {
    //const options = data.map(item => 
        //console.log(item)
       // `<img class="test" src='${item.url}' alt='${item.type}' width="500" height="500">`
    //).join('');
    //listOfPicturesBody.innerHTML = options;
//}