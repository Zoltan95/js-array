const listOfPicturesBody = document.getElementById("list-of-pictures");
let urlMain = "https://picsum.photos/v2/list?page=2&limit=100";

fetch (urlMain)
    .then (res => res.json())
    .then (data => generateImages(data))

function generateImages(data) {
    const options = data.map(item => 
        //console.log(item)
        `<img class="test" src='${item.download_url}' alt='${item.author}' width="500" height="500">`
    ).join('');
    listOfPicturesBody.innerHTML = options;
}