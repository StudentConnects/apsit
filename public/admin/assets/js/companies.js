// $(document).ready(function () {

    //   // FETCHING DATA FROM JSON FILE
    //   $.getJSON("company.json",
    //     function (data) {
    //       var company = '';

    //       var buttons =
    //         '<button class="btn btn-success btn-fab btn-fab-mini btn-round" onclick="editcompany()">' +
    //         '                          <i class="material-icons">edit</i>' +
    //         '                        </button>' +
    //         '                        <button class="btn btn-danger btn-fab btn-fab-mini btn-round" onclick="deletecompany()">' +
    //         '                          <i class="material-icons">delete</i>' +
    //         '                        </button>';

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

    document
      .getElementById("add_company")
      .addEventListener("click", showmodal);

    function showmodal() {
      $("#modalcompany").modal("show");
    }
    document
      .getElementById("comapany_add")
      .addEventListener("click", comapany_add);

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



      fetch('/uploadImage', options)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // do stuff with `data`, call second `fetch`
          
          let company_Infoadd = {
            company_name: company_name,
            company_description: company_description,
          };

          return fetch("/users/admin/companies", {
            method: "POST",
            body: JSON.stringify(company_Infoadd),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          });
        })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // do stuff with `data`
          if (!alert("Successfully Added "+data)) {
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

    //this function appends the json data to the table 'company_list'
    function append_json(data) {
      var company = "";

      var buttons =
        '<button class="btn btn-success btn-fab btn-fab-mini btn-round" onclick="editcompany()">' +
        '                          <i class="material-icons">edit</i>' +
        "                        </button>" +
        '                        <button class="btn btn-danger btn-fab btn-fab-mini btn-round" onclick="deletecompany()">' +
        '                          <i class="material-icons">delete</i>' +
        "                        </button>";

      // ITERATING THROUGH OBJECTS
      $.each(data, function (key, value) {
        //CONSTRUCTION OF ROWS HAVING
        // DATA FROM JSON OBJECT
        company += "<tr>";
        company += "<td>" + value.id + "</td>";
        company += "<td>" + value.name + "</td>";
        company += "<td>" + value.company_desc + "</td>";
        company += "<td>" + buttons + "</td>";
        company += "</tr>";
      });

      //INSERTING ROWS INTO TABLE
      $("#company_list").append(company);
    }