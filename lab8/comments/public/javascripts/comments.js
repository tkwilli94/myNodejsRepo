$(document).ready(function(){
    $("#serialize").click(function(){
        var myobj = {Name:$("#Name").val(),Comment:$("#Comment").val()};
        jobj = JSON.stringify(myobj);
        $("#json").text(jobj);
   
	var url = "comment";
	$.ajax({
	    url: url,
	    type: "POST",
	    data: jobj,
	    contentType: "application/json; charset=utf-8",
	    success: function(data,textStatus) {
	        $("#done").html(textStatus);
	    }
	});
    });
    $("#addQuote").click(function() {
	var myobj = {Quote:$("#Quote").val()}
	jobj = JSON.stringify(myobj);
	$("#added").text(jobj);
	var url = "quote";
	$.ajax({
	   url: url,
	    type: "POST",
	    data: jobj,
	    contentType: "application/json; charset=utf-8"
	});
    });
    $("#getThem").click(function() {
        $.getJSON('comment', function(data) {
            console.log("Comment Data!: " + data);
            var everything = "<p>Current Comments!</p><ul>";
            for(var comment in data) {
                com = data[comment];
                everything += "<li>Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
            }
            everything += "</ul>";
            $("#comments").html(everything);
        });
	
    });
    $("#getRandQuote").click(function() {
	$.getJSON('quote', function(data) {
	    var everything = "<p>";
	    var myRandom = Math.floor(Math.random() * (data.length));
	    while (myRandom < 2) {
		myRandom = Math.floor(Math.random() * (data.length));
	    }
	    console.log("THIS IS MY data size!!: " + data.length);
	    com = data[myRandom];
	    everything += "Your Random Quote: \"" + com.Quote + "\"</p>";
	    console.log("Quote Data!: " + everything);
	    $("#added").html(everything);
	});
    });
});
