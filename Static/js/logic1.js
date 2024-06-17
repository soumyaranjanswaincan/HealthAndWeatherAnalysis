let map;
function createMap(markers) {

  // Create the tile layer that will be the background of our map.
  let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });


  // Create a baseMaps object to hold the streetmap layer.
  let baseMaps = {
    "Street Map": streetmap
  };

  // Create an overlayMaps object to hold the bikeStations layer.
  let overlayMaps = {
    "States": markers
  };

  // Create the map object with options.
  map = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 9,
    layers: [streetmap, markers]
  });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

function createMarkers(response) {
  // Initialize an array to hold state markers.
  let stateMarkers = [];

  // Loop through the state array.
  response.forEach((state, index) => {
    // Create a promise for the popup content
    let popupContentPromise = popupHTMLData(state.State);

    // Create a marker for the state
    let marker = L.marker([state.Latitude, state.Longitude]);

    // Add the promise to the marker
    popupContentPromise.then((html_data) => {
      marker.bindPopup(html_data);
    });

    // Add the marker to the stateMarkers array.
    stateMarkers.push(marker);
  });

  // Create a layer group that's made from the state markers array, and pass it to the createMap function.
  createMap(L.layerGroup(stateMarkers));
}

function popupHTMLData(sample) {
  let url = "http://127.0.0.1:5000/api/v1.0/state_data/" + sample;

  return d3.json(url).then((data) => {
    if (data.length === 0) {
      return "<p>No data available</p>";
    }

    let firstItem = data[0];

    let html = `<h3>${firstItem.State}</h3>
                <hr>
                <p>Coordinates: ${firstItem.Latitude}, ${firstItem.Longitude}</p>
                <p>% Clear Days: ${firstItem["% Clear Days"]}</p>
                <p>Median AQI: ${firstItem["Median AQI"]}</p>
                <p>Average Temperature (F): ${firstItem["Average Temperature (F)"]}</p>`;

    // Loop through each item in the data array and build metadata summary
    data.forEach((item) => {
      html += `<p>Health Condition: ${item["Health Condition"]}; Condition Prevalence % ${item["Condition Prevalence (%)"]}</p>`;
    });

    return html;
  });
}


function setMapCoords(Latitude,Longitude){
  coords = [Latitude,Longitude];
  //alert(coords);
  map.setView(coords,9);  
}

// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json("http://127.0.0.1:5000/api/v1.0/state_data").then(createMarkers);
