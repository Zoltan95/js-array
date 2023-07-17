const emailsSelect = $('.actions select');
const preview = $('#previews');
const addImageButton = $('#addPicture');
const listItemsImage = $('.preview ul li img');
const loadImageButton = document.getElementById("loadImage");
const addEmailButton = document.getElementById("addEmail");
const listOfPicturesBody = document.getElementById("list-of-pictures");
let exists = true;
let err = {};
let myEmails = [];

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

function addOptions() {
    $('.options').remove();
    myEmails.forEach(function(item, index) {
        //console.log(item.email);
        emailsSelect.append(`<option class="options" value="${item.email}">${item.email}</option>`);
    });
}

function emailExists(emailField) {
    exists = true;
    myEmails.forEach(function(item, index) {
        //console.log(item.email);
        if (emailField === item.email) {
            exists = false;
        }      
    });
}

function createEmail() {
    const emailField = $('#email').val();
    emailExists(emailField);
    let re = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    var is_email = re.test(emailField);
    if (emailField === "")
    {
        err.isEmailEmpty = "You must provide an Email Address";
        console.log("You must provide an Email Address");
    }
    else if (!is_email)
    {
        err.isEmail = "Please provide a valid Email Address";
        console.log("Please provide a valid Email Address");
    }
    else if (!exists)
    {
        err.isEmailExists = "Please provide a valid Email Address";
        console.log("Email Already Exists");
    }
    else {
        console.log("Email is Valid");
        email = {
            email : `${emailField}`,
            pictures : []
        };
        myEmails.push(email);
        addOptions();
        createPreview();
    }
}


loadImageButton.addEventListener("click", generateImage);
addEmailButton.addEventListener("click", createEmail);


$(document).ready(function() {
    //Detect that a user has started entering their name itno the name input
    Object.values(err).forEach(val => {
        if (val != "") {
        $("#err_list").append(`<li class='error_msg'>${val}</li>`);
    }});
});

function createPreview() {
    $('.preview').remove();
    myEmails.forEach(function(item, index) {
        //console.log(item.email);
        counter = myEmails[index].pictures;
        preview.append(
        `<div class="preview">
            <h3 class="preview-title">${item.email}</h3>
            <ul id="${index}">
            </ul>
        </div>`
        );
        for (let i = 0; counter.length > i; i++) {
            $(`#${index}`).append(
                `<li><img class="preview-image" onclick="addRemovableClass(this)" src="${counter[i]}" /></li>`
            )
        }
    })
    
}

function addRemovableClass(element) {
    const check = element.classList.contains("delete");
    if (check) {
        element.classList.remove("delete");
    }else {
        element.classList.add("delete");
    }
}

function removePicturesFromEmail() {
    $('.delete').remove();
}

function addPicturesToEmail() {
    if (emailsSelect.val() != "") {
        const img = document.getElementById("img");
        myEmails.forEach(function(item, index) {
            //console.log(item.email);
            if (myEmails[index].email.includes(emailsSelect.val()) === true) {
                myEmails[index].pictures.push(img.src);
                createPreview();
            }
        })
    }
}




//function generateImage(data) {
    //const options = data.map(item => 
        //console.log(item)
       // `<img class="test" src='${item.url}' alt='${item.type}' width="500" height="500">`
    //).join('');
    //listOfPicturesBody.innerHTML = options;
//}