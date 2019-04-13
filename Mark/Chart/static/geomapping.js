var url = "/test";
console.log(url);

d3.json(url, function(error, bfData) {
// d3.csv("bfro_reports_geocoded.csv", function(error, bfData) {
  if (error) throw error;
  console.log(bfData);
 
  // console.log([bfData]);

  var sightings = []

  // Format the data
  bfData.forEach(function(data) {
    data.latitude = +data.latitude;
    data.longitude = +data.longitude;
    // data.visibility = +data.visibility;
    // for (var i = 0; i < bfData.length; i++) {
        sightings.push(
          L.circle([data.latitude, data.longitude], {
            stroke: false,
            fillOpacity: 0.75,
            color: "white",
            fillColor: "orange",
            radius: 10000
          })
        );
    // }
  });
  console.log(sightings)

  var outdoormap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.outdoors",
  accessToken: API_KEY
  });

  var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-satellite",
  accessToken: API_KEY
  });

  var bfLayer = L.layerGroup(sightings);

  var baseMaps = {
    "Outdoor Map": outdoormap,
    "Satellite Map": satellitemap
  };

  var overlayMaps = {
    "Sightings": bfLayer
  };

  var myMap = L.map("map", {
    center: [38.128, -98.0059],
    zoom: 5,
    layers: [outdoormap, satellitemap, bfLayer]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
});
