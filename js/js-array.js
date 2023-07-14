const listOfPicturesBody = document.getElementById("list-of-pictures");

window.onload = () => {
    url_string = "https://picsum.photos/v2/list?page=1&limit=100";
    url = new URL(url_string);
    options = url.searchParams.getAll("options[]");
    console.log(options);
};

fetch ('https://picsum.photos/v2/list?page=1&limit=100')
    .then (res => res.json())
    .then (data => listOfPicturesBody = data)