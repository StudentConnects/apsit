// let questions = 0;
// let question_box;

// document.addEventListener('DOMContentLoaded', function () {
//     fetch('https://6083ad888fc5.ngrok.io/users/admin/listCompanies', {
//             method: "GET",
//             headers: {
//                 "Content-type": "application/json; charset=UTF-8"
//             }
//         })
//         .then(response => response.text().then(text => {
//             console.log(text);
//             return text
//         }))
//         .then(json => console.log(json))
//         .catch(err => console.log(err));
// }, false);

document.addEventListener('DOMContentLoaded', function () {
    fetch('/users/admin/listCompanies', {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json().then(text => {
            if(response.ok){
            let select = document.getElementById("quizCompany");
            let index;
            console.log(text);
            for (index in text) {
                select.options[select.options.length] = new Option(text[index].name, text[index].id);
            }
            $('.selectpicker').selectpicker('refresh');
            }
            return response.status;
        }))
        .then(json => console.log(json))
        .catch(err => console.log(err));
}, false);


document.getElementById("selectQuizCompany").addEventListener("click", () => {
    toggleQuiz();
    quiz_name();
});

document.getElementById("save_questions").addEventListener("click", save_question);
document.getElementById("submit_quiz_btn").addEventListener("click", submit_quiz);

let quizdata = {};
// var active_question;
var edit_index;
var quiz_list = [];
var upload_image;
var question_edit = false;
// function addquestion() {
//     questions++;
//     console.log(questions);
//     let questions_div = document.getElementById('questions');
//     let question_btn = document.createElement("button");
//     question_btn.setAttribute("class", "side_button");
//     question_btn.setAttribute("id", questions);
//     question_btn.setAttribute("name", "questionbox");
//     question_btn.setAttribute("onclick", "question_click(id)");
//     question_btn.innerHTML = ("Question " + questions);
//     questions_div.appendChild(question_btn);

//     question_box = document.getElementsByName("questionbox");
//     console.log(question_box);
// }


// function question_click(id) {
//     let ques_no = document.getElementById("ques_no");
//     ques_no.innerHTML = ("Question " + id);
//     let myform = document.getElementsByTagName("form");
//     myform = myform[0];
// }


// function deletequestion() {
//     if (questions != 0) {
//         questions--;
//         console.log(questions);
//         let question_btns = document.getElementsByClassName("side_button");
//         let question_btn = question_btns[question_btns.length - 1];
//         question_btn.remove();
//         question_box = document.getElementsByName("questionbox");
//     }
// }

// function encodeImageFileAsURL(element) {
//     var file = element.files[0];
//     var reader = new FileReader();
//     reader.onloadend = function () {
//         upload_image = reader.result;
//     }
//     reader.readAsDataURL(file);
// }



var reader = new FileReader();
reader.onload = function (e) {
    $('#upload_questiom').attr('src', e.target.result);
}

function readURL(input) {
    if (input.files && input.files[0]) {
        reader.readAsDataURL(input.files[0]);
        reader.onloadend = function () {
            upload_image = reader.result;
        }
    }
}
$("#image_uploader").change(function () {
    readURL(this);
});

function save_question() {

    // if (document.getElementById("sel_single").checked) {
    //     if ($('input[type=checkbox]:checked').length > 1) {
    //         $(this).prop('checked', false)
    //         return alert("Only Single Select Possible");
    //     }
    // }

    // if (!question_edit) {
    //     active_question = document.getElementById("quiz_table").rows.length;
    //     let ques_no = active_question;
    // } else {
    //     let ques_no = edit_index;
    // }

    let txtarea = document.getElementById("txtarea").value;
    let option_1 = document.getElementById("option_1").value;
    let option_2 = document.getElementById("option_2").value;
    let option_3 = document.getElementById("option_3").value;
    let option_4 = document.getElementById("option_4").value;
    // let answer_type;
    // var radios = document.getElementsByName('usage_commit');
    // for (var i = 0, length = radios.length; i < length; i++) {
    //     if (radios[i].checked) {
    //         answer_type = radios[i].value;
    //         break;
    //     }
    // }

    let answers = [];

    if (document.getElementById("checkbox_1").checked) {
        answers.push('A');
    }
    if (document.getElementById("checkbox_2").checked) {
        answers.push('B');
    }
    if (document.getElementById("checkbox_3").checked) {
        answers.push('C');
    }
    if (document.getElementById("checkbox_4").checked) {
        answers.push('D');
    }


    let quiz_t = {
        upload_image: upload_image,
        question: txtarea,
        option_A: option_1,
        option_B: option_2,
        option_C: option_3,
        option_D: option_4,
        answer: answers
    };

    if (!question_edit) {
        quiz_list.push(quiz_t);
    } else {
        quiz_list.splice(edit_index, 1, quiz_t);
        question_edit = false;
    }


    reset_questionform();
    $(".qOptions").not(":checked").removeAttr('disabled');

    console.log(JSON.stringify(quiz_list));
    upload_image = undefined;
    document.getElementById("image_uploader").value = "";

    quiz_table();
    

}


function quiz_table() {
    $("#quiz_table tbody").empty();
    for (let i = 0; i < quiz_list.length; i++) {

        $("#quiz_table").find('tbody')
            .append($('<tr>')

                .append($('<td>')
                    .attr('class', 'col-sm-10')
                    .text(quiz_list[i].question)
                )
                .append($('<td>')
                    .attr('class', 'col-sm-1')
                    .append($('<button>')
                        .attr('class', 'edit_btn')
                        .attr('onclick', 'edit_btn(this)')
                        .append('<i class="fa fa-edit"></i>')
                    )
                )
                .append($('<td>')
                    .attr('class', 'col-sm-1')
                    .append($('<button>')
                        .attr('class', 'delete_btn')
                        .attr('onclick', 'delete_btn(this)')
                        .append('<i class="fa fa-trash"></i>')
                    )
                )
            );
    }
}

function edit_btn(x) {
    reset_questionform();
    edit_index = x.parentNode.parentNode.rowIndex;
    console.log(edit_index);
    question_edit = true;
    var i = x.parentNode.parentNode.rowIndex;
    console.log(i);
    document.getElementById("txtarea").value = quiz_list[i].question;
    if (quiz_list[i].answer_type == "Single") {
        document.getElementById("sel_single").checked = true;
    } else if (quiz_list[i].answer_type == "Multiple") {
        document.getElementById("sel_multi").checked = true;
    }
    document.getElementById("option_1").value = quiz_list[i].option_A;
    document.getElementById("option_2").value = quiz_list[i].option_B;
    document.getElementById("option_3").value = quiz_list[i].option_C;
    document.getElementById("option_4").value = quiz_list[i].option_D;

    if (quiz_list[i].answer.includes("A")) {
        $('#checkbox_1').prop('checked', true);
    }
    if (quiz_list[i].answer.includes("B")) {
        $('#checkbox_2').prop('checked', true);
    }
    if (quiz_list[i].answer.includes("C")) {
        $('#checkbox_3').prop('checked', true);
    }
    if (quiz_list[i].answer.includes("D")) {
        $('#checkbox_4').prop('checked', true);
    }

}

function delete_btn(x) {
    var i = x.parentNode.parentNode.rowIndex;
    document.getElementById("quiz_table").deleteRow(i);
    quiz_list.splice(i, 1);
}




function reset_questionform() {
    document.getElementById("txtarea").value = "";
    document.getElementById("sel_single").checked = true;
    document.getElementById("option_1").value = "";
    document.getElementById("option_2").value = "";
    document.getElementById("option_3").value = "";
    document.getElementById("option_4").value = "";
    $('#checkbox_1').prop('checked', false);
    $('#checkbox_2').prop('checked', false);
    $('#checkbox_3').prop('checked', false);
    $('#checkbox_4').prop('checked', false);
}


// qOptions

// $('input[type=checkbox]').change(function (e) {
//     var chk_i = 1;
//     if (document.getElementById("sel_multi").checked) {
//         chk_i = 4;
//     } else if (document.getElementById("sel_single").checked) {
//         chk_i = 1;
//     }
//     if ($('input[type=checkbox]:checked').length > chk_i) {
//         $(this).prop('checked', false)
//         alert("Only Single Select Possible");
//     }
// })


$(function() {
    $('input:radio[name="usage_commit"]').change(function() {
        $('#checkbox_1').prop('checked', false);
        $('#checkbox_2').prop('checked', false);
        $('#checkbox_3').prop('checked', false);
        $('#checkbox_4').prop('checked', false);
        $(".qOptions").not(":checked").removeAttr('disabled');
    });
});

$('.qOptions').click(function(){
    let maxAllowed  = 1;
    if (document.getElementById("sel_multi").checked) {
        maxAllowed  = 4;
    } else if (document.getElementById("sel_single").checked) {
        maxAllowed  = 1;
    }
    if ($('.qOptions:checked').length >= maxAllowed) {
      $(".qOptions").not(":checked").attr("disabled",true);
    }
    else 
      $(".qOptions").not(":checked").removeAttr('disabled');
  });


function toggleQuiz() {
    let selectcompany = document.getElementById("selectcompanycontainer");
    let addquestion = document.getElementById("addquestioncontainer");
    selectcompany.classList.toggle("hidden");
    addquestion.classList.toggle("hidden");
}

function quiz_name() {
    let quizCompany = Number(document.getElementById("quizCompany").value);
    let quizName = document.getElementById("quizName").value;
    let quizTime = document.getElementById("quizTime").value;
    let isActive = (document.querySelector('#isActive').checked) ? 1 : 0;
    let quiz_info = {
        quizCompanyId: quizCompany,
        quizName: quizName,
        quizTime: quizTime,
        isActive: isActive
    };
    quizdata['quiz_Info'] = quiz_info;
}


function submit_quiz() {
    quizdata['quiz_Questions'] = quiz_list;
    console.log(JSON.stringify(quizdata));

    fetch('/users/admin/submitQuiz', {
        method: "POST",
        body: JSON.stringify(quizdata),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.text().then(text => {
        console.log(text);
        showmodal(text);
        return text;
    }))
    .then(json => console.log(json))
    .catch(err => console.log(err));


}


function showmodal(msg) {
    document.getElementById("responseMsg").innerHTML = msg;
  $("#modalresponse").modal("show");
}

$('#modalresponse').on('hidden.bs.modal', function () {
    location.reload();
  });

document.getElementById("add_company").addEventListener("click", showmodalcompany);


function showmodalcompany() {
  $("#modalComapnyAdd").modal("show");
}

document.getElementById("comapany_add").addEventListener("click", comapany_add);

    function comapany_add() {
      let company_name = document.getElementById("company_name").value;
      let company_description = document.getElementById("company_description").value;
      let company_logo = document.getElementById("company_logo").value;
      company_logo = "Not yet implemented";
      let company_Infoadd = {
        company_name: company_name,
        company_description: company_description,
        company_logo: company_logo
      };
      fetch('/users/admin/companies', {
        method: "POST",
        body: JSON.stringify(company_Infoadd),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.text().then(text => {
        console.log(text);
        if(!alert('Successfully Added')){window.location.reload();}
        return text;
    }))
    .then(json => console.log(json))
    .catch(err => console.log(err));

    }
