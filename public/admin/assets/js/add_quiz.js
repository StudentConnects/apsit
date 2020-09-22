// let questions = 0;
// let question_box;
var active_question;
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

    if(document.getElementById("sel_single").checked){
        if ($('input[type=checkbox]:checked').length > 1) {
            $(this).prop('checked', false)
            return alert("Only Single Select Possible");
            
       }
    }

    if (!question_edit) {
        active_question = document.getElementById("quiz_table").rows.length;
        let ques_no = active_question;
    } else {
        let ques_no = edit_index;
    }

    let txtarea = document.getElementById("txtarea").value;
    let time_limit = document.getElementById("time_limit").value;
    let option_1 = document.getElementById("option_1").value;
    let option_2 = document.getElementById("option_2").value;
    let option_3 = document.getElementById("option_3").value;
    let option_4 = document.getElementById("option_4").value;
    let answer_type;
    var radios = document.getElementsByName('usage_commit');
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            answer_type = radios[i].value;
            break;
        }
    }
    let checkbox_1 = document.getElementById("checkbox_1").checked;
    let checkbox_2 = document.getElementById("checkbox_2").checked;
    let checkbox_3 = document.getElementById("checkbox_3").checked;
    let checkbox_4 = document.getElementById("checkbox_4").checked;
    let quiz_t = {
        question_no: ques_no,
        upload_image: upload_image,
        question: txtarea,
        time_limit: time_limit,
        answer_type: answer_type,
        option_1: option_1,
        option_2: option_2,
        option_3: option_3,
        option_4: option_4,
        answer: {
            checkbox_1,
            checkbox_2,
            checkbox_3,
            checkbox_4
        }

    };

    if (!question_edit) {
        quiz_list.push(quiz_t);
    } else {
        quiz_list.splice(edit_index, 1, quiz_t);
        question_edit = false;
    }


    reset_questionform();

    console.log(JSON.stringify(quiz_list));
    upload_image = undefined;
    document.getElementById("image_uploader").value = "";

    quiz_table();


}


function quiz_table() {
    $("#quiz_table tbody").empty();
    for (i = 0; i < quiz_list.length; i++) {

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
    edit_index = x.parentNode.parentNode.rowIndex;
    question_edit = true;
    var i = x.parentNode.parentNode.rowIndex;
    document.getElementById("txtarea").value = quiz_list[i].question;
    document.getElementById("time_limit").value = quiz_list[i].time_limit;
    if (quiz_list[i].answer_type == "Single") {
        document.getElementById("sel_single").checked = true;
    } else if (quiz_list[i].answer_type == "Multiple") {
        document.getElementById("sel_multi").checked = true;
    }
    document.getElementById("option_1").value = quiz_list[i].option_1;
    document.getElementById("option_2").value = quiz_list[i].option_2;
    document.getElementById("option_3").value = quiz_list[i].option_3;
    document.getElementById("option_4").value = quiz_list[i].option_4;
    $('#checkbox_1').prop('checked', quiz_list[i].answer.checkbox_1);
    $('#checkbox_2').prop('checked', quiz_list[i].answer.checkbox_2);
    $('#checkbox_3').prop('checked', quiz_list[i].answer.checkbox_3);
    $('#checkbox_4').prop('checked', quiz_list[i].answer.checkbox_4);

}

function delete_btn(x) {
    var i = x.parentNode.parentNode.rowIndex;
    document.getElementById("quiz_table").deleteRow(i);
    quiz_list.splice(i, 1);
}




function reset_questionform() {
    document.getElementById("txtarea").value = "";
    document.getElementById("time_limit").value = "";
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




$('input[type=checkbox]').change(function(e){
    var chk_i = 1;
    if(document.getElementById("sel_multi").checked){
        chk_i = 4;
    }else if(document.getElementById("sel_single").checked){
        chk_i = 1;
    }
    if ($('input[type=checkbox]:checked').length > chk_i) {
         $(this).prop('checked', false)
         alert("Only Single Select Possible");
    }
 })