function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('searchableLocation')));
  
  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}

function initAutocompleteConnect(){
      autocompleteConnect = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('searchableLocationConnect')));

      autocompleteConnect.addListener('place_changed', fillInAddressConnect);
}

function initAutocompleteAndTask() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('searchableLocation')));

    autocompleteTask = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('searchableLocationTask')));



  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  
  autocomplete.addListener('place_changed', fillInAddress);
  autocompleteTask.addListener('place_changed', fillInAddressTask);
}

function fillInAddressConnect() {
  // Get the place details from the autocomplete object.
  var place = autocompleteConnect.getPlace();

  $('#searchableLocationName').html(place.name);
  $('#searchableLocationAddress').html(place.formatted_address);
  $('#searchableLocationLat').val(place.geometry.location.lat());
  $('#searchableLocationLng').val(place.geometry.location.lng());
  saveAddress();

}

// [START region_fillform]
function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();
  $('#searchableLocationName').html(place.name);
  $('#searchableLocationAddress').html(place.formatted_address);
  $('#searchableLocationLat').val(place.geometry.location.lat());
  $('#searchableLocationLng').val(place.geometry.location.lng());

}
// [END region_fillform]
// [START region_fillform]
function fillInAddressTask() {
  // Get the place details from the autocomplete object.
  var place = autocompleteTask.getPlace();
  $('#searchableLocationNameTask').html(place.name);
  $('#searchableLocationAddressTask').html(place.formatted_address);
  $('#searchableLocationLatTask').val(place.geometry.location.lat());
  $('#searchableLocationLngTask').val(place.geometry.location.lng());

}
// [START region_geolocation]
// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}

function resetGoogleLocation(){
  $('#searchableLocation').val('');
  $('#searchableLocationName').html('&nbsp;');
  $('#searchableLocationAddress').html('&nbsp;');
  $('#searchableLocationLat').val('');
  $('#searchableLocationLng').val('');
}

function resetGoogleLocationTask(){
  $('#searchableLocationTask').val('');
  $('#searchableLocationNameTask').html('&nbsp;');
  $('#searchableLocationAddressTask').html('&nbsp;');
  $('#searchableLocationLatTask').val('');
  $('#searchableLocationLngTask').val('');
}