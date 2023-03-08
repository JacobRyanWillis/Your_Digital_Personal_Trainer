

// General Notes

// 

var skillsSelect = document.getElementById("diet");
var selectedTextDiet = skillsSelect.options[skillsSelect.selectedIndex].text;


var intolleranceSelect = document.getElementById("intolerance");
var selectedTextIntollerance = intolleranceSelect.options[intolleranceSelect.selectedIndex].text;



//"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?diet=vegetarian&intolerances=gluten&minCalories=50&maxCalories=800"

var spooge;
var currIndex;

$(".submit_button").on("click", function(event) {
	event.preventDefault();
	var minCalories = $(".min-input").val();
	var maxCalories = $(".max-input").val();
	if (minCalories == "" || maxCalories == "") {
		return;
	} else if (isNaN(minCalories) || isNaN(maxCalories)) {
		return;
	} else {
		spooge = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?diet=" + selectedTextDiet + "&intolerances=" + selectedTextIntollerance + "&minCalories=" + minCalories + "&maxCalories=" + maxCalories;
		const settings = {
			"async": true,
			"crossDomain": true,
			"url": spooge,
			"method": "GET",
			"headers": {
				"X-RapidAPI-Key": "0d7d04e9cemsh2554cf8f16e8e5bp103adejsn5ce9403882f6",
				"X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
			}
		};
		
		$.ajax(settings).done(function (response) {
			currIndex = response.results[0].id;
			getRecipe(currIndex)
		});

		// turn these into functions 
		
		function getRecipe(id) {
			var settings2 = {
				"async": true,
				"crossDomain": true,
				"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + id + "/information",
				"method": "GET",
				"headers": {
					"X-RapidAPI-Key": "0d7d04e9cemsh2554cf8f16e8e5bp103adejsn5ce9403882f6",
					"X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
				}
			};
			
			$.ajax(settings2).done(function (response2) {
				console.log(response2);
				var recipeTitle = $("<h2>").text(response2.title);
				var recipleRealLink = response2.sourceUrl;
				var recipeLink = $('<a href="'+recipleRealLink+'">'+'link to the recipe'+'</a>').appendTo($('body'));
				$(".results").append(recipeTitle);
			});
		}
		
		
	}

})

