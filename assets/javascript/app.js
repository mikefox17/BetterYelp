//Initializes googles api, needs a call back function to actually work
function initAutocomplete() {
  var input = document.getElementById("locationSearch");
  new google.maps.places.Autocomplete(input);
}

google.maps.event.addDomListener(window, "load", initialize);
