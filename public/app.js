// $.getJSON("/", function(data) {
//     for (let i = 0; i < data.length; i++) {
//         $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//     }
// });
$(document).ready(function(){

$(".btn-sm").on("click", function(req, res) {
    $.ajax({
        type: "GET",
        url: "/scrape"
    }).then(function(data){
       ; location.reload();
    });
})    

$(document).on("click", ".btn-notes",function() {
    $("#notes").empty();
    const thisId = $(this).attr("data-id");
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
    .then(function(data) {
        console.log(data);
        // $("#" + thisId + "notes").append("<h2>" + data.title + "</h2>");
        $("#" + thisId + "notes").append("<p></p>");
        $("#" + thisId + "notes").append("<input id='titleinput' name='title' >");
        $("#" + thisId + "notes").append("<p></p>");
        $("#" + thisId + "notes").append("<textarea id='bodyinput' name='body'></textarea>");
        $("#" + thisId + "notes").append("<p></p>");
        $("#" + thisId + "notes").append("<button data-id='" + thisId + "' class='btn btn-primary savenote'>Save Note</button>");
        $("#" + thisId + "notes").append("<button data-id='" + thisId + "' class='btn btn-primary savenote'>Close Note</button>");
        if (data.note) {
            $("#titleinput").val(data.note.title);
            $("bodyinput").val(data.note.body);
        }
    });
});

$(".btn-save").on("click", function() {
    let newSavedArticle = $(this).data();
    newSavedArticle.saved = true;
    let thisId = $(this).attr("data-id");
    $.ajax( "/save/" + thisId, {
        type: "PUT",
        data: newSavedArticle
    }).then(function(data){
        location.reload();
    });
});

$(".savenote").on("click", function() {
    console.log("HITT")
    const thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
        }
    })
    .then(function(data) {
        console.log(data);
        
    });

    $("titleinput").val("");
    $("bodyinput").val("");
});




})