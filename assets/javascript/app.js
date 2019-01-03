// Initializes googles api, needs a call back function to actually work

var config = {
  apiKey: "AIzaSyArNQT58RZZlGdldWz0gn0nNP_ScY0x-ec",
  authDomain: "betteryelp.firebaseapp.com",
  databaseURL: "https://betteryelp.firebaseio.com",
  projectId: "betteryelp",
  storageBucket: "betteryelp.appspot.com",
  messagingSenderId: "591207251472"
};
firebase.initializeApp(config);

var database = firebase.database();

var button = document.getElementById("uploadImg");

var searchbutton = document.getElementById("searchBtn");

var image = "";

var popDishes = [
  {
    Image: "./assets/images/i1.png",
    dName: "Grandma Slice",
    restauraunt: "Lucali's",
    rating: 5
  },
  {
    Image: "./assets/images/pho.jpg",
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

// Code for google api and upload image goes here

//Initializes googles api, needs a call back function to actually work
function initAutocomplete() {
  var input = document.getElementById("locationSearch");
  new google.maps.places.Autocomplete(input);
  console.log(input);
}

function previewFile() {
  var preview = document.querySelector("img"); //selects the query named img
  var file = document.querySelector("input[type=file]").files[0]; //sames as here
  var reader = new FileReader();
  console.log(file);

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

previewFile();

button.onclick = function() {
  var dishname = document.getElementById("dish").value.trim();
  console.log(dishname);
  var restname = document.getElementById("Restaurant").value.trim();
  console.log(restname);
  var add = document.getElementById("Address").value.trim();
  console.log(add);
  var dateadded = moment().format("MM/DD/YYYY");
  console.log(dateadded);
  var rating = document.getElementById("rating").value;
  console.log(rating);

  var food = {
    foodname: dishname,
    Restaurant: restname,
    Address: add,
    lastmodate: dateadded
  };

  database.ref().push(food);

  console.log(food.foodname);
  console.log(food.Restaurant);
  console.log(food.Address);
  console.log(food.lastmodate);

  document.getElementById("dish").value = "";
  document.getElementById("Restaurant").value = "";
  document.getElementById("Address").value = "";

  var file = previewFile();
  console.log("file2", file);

  const storage = firebase.storage();
  const storageref = storage.ref();
  const searchRef = storageref.child("uploads");
  const filename = file.name;
  const fileRef = searchRef.child(filename);

  // console.log('image', file)

  fileRef.put(file).then(snapshot => {
    // this.getVisionAPIResults(snapshot)
    console.log(snapshot);
  });
};

// database.ref().on("click", function(snapshot) {
//     // We are now inside our .on function...

//     // Console.log the "snapshot" value (a point-in-time representation of the database)
//     console.log(snapshot.val());
//     // This "snapshot" allows the page to get the most current values in firebase.

//   // If any errors are experienced, log them to console.
//   }, function(errorObject) {
//     console.log("The read failed: " + errorObject.code);
//   });

var searchbutton = document.getElementById("searchBtn");

searchbutton.onclick = function() {
  var location = document.getElementById("locationSearch").value;
  var locationInt = parseInt(location);
  var locSearch = location.search(",");
  console.log(locSearch);

  console.log(locationInt);

  if (Number.isInteger(parseInt(locSearch))) {
    locationarray = location.split(",");
    console.log(locationarray);
    locationarray = locationarray.reverse();
    console.log(locationarray);

    var country = locationarray[0];
    var city = locationarray[2].trim();
    var patt1 = /[0-9]/g;
    var zip = locationarray[1].match(patt1);
    console.log(zip);

    if (Number.isInteger(parseInt(zip))) {
      var stateAdd = locationarray[1].trim().split(" ");
      console.log(stateAdd);
      var state = stateAdd[0].trim();
      var zipcode = stateAdd[1].trim();

      console.log("Country: " + country);
      console.log("State: " + state);
      console.log("City: " + city);
      console.log("Zipcode: " + zipcode);
    } else {
      var state = locationarray[1].trim();
      var zipcode = "";
      console.log("Country: " + country);
      console.log("State: " + state);
      console.log("City: " + city);
      console.log("Zipcode: " + zipcode);
    }
  } else if (Number.isInteger(locationInt)) {
    var zipcode = locationInt;
    console.log("Zipcode: " + zipcode);
  }

  var dishsearch = document.getElementById("foodSearch").value.trim();

  console.log(dishsearch);

  // database.ref().on("value", function(snapshot) {
  //     // We are now inside our .on function...
  var firebaseurl =
    "https://firebasestorage.googleapis.com/v0/b/betteryelp.appspot.com/o/uploads%2F" +
    name +
    "?alt=media";
  //     // Console.log the "snapshot" value (a point-in-time representation of the database)
  //     console.log(snapshot.val());
  //     // This "snapshot" allows the page to get the most current values in firebase.

  //   // If any errors are experienced, log them to console.
  //   }, function(errorObject) {
  //     console.log("The read failed: " + errorObject.code);
  //   });

  var ref = firebase.database().ref();

  //console.log(ref);
  ref
    .orderByChild("foodname")
    .equalTo(dishsearch)
    .on("value", function(snapshot) {
      console.log(snapshot.val());

      console.log(Object.values(snapshot.val()));

      var firebaseobject = Object.values(snapshot.val());
      console.log(firebaseobject.length);
    });
};

$(function() {
  var alreadyFilled = false;
  var dishNames = [
    "All you can eat",
    "American",
    "Antipasto",
    "Arepas",
    "Argentinean",
    "Avocado",
    "BBQ",
    "Bacon",
    "Bagels",
    "Bakery",
    "Beef and Broccoli",
    "Beef Chow Fun",
    "Blue Cheese",
    "Bok Choy",
    "Bread",
    "Breakfast Burrito",
    "Breakfast",
    "Brisket",
    "Brunch",
    "Brussel Sprouts",
    "Buffalo Wings",
    "Burger",
    "Burrata",
    "Burrito",
    "Caesar Salad",
    "Cajun",
    "Cake",
    "Calamari",
    "Calzone",
    "Cambodian",
    "Caribbean",
    "Carnitas",
    "Cauliflower",
    "Central America",
    "Ceviche",
    "Charcuterie",
    "Cheddar Cheese",
    "Cheese Burger",
    "Cheese Cake",
    "Cheese Steak",
    "Cheese",
    "Chicken and Rice",
    "Chicken",
    "Chili",
    "Chinese",
    "Chocolate",
    "Clams",
    "Comfort Food",
    "Corned Beef",
    "Corn",
    "Crab",
    "Curry",
    "Deep Dish Pizza",
    "Deli",
    "Dim Sum",
    "Donuts",
    "Drunken Noodles",
    "Duck",
    "Dumplings",
    "Eggplant Parmesan",
    "Eggplant",
    "Eggs",
    "Enchiladas",
    "Ethiopian",
    "Falafel",
    "Fettuccini",
    "Filet Mignon",
    "Fish and Chips",
    "Fish Tacos",
    "Fish",
    "Foie Gras",
    "French Dip",
    "French Onion Soup",
    "French Toast",
    "French",
    "Fried Chicken and Waffles",
    "Fried Chicken",
    "Fried Green Tomato",
    "Fried Pickles",
    "Fried Rice",
    "Fries",
    "Frozen Yogurt",
    "Fruit",
    "Fudge",
    "Garlic",
    "Gelato",
    "General Tso",
    "German",
    "Ginger",
    "Gluten-Free",
    "Gnocchi",
    "Goat Cheese",
    "Gouda",
    "Granola",
    "Greek Salad",
    "Greek",
    "Grilled Chicken Sandwich",
    "Grilled Chicken",
    "Grits",
    "Guacamole",
    "Gumbo",
    "Hamburger",
    "Ham",
    "Hash Browns",
    "Honey",
    "Hot Dog",
    "Hot Sauce",
    "Hummus",
    "Hush Puppies",
    "Ice Cream",
    "Italian Sub",
    "Italian",
    "Jamaican",
    "Jambalaya",
    "Japanese",
    "Jasmine Rice",
    "Jerk Chicken",
    "Kabob",
    "Kale",
    "Kimchi",
    "Kobi Beef",
    "Kung Po Chicken",
    "Lamb",
    "Lasagna",
    "Leek",
    "Lemon Grass",
    "Lemon Pepper Chicken",
    "Lemon",
    "Lettuce Wrap",
    "Lime",
    "Linguine Clam Sauce",
    "Lo Mein",
    "Lobster Bisque",
    "Lobster Roll",
    "Lobster Tail",
    "Lobster",
    "Lox and Bagels",
    "Mac and Cheese",
    "Mango Salsa",
    "Manicotti",
    "Maple Bacon",
    "Maple Donuts",
    "Maple Syrup",
    "Maple",
    "Marinara",
    "Mashed Potatoes",
    "Meat and Cheese Board",
    "Meatball Marinara",
    "Meatball Pizza",
    "Meatball Sandwich",
    "Meatball Sub",
    "Mexican",
    "Milk Chocolate",
    "Milk Shake",
    "Mint Ice Cream",
    "Mint",
    "Miso Soup",
    "Miso",
    "Mongolian Beef",
    "Mongolian",
    "Moo Shoo",
    "Mortadella",
    "Mozzarella in Carrozza",
    "Mozzarella Sticks",
    "Mozzarella",
    "Mushroom Burger",
    "Mushroom Sandwich",
    "Mushroom Soup",
    "Mushroom",
    "Mussels Frites",
    "Mussels",
    "Nachos",
    "Noodles",
    "Nori",
    "Nuggets",
    "Nuts",
    "Oatmeal Cookie",
    "Oatmeal",
    "Octopus",
    "Okra",
    "Olive Oil",
    "Olive Tempenade",
    "Olives",
    "Omelet",
    "Omu-Raisu",
    "Onion Rings",
    "Onions",
    "Orange Chicken",
    "Orange",
    "Oyster Soup",
    "Oysters on the Shell",
    "Oysters",
    "Paella",
    "Pancakes",
    "Papaya",
    "Paprika",
    "Papusas",
    "Parmesan Chicken",
    "Parmesan",
    "Pasta",
    "Pastrami",
    "Peach",
    "Peanuts",
    "Pecan Pie",
    "Pecorino",
    "Pepperoni",
    "Peppers",
    "Philly Cheese Steak",
    "Pico",
    "Pie",
    "Pita",
    "Pizza",
    "Po Boy",
    "Poached Eggs",
    "Polenta",
    "Pork Chop",
    "Pork Loin",
    "Pork",
    "Pot Pie",
    "Prawns",
    "Prosciutto",
    "Provolone",
    "Pulled Pork",
    "Pumpkin Spice",
    "Quail",
    "Quesadilla",
    "Queso",
    "Quinoa",
    "Rabbit",
    "Ratatouille",
    "Ravioli",
    "Red Beans and Rice",
    "Reuben Sandwich",
    "Ribs",
    "Rice",
    "Ricotta",
    "Rigatoni",
    "Roast Chicken",
    "Salad",
    "Salmon",
    "Salsa",
    "Sandwich",
    "Saur Kraut",
    "Sausage",
    "Scallops",
    "Shrimp & Grits",
    "Shrimp Po Boy",
    "Shrimp",
    "Smoked",
    "Soup",
    "Soya Chicken",
    "Soya",
    "Spaghetti and Meatballs",
    "Spaghetti",
    "Spanish",
    "Spinach",
    "Squid Ink Pasta",
    "Squid",
    "Steak",
    "Sub",
    "Sushi",
    "Sweet Potato Fries",
    "Swiss",
    "Tacos",
    "Tater Tots",
    "Tex-Mex",
    "Tofu Claypot",
    "Tofu",
    "Tomato Soup",
    "Truffles",
    "Turkey Sandwich",
    "Umami",
    "Vanilla",
    "Vegan",
    "Vegetable",
    "Vegetarian",
    "Veggie Sandwich",
    "Waffles",
    "Wagyu Beef",
    "Wasabi",
    "Won Ton",
    "Yuzu",
    "Ziti",
    "Zucchini"
  ];

  function initDialog() {
    clearDialog();
    for (var i = 0; i < dishNames.length; i++) {
      $(".dialog").append("<div>" + dishNames[i] + "</div>");
    }
  }
  function clearDialog() {
    $(".dialog").empty();
  }
  $(".autocomplete input").on("input", function() {
    if (!alreadyFilled) {
      $(".dialog").addClass("open");
    }
  });
  $("body").on("click", ".dialog > div", function() {
    $(".autocomplete input")
      .val($(this).text())
      .focus();
    $(".autocomplete .close").addClass("visible");
    alreadyFilled = true;
  });
  $(".autocomplete .close").click(function() {
    alreadyFilled = false;
    $(".dialog").addClass("open");
    $(".autocomplete input")
      .val("")
      .focus();
    $(this).removeClass("visible");
  });

  function match(str) {
    str = str.toLowerCase();
    clearDialog();
    for (var i = 0; i < dishNames.length; i++) {
      if (dishNames[i].toLowerCase().startsWith(str)) {
        $(".dialog").append("<div>" + dishNames[i] + "</div>");
      }
    }
  }
  $(".autocomplete input").on("input", function() {
    $(".dialog").addClass("open");
    alreadyFilled = false;
    match($(this).val());
  });
  $("body").click(function(e) {
    if (!$(e.target).is("input, .close")) {
      $(".dialog").removeClass("open");
    }
  });
  initDialog();
});
//functon for collapsing form
$("#uploadImg").on("click", function(e) {
  // $(".form-group").hide();
  // $("#sel1").hide();
  $("#collapseExample").collapse("hide");
});
