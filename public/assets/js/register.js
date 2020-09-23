let server=""
function signup() {

    let fullname = document.getElementById("fullname").value;
    let email = document.getElementById("email").value;
    let mobile = document.getElementById("mobile").value;
    let institute = document.getElementById("institute").value;
    let password = document.getElementById("password").value;

    if (!(isFormEmpty(fullname, email, mobile, institute, password))) {
        if (checkName(fullname)) {
            if (validateEmail(email)) {
                if (checkNumber(mobile)) {
                    submit_details(fullname, email, mobile, institute, password);
                }
            }

        }

    }
}

function isFormEmpty(fullname, email, mobile, institute, password) {

    if (fullname.length == 0 || email.length == 0 || mobile.length == 0 || institute.length == 0, password.length == 0) {
        alert("Fields can't be left empty");
        return true;
    }
    else {
        if (email.length > 60 || institute.length > 60 || password.length > 1024) {
            alert("Field Value Too Long");
            return true;
        }
        else {
            return false;
        }

    }

}

function validateEmail(email) {
    var remail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

    if (!email.match(remail)) {
        alert("Invalid email address");
        return false;
    }

    return true;

}

function checkNumber(mobile) {
    var MN = /^\d{10}$/;
    if (MN.test(mobile)) {
        return true;
    }
    else {
        alert("Phone Number Is Not Valid."); return false;
    }
}

function checkName(fullname) {
    if (fullname.length > 40) {
        alert("Full Name too long, exceeding 40 characters");
        return false;
    } else {
        var regex = new RegExp("^[a-zA-Z ]+$");
        if ((!regex.test(fullname))) {
            alert("Full Name Can Contain Only Alphabets and Spaces");
            return false;
        }
        else {
            return true;
        }
    }
}



function submit_details(fullname, email, mobile, institute, password) {

}

var reader = new FileReader();
reader.onload = function (e) {
    $('#profile_avatar').attr('src', e.target.result);
}
   
   function readURL(input) {
        if (input.files && input.files[0]) {
            reader.readAsDataURL(input.files[0]);
        }
    }
    
    $("#profile_pic").change(function(){
        readURL(this);
    });
