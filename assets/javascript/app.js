//create an array
var topics = ["Donuts", "Pie", "Cheesecake", "Sugar Cookie", "Ice Cream"];

//function to create & display buttons
function display(){
	//prevent repetition of buttons
	$("#buttons-view").empty();
	//create buttons
	for (var i = 0; i < topics.length; i++) {
		var button = $("<button>");
		button.addClass("dessertButtons");
		button.attr("data-name", topics[i]);
		button.text(topics[i]);
		//Add HTML to page
		$("#buttons-view").append(button);
	}	
};display();

//click function - add to topics array
$("#add-dessert").on("click", function(){
	event.preventDefault();
	var addDessert = $("#dessert-input").val().trim();
	topics.push(addDessert);
	display();
	$("#dessert-input").val('');//clear input field	
});


$(document).on("click", ".dessertButtons", function(){
	event.preventDefault();
	$("#giphy-view").empty();

	var dessert = $(this).attr("data-name");
	console.log(dessert);
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dessert + "&api_key=9d61ec17acd44ffcb89bb6d5c81df41f&limit=10";

	//AJAX request
	$.ajax({
		url: queryURL,
		method: "GET"
	})
	.done(function(response){
		var results = response.data;
		console.log(results);

		for (var j = 0; j < results.length; j++){

			//create variable to hold gifs
			var giphyImage = $("<img>")
				.attr("src", giphyStill)
				.attr("data-state", "still")
				.attr("data-still", giphyStill)
				.attr("data-animate", giphyMoving)
				.addClass("gif");

			var giphyStill = results[j].images.fixed_height_still.url;

			var giphyMoving = results[j].images.fixed_height.url;

			//store rating for each gif
			var rating = results[j].rating;
			//create paragraph to display rating text
			var pRating = $("<p>").text("Rating: " + rating);

			//append to div
			$("#giphy-view").append(giphyImage);
			$("#giphy-view").append(pRating);
		}
	});
});	

$(document).on("click", ".gif", function(){;
	//state function - animate gifs
	var state = $(this).attr("data-state");

	if (state === "still"){
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else{
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
});
