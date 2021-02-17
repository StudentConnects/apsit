// $(document).ready(function () {

//   // FETCHING DATA FROM JSON FILE
//   $.getJSON("company.json",
//     function (data) {
//       var company = '';

//       var buttons =
//         '<button class="btn btn-success btn-fab btn-fab-mini btn-round"
//         onclick="editcompany()">' + '                          <i
//         class="material-icons">edit</i>' + ' </button>' + ' <button
//         class="btn btn-danger btn-fab btn-fab-mini btn-round"
//         onclick="deletecompany()">' + '                          <i
//         class="material-icons">delete</i>' + ' </button>';

//       // ITERATING THROUGH OBJECTS
//       $.each(data, function (key, value) {

//         //CONSTRUCTION OF ROWS HAVING
//         // DATA FROM JSON OBJECT
//         company += '<tr>';
//         company += '<td>' + value.id + '</td>';
//         company += '<td>' + value.company_name + '</td>';
//         company += '<td>' + value.company_desc + '</td>';
//         company += '<td>' + buttons + '</td>';
//         company += '</tr>';
//       });

//       //INSERTING ROWS INTO TABLE
//       $('#company_list').append(company);
//     });
// });
let compList;
// let question_edit = false;

document.getElementById("add_company").addEventListener("click", showmodal);

function showmodal() {
  $("#modalcompany").modal("show");
}
document.getElementById("comapany_add").addEventListener("click", comapany_add);

function comapany_add() {
  let company_name = document.getElementById("company_name").value;
  let company_description = document.getElementById("company_description")
    .value;
  // let company_logo = document.getElementById("company_logo").value;
  // company_logo = "Not yet implemented";
  const fileInput = document.querySelector("#company_logo");
  const formData = new FormData();
  formData.append("file", fileInput.files[0]);
  const options = {
    method: "POST",
    body: formData,
  };
  let isActive = document.querySelector("#isActive").checked ? 1 : 0;

  fetch("/uploadImage", options)
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      // do stuff with `data`, call second `fetch`
      console.log(JSON.stringify(data));

      let company_Infoadd = {
        company_name: company_name,
        company_description: company_description,
        company_logo: data,
        isActive: isActive,
      };

      return fetch("/users/admin/addCompany", {
        method: "POST",
        body: JSON.stringify(company_Infoadd),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    })
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      // do stuff with `data`
      if (!alert("Successfully Added :" + data)) {
        window.location.reload();
      }
    })
    .catch(function (error) {
      console.log("Requestfailed", error);
    });
}

document.addEventListener(
  "DOMContentLoaded",
  function () {
    fetch("/users/admin/listCompanies", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) =>
        response.json().then((text) => {
          if (response.ok) {
            console.log(text);
            append_json(text);
          }
          return response.status;
        })
      )
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  },
  false
);

// this function appends the json data to the table 'company_list'
function append_json(data) {
  compList = data;

  var company = "";
  // ITERATING THROUGH OBJECTS
  $.each(data, function (key, value) {
    // Making Buttons
    var buttons =
      '<button class="btn btn-success btn-fab btn-fab-mini btn-round" onclick="editcompany(this)">' +
      '                          <i class="material-icons">edit</i>' +
      "                        </button>" +
      '                        <button class="btn btn-danger btn-fab btn-fab-mini btn-round" onclick="deletecompany(this)">' +
      '                          <i class="material-icons">delete</i>' +
      "                        </button>";
    // CONSTRUCTION OF ROWS HAVING
    // DATA FROM JSON OBJECT
    company += "<tr>";
    company += "<td>" + (key + 1) + "</td>";
    company += "<td>" + value.name + "</td>";
    company += "<td>" + value.description + "</td>";
    company += "<td>" + buttons + "</td>";
    company += "</tr>";
  });

  // INSERTING ROWS INTO TABLE
  $("#company_list").append(company);
}

function editcompany(x) {
  // company_edit = true;
  let i = x.parentNode.parentNode.rowIndex;
  // console.log(JSON.stringify(compList));
  document.getElementById("company_name").value = compList[i - 1].name;
  document.getElementById("company_description").value =
    compList[i - 1].description;
  showmodal();
}

function deletecompany(x) {
  if (ConfirmDelete()) {
    let i = x.parentNode.parentNode.rowIndex;
    let companyid = compList[i - 1].id;
    let companydata = { id: companyid };

    fetch("/users/admin/disableCompany", {
      method: "DELETE",
      body: JSON.stringify(companydata),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) =>
        response.text().then((text) => {
          console.log(text);
          if (response.ok) {
            if (!alert("Successfully Deleted")) {
              window.location.reload();
            }
          }
          return text;
        })
      )
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  }
}

function ConfirmDelete() {
  var x = confirm("Are you sure you want to delete?");
  if (x) return true;
  else return false;
}
