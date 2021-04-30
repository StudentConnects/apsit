
document.addEventListener(
    "DOMContentLoaded",
    function () {
      fetch("/users/admin/userdata", {
        method: "GET",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) =>
          response.json().then((text) => {
            if (response.ok) {
              let name = document.getElementById('name')
                name.value = text[0].name
                let mobile = document.getElementById('mobile')
                mobile.value = text[0].mobile
                let city = document.getElementById('city')
                city.value = text[0].city
                let email = document.getElementById('email')
                email.value = text[0].email
                let utype = document.getElementById('utype')
                utype.value = text[0].uType
                let add = document.getElementById('address')
                add.value = text[0].address
                let postal = document.getElementById('postal')
                postal.value = text[0].postalcode
                let country = document.getElementById('country')
                country.value = text[0].country
                console.log(text[0].name);
            }
            return response.status;
          })
        )
        .then((json) => console.log(json))
        .catch((err) => console.log(err));
    },
    false
  );