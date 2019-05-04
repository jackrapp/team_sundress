var myMap = L.map("map", {
  center: [41.8781, -87.6298],
  zoom: 13
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

var url =  "static/data/holdingout.csv";
//var limit = "&$limit=10000";

//var url = baseURL + limit;

d3.csv(url, function(response) {

  console.log(response);

  var heatArray = [];
  var CrimeTypeIcon = L.Icon.extend({
    options: {
        iconSize:     [30, 30],
        iconAnchor:   [22, 94],
        popupAnchor:  [-3, -76]
      }
  });
  
  var batteryIcon = new CrimeTypeIcon({iconUrl: '../images/battery2.png'}),
    theftIcon = new CrimeTypeIcon({iconUrl: '../images/theft1.png'}),
    criminal_damageIcon = new CrimeTypeIcon({iconUrl: '../images/criminal_damage.png'})
    assaultIcon = new CrimeTypeIcon({iconUrl: '../images/assault.png'}),
    other_offenseIcon = new CrimeTypeIcon({iconUrl: '../images/other_offense.png'}),
    narcoticIcon = new CrimeTypeIcon({iconUrl: '../images/narcotics1.png'}),
    deceptive_practiceIcon = new CrimeTypeIcon({iconUrl: '../images/deceptive_practice.png'}),
    motor_vehicleIcon = new CrimeTypeIcon({iconUrl: '../images/motor_vehicle_theft.png'}),
    burglaryIcon = new CrimeTypeIcon({iconUrl: '../images/theft1.png'}),
    weaponsIcon = new CrimeTypeIcon({iconUrl: '../images/gun2.png'}),
    robberyIcon = new CrimeTypeIcon({iconUrl: '../images/theft1.png'}),
    everythingElseIcon = new CrimeTypeIcon({iconUrl: '../images/other_offense2.png'})
    ;
    
      function chooseIcon(primary_type) {
        switch (primary_type) {
            case ("BATTERY"):
              return batteryIcon;
            case ("THEFT"):
              return theftIcon;
            case ("CRIMINAL DAMAGE"):
              return criminal_damageIcon;
            case ("ASSAULT"):
              return assaultIcon;
            case ("OTHER OFFENSE"):
              return other_offenseIcon;
            case ("NARCOTICS"):
              return narcoticIcon;
            case ("DECEPTIVE PRACTICE"):
              return deceptive_practiceIcon;
            case ("MOTOR VEHICLE THEFT"):
              return motor_vehicleIcon;
            case ("BURGLARY"):
              return burglaryIcon;
            case ("WEAPONS VIOLATION"):
              return weaponsIcon;
            case ("ROBBERY"):
              return robberyIcon; 
            default:
              return everythingElseIcon;
        }
        
  }

   // Create a new marker cluster group
  var markers = L.markerClusterGroup();


  for (var i = 0; i < response.length; i++) {
    var latitude = response[i].Latitude;
    var longitude = response[i].Longitude;

    if (latitude!=null && longitude!=null) {
      heatArray.push([+latitude, +longitude]);
      //add icon to map
      var primary_type = response[i]["Primary Type"];
      if (primary_type!=null) {
        var testicon = chooseIcon(primary_type);
      
      markers.addLayer(L.marker([latitude, longitude], {icon: testicon})
        .bindPopup(primary_type));
      }
    }


   
  }

  var heat = L.heatLayer(heatArray, {
    radius: 80,
    blur: 20
  }).addTo(myMap);

  // Add our marker cluster layer to the map
  myMap.addLayer(markers); 

});