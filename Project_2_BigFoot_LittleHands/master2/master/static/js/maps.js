d3.csv("../static/bfro_reports_geocoded.csv", function(error, bfData) {
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

  function chooseColor(season) {
    switch (season) {
    case "Summer":
      return "yellow";
    case "Spring":
      return "#0EF70E";
    case "Winter":
      return "blue";
    case "Fall":
      return "red";
    default:
      return "purple";
    }
  }

  var seasons = []

  // Format the data
  bfData.forEach(function(data) {
    data.latitude = +data.latitude;
    data.longitude = +data.longitude;
    // data.visibility = +data.visibility;
    // for (var i = 0; i < bfData.length; i++) {
        seasons.push(
          L.circle([data.latitude, data.longitude], {
            stroke: false,
            fillOpacity: 0.75,
            color: "white",
            fillColor: chooseColor(data.season),
            radius: 10000
          })
        );
    // }
  });
  console.log(seasons)

var popup = L.marker([data.latitude, data.longitude]).bindPopup("<h3>" + data.latitude + "<h3><h3>Capacity: " + data.longitude + "<h3>");

  console.log(popup)  

// // Add the marker to the bikeMarkers array
// popup.push(popup);
// }

// // Create a layer group made from the bike markers array, pass it into the createMap function
// createMap(L.layerGroup(popup));
// }

  // Format the data
  // bfData.forEach(function(data) {
    // data.latitude = +data.latitude;
    // data.longitude = +data.longitude;
    // for (var i = 0; i < bfData.length; i++) {
        // popup.push(
          // L.marker([data.latitude, data.longitude], {
            // draggable = false,
          // marker.bindPopup(`<strong>Latitude:</strong> ${data.latitude}<br><strong>Long:</strong> ${data.longitude}`);
        // })
        // );
    // }
  // });
  // console.log(popup)

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

  var darkMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  var bfLayer = L.layerGroup(sightings);
  var stLayer = L.layerGroup(seasons);
  var tfLayer = L.layerGroup(popup);

  var baseMaps = {
    "Outdoor Map": outdoormap,
    "Dark Map": darkMap,
    "Satellite Map": satellitemap
  };

  var overlayMaps = {
    "Sightings": bfLayer,
    "Seasons": stLayer,
    "Markers": tfLayer
  };

  // var legend = L.control({ position: "bottomright" });
  // legend.onAdd = function() {
  //   var div = L.DomUtil.create("div", "info legend");
  //   var limits = ["Fall", "Winter", "Spring", "Summer"];
  //   var labelsColor = [];
  //   var labelsText = [];

  //   limits.forEach(function(limit, index) {
  //     labelsColor.push(`<li style="background-color: ${colors[index]};"></li>`); 
  //   });

  //   var labelsColorHtml =  "<ul>" + labelsColor.join("") + "</ul>";
  //   var labelsTextHtml = `<div id="labels-text">${labelsText.join("<br>")}</div>`;

  //   var legendInfo = "<h4>Seasons</h4>" +
  //     "<div class=\"labels\">" + labelsColorHtml + labelsTextHtml
  //     "</div>";
  //   div.innerHTML = legendInfo;

  //   return div;
  // };

  // legend.addTo(map);

  var myMap = L.map("map", {
    center: [38.128, -97.0059],
    zoom: 5,
    layers: [outdoormap, satellitemap, darkMap, bfLayer, tfLayer]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
});
