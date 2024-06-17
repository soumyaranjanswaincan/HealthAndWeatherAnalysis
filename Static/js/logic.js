// Creating the map object
let myMap = L.map("map-id", {
  center: [40.7, -73.95],
  zoom: 11
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Store the API query variables.
// For docs, refer to https://dev.socrata.com/docs/queries/where.html.
// And, refer to https://dev.socrata.com/foundry/data.cityofnewyork.us/erm2-nwe9.
let baseURL = "http://127.0.0.1:5000//api/v1.0/state_data";

// Assemble the API query URL.
let url = baseURL;

// Get the data with d3.
d3.json(url).then(function(response) {

  // Create a new marker cluster group.
  let markers = L.markerClusterGroup();

  // Loop through the data.
  for (let i = 0; i < response.length; i++) {
      let state = response[index];
      // Add a new marker to the cluster group, and bind a popup.
      markers.addLayer(L.marker([state.Latitude, state.Longitude])
      .bindPopup("<h3>" + state.State + "<h3>"));   

  }

  // Add our marker cluster layer to the map.
  myMap.addLayer(markers);

});
