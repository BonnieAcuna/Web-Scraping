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
    

$(document).on("click", "p", function() {
    $("#notes").empty();
    const thisId = $(this).attr("data-id");
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
    .then(function(data) {
        console.log(data);
        $("#notes").append("<h2>" + data.title + "</h2>");
        $("#notes").append("<input id='titleinput' name='title' >");
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea");
        $("#notes").append("<button data-id='" + data_id + "' id='savenote'>Save Note</button>");
        
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

$(document).on("click", "savenote", function() {
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

// $(".btn-save").on("click", function() {
    
// })

})