//Initializes googles api, needs a call back function to actually work
function initAutocomplete() {
  var input = document.getElementById("locationSearch");
  new google.maps.places.Autocomplete(input);
  console.log(input);
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



function previewFile(){
  var preview = document.querySelector('img'); //selects the query named img
  var file    = document.querySelector('input[type=file]').files[0]; //sames as here
  var reader  = new FileReader();
  console.log(file);


  reader.onloadend = function () {
      preview.src = reader.result;
      console.log("First one :"+reader.result);
  }

  if (file) {
      reader.readAsDataURL(file); //reads the data as a URL
      console.log("Second: "+reader.readAsDataURL(file));
  } else {
      preview.src = "";
  }
}

previewFile();  //calls the function named previewFile()


// Initializes googles api, needs a call back function to actually work

var popDishes = [
  {
    Image: "./assets/images/i1.png",
    dName: "mango cakes",
    restauraunt: "Kung Fu Tea",
    rating: 5
  },
  {
    Image: "./assets/images/i2.png",
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
  console.log(foodName);
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


