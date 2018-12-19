//Initializes googles api, needs a call back function to actually work
function initAutocomplete() {
  var input = document.getElementById("locationSearch");
  new google.maps.places.Autocomplete(input);

  // var input = document.getElementById("restName");
  // new google.maps.places.Autocomplete(input);
  // console.log(input);
  // var restaurantAddress = document.getElementById("Address");
  // new google.maps.places.Autocomplete(restaurantAddress);
  // console.log(restaurantAddress);
}

// function initAutocomplete(){
//   var input = document.getElementById("restName");
//   new google.maps.places.Autocomplete(input);
//   console.log(input);
// }

//google.maps.event.addDomListener(window, "load", initialize);
//google.maps.event.addListener(window, "load", initialize);

function previewFile() {
  var preview = document.querySelector("img"); //selects the query named img
  var file = document.querySelector("input[type=file]").files[0]; //sames as here
  var reader = new FileReader();

  reader.onloadend = function() {
    preview.src = reader.result;
    console.log("First one :" + reader.result);
  };

  if (file) {
    reader.readAsDataURL(file); //reads the data as a URL
    console.log("Second: " + reader.readAsDataURL(file));
  } else {
    preview.src = "";
  }
}

previewFile(); //calls the function named previewFile()

// Initializes googles api, needs a call back function to actually work

var popDishes = [
  {
    Image: "./assets/images/i1.png",
    dName: "mango cakes",
    restauraunt: "Kung Fu Tea",
    rating: 5
  },
  {
    Image: "./assets/images/i1.png",
    dName: "Pho",
    restauraunt: "Pho 24",
    rating: 5
  }
];

for (var i = 0; i < popDishes.length; i++) {
  var picSection = document.getElementById("popDishes");
  var foodPics = document.createElement("IMG");
  foodPics.setAttribute("src", popDishes[i].Image);
  foodPics.className += "card-img-top popDishesImage";
  var foodName = document.createElement("h6");
  foodName.className += "card-title text-dark";
  var foodNameName = document.createTextNode("Menu Item");
  foodName.appendChild(foodNameName);
  var foodNameContent = document.createElement("p");
  // var foodNameWords = document.createTextNode(popDishes[i].dName);
  foodNameContent.className += "dataReturn";
  foodNameContent.innerHTML = popDishes[i].dName;
  var foodRating = document.createElement("h6");
  var foodRatingRating = document.createTextNode("Rating");
  foodRating.className += "card-title text-dark";
  foodRating.appendChild(foodRatingRating);
  var foodRatingContent = document.createElement("p");
  // var foodRatingWords = document.createTextNode(popDishes[i].rating);
  foodRatingContent.className += "dataReturn";
  foodRatingContent.innerHTML = popDishes[i].rating;
  var foodRest = document.createElement("h6");
  foodRest.className += "card-title text-dark";
  var foodRestRest = document.createTextNode("Restauraunt");
  foodRest.appendChild(foodRestRest);
  foodRestaurauntContent = document.createElement("p");
  // foodRestaurauntWords = document.createTextNode(popDishes[i].restauraunt);
  foodRestaurauntContent.className += "dataReturn";
  foodRestaurauntContent.innerHTML = popDishes[i].restauraunt;

  var foodCardIMG = document.createElement("div");
  var foodCardBody = document.createElement("div");
  foodCardBody.className += "card-body";
  foodCardIMG.className += "card col-4";
  foodCardIMG.appendChild(foodPics);
  foodCardBody.appendChild(foodName);
  foodCardBody.appendChild(foodNameContent);
  foodCardBody.appendChild(foodRating);
  foodCardBody.appendChild(foodRatingContent);
  foodCardBody.appendChild(foodRest);
  foodCardBody.appendChild(foodRestaurauntContent);
  foodCardIMG.appendChild(foodCardBody);
  picSection.appendChild(foodCardIMG);
}

$("#searchBtn").on("click", function() {
  document.getElementById("popDishes").style.display = "none";
  document.getElementById("popDishesHeader").style.display = "none";
  document.getElementById("card1").style.display = "none";

  document.getElementById("searchDishes").style.visibility = "visible";
  document.getElementById("searchDishesHeader").style.visibility = "visible";
  document.getElementById("card2").style.visibility = "visible";

  var location = document.getElementById("locationSearch").value;
  var dish = document.getElementById("foodSearch").value;

  locationarray = location.split(",");
  console.log(locationarray);
  // locationarray = locationarray.reverse();
  // console.log(locationarray);
  // var country = locationarray[0];
  // var state = locationarray[1];
  // var city = locationarray[2];

  // console.log("Country: "+country);
  // console.log("State: "+state);
  // console.log("City: "+city);

  var queryURL =
    "https://openmenu.com/api/v2/search.php?" +
    "key=498456f1-0156-11e9-8d62-525400552a35&s=" +
    dish +
    "&" +
    "postal_code=" +
    location +
    "&city=&country=US";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var data = response.response.result;
    console.log(data);

    for (var i = 0; i < data.items.length; i++) {
      var responseDiv = document.getElementById("searchDishes");

      var responseDataBigDiv = document.createElement("div");
      responseDataBigDiv.style.width = "100%";
      responseDataBigDiv.className = "bigDiv";

      var responseDataLeft = document.createElement("div");
      responseDataLeft.className += "innerDivs";
      responseDataLeft.style.width = "40%";
      var responseRest = document.createElement("h4");
      var responseRestWords = document.createTextNode(
        data.items[i].restaurant_name
      );
      responseRest.appendChild(responseRestWords);

      var responseDataPic = document.createElement("IMG");
      responseDataPic.setAttribute("src", "https://via.placeholder.com/150");

      responseDataLeft.appendChild(responseRest);
      responseDataLeft.appendChild(responseDataPic);

      var responseDataRight = document.createElement("div");
      responseDataRight.className = "innerDivs";
      responseDataRight.style.width = "40%";

      var responseDishName = document.createElement("h4");
      var responseDishNameWords = document.createTextNode(
        data.items[i].menu_item_name
      );
      responseDishName.appendChild(responseDishNameWords);

      var responseRestWebsite = document.createElement("a");
      responseRestWebsite.setAttribute("href", data.items[i].website_url);
      responseRestWebsite.setAttribute("target", "_blank");
      var responseRestWebsiteLink = document.createTextNode("Website");
      responseRestWebsite.appendChild(responseRestWebsiteLink);

      var responseRestMenu = document.createElement("a");
      responseRestMenu.setAttribute("href", "www.google.com");
      responseRestMenu.setAttribute("target", "_blank");
      var responseRestMenuLink = document.createTextNode("Menu");
      responseRestMenu.appendChild(responseRestMenuLink);

      var responseRestRating = document.createElement("h4");
      var responseRestRatingNum = document.createTextNode("5 Stars");
      responseRestRating.appendChild(responseRestRatingNum);

      responseDataRight.appendChild(responseDishName);
      responseDataRight.appendChild(responseRestWebsite);
      responseDataRight.appendChild(responseRestMenu);
      responseDataRight.appendChild(responseRestRating);

      responseDataBigDiv.appendChild(responseDataLeft);
      responseDataBigDiv.appendChild(responseDataRight);

      responseDiv.appendChild(responseDataBigDiv);
    }
  });
});
