let map;
function createMap(markers, heatArray) {

  // Create the tile layer that will be the background of our map.
  let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });


  // Create a baseMaps object to hold the streetmap layer.
  let baseMaps = {
    "Street Map": streetmap
  };

  // Create an overlayMaps object to hold the state layer.
  let overlayMaps = {
    "States": markers
  };

  // Create the map object with options.
  map = L.map("map-id", {
    center: [34.95, -97.27],
    zoom: 5,
    layers: [streetmap, markers]
  });

  var heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 25,
    maxZoom: 15,
    gradient: {
      0.4: 'blue',
      0.6: 'lime',
      0.8: 'red'
    }
  }).addTo(map);

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

function createMarkers(response) {
  // Initialize an array to hold state markers.
  let stateMarkers = [];
  let heatArray =[];

  // Loop through the state array.
  response.forEach((state, index) => {
    // Create a promise for the popup content
    let popupContentPromise = popupHTMLData(state.State);

    // Create a marker for the state
    let marker = L.marker([state.Latitude, state.Longitude]);

    heatArray.push([state.Latitude, state.Longitude, state["Condition Prevalence (%)"]*100]);

    // Add the promise to the marker
    popupContentPromise.then((html_data) => {
      marker.bindPopup(html_data);
    });

    // Add the marker to the stateMarkers array.
    stateMarkers.push(marker);
  });
  // Create a layer group that's made from the state markers array, and pass it to the createMap function.
  createMap(L.layerGroup(stateMarkers),heatArray);
}

function popupHTMLData(sample) {
  let url = "http://127.0.0.1:5000/api/v1.0/state_data/" + sample;

  return d3.json(url).then((data) => {
    if (data.length === 0) {
      return "<p>No data available</p>";
    }

    let firstItem = data[0];

    let html = `<h3>${firstItem.State} (${firstItem["State Abbriviation"]})</h3>
                <p>Coordinates: ${firstItem.Latitude}, ${firstItem.Longitude}</p>
                <p>% Clear Days: ${firstItem["% Clear Days"]}</p>
                <p>Median AQI: ${firstItem["Median AQI"]}</p>
                <p>Average Temperature (F): ${firstItem["Average Temperature (F)"]}</p><br>
                <p><table class="table table-striped table-bordered table-hover table-sm">
                <thead class="thead-dark"><tr><th>Health Condition</th><th>Condition Prevalence %</th></th></thead>`;

    // Loop through each item in the data array and build metadata summary
    data.forEach((item) => {
      html += `<tr><td> ${item["Health Condition"]}</td><td> ${item["Condition Prevalence (%)"]} </td></tr></p>`;
    });
    html = html + `</table>`
    return html;
  });
}


function setMapCoords(Latitude,Longitude,zoom){
  coords = [Latitude,Longitude];
  //alert(coords);
  map.setView(coords,zoom);  
}

// Perform an API call to the state data. Call createMarkers when it completes.
d3.json("http://127.0.0.1:5000/api/v1.0/state_data").then(createMarkers);
