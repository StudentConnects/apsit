let server = ""

function signup() {

    let fullname = document.getElementById("fullname").value;
    let email = document.getElementById("email").value;
    let mobile = document.getElementById("mobile").value;
    let password = document.getElementById("password").value;

    if (!(isFormEmpty(fullname, email, mobile, password))) {
        if (checkName(fullname)) {
            if (validateEmail(email)) {
                if (checkNumber(mobile)) {
                    if (validatePassword(password)) {
                        submit_details(fullname, email, mobile,  password);
                    }
                }
            }

        }

    }
}

function isFormEmpty(fullname, email, mobile, password) {

    if (fullname.length == 0 || email.length == 0 || mobile.length == 0 || password.length == 0) {
        alert("Fields can't be left empty");
        return true;
    } else {
        if (email.length > 60 || password.length > 1024) {
            alert("Field Value Too Long");
            return true;
        } else {
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

function validatePassword(password) {
    var rpassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

    if (!password.match(rpassword)) {
        alert("Invalid Password!! Password should contain atleast one number and one special character and should be of minimum 8 characters");
        return false;
    }

    return true;

}

function checkNumber(mobile) {
    var MN = /^\d{10}$/;
    if (MN.test(mobile)) {
        return true;
    } else {
        alert("Phone Number Is Not Valid.");
        return false;
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
        } else {
            return true;
        }
    }
}



function submit_details(fullname, email, mobile, password) {

    let _data = {
        fullname : fullname,
        mobile : mobile,
        email : email,
        password : password
    }

    fetch('/register', {
            method: "POST",
            body: JSON.stringify(_data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));
}