var myMap = L.map("map", {
  center: [41.8781, -87.6298],
  zoom: 10
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

var url =  "https://s3.us-east-2.amazonaws.com/tsundbucket/L5T5CrimeGeoJson.geojson";
//var limit = "&$limit=10000";

//var url = baseURL + limit;

d3.json(url, function(data) {
  var response = data.features;
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
    murderIcon = new CrimeTypeIcon({iconUrl: '../images/murder.png'}),
    criminal_damageIcon = new CrimeTypeIcon({iconUrl: '../images/motor_vehicle_theft.png'})
    assaultIcon = new CrimeTypeIcon({iconUrl: '../images/gun2.png'}),
    other_offenseIcon = new CrimeTypeIcon({iconUrl: '../images/other_offense.png'}),
    narcoticIcon = new CrimeTypeIcon({iconUrl: '../images/narcotics1.png'}),
    deceptive_practiceIcon = new CrimeTypeIcon({iconUrl: '../images/deceptive_practice.png'}),
    motor_vehicleIcon = new CrimeTypeIcon({iconUrl: '../images/motor_vehicle_theft.png'}),
    burglaryIcon = new CrimeTypeIcon({iconUrl: '../images/robber3.png'}),
    weaponsIcon = new CrimeTypeIcon({iconUrl: '../images/gun2.png'}),
    robberyIcon = new CrimeTypeIcon({iconUrl: '../images/robber3.png'}),
    everythingElseIcon = new CrimeTypeIcon({iconUrl: '../images/other_offense2.png'})
    ;
    
      function chooseIcon(primary_type) {
        switch (primary_type) {
            case ("BATTERY"):
              return batteryIcon;
            case ("THEFT"):
              return theftIcon;
            case ("HOMICIDE"):
              return murderIcon;
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
    var latitude = response[i].geometry.coordinates[1];
    var longitude = response[i].geometry.coordinates[0];

    if (latitude!=null && longitude!=null) {
      heatArray.push([+latitude, +longitude]);
      //add icon to map
      var primary_type = response[i].properties["Primary Type"];
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