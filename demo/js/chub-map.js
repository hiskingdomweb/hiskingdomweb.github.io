var map = L.map('map').setView([32.9214284,-96.4419539], 13);
L.mapbox.accessToken = 'pk.eyJ1Ijoic3N1ZmZpYW4iLCJhIjoiZjFtSVF4ayJ9.fR3a9uOfItOmkXjQEBiEOw'
L.tileLayer('http://{s}.tiles.mapbox.com/v4/examples.map-i87786ca/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18
}).addTo(map);

var marker = L.marker([32.9214284,-96.4419539]).addTo(map);
marker.bindPopup("<b>Crossroads Community Church.").openPopup();