function buildStateSummary(sample) {
  
  let url = "http://127.0.0.1:5000/api/v1.0/state_data/" + sample;
  
  d3.json(url).then((data) => {
    data_table = data;
    console.log(data_table);
    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("");

    let firstItem = data[0];

    // Create a Bootstrap card for the main state information
    let card = panel.append("div").attr("class", "card mb-3");

    // Create a card body
    let cardBody = card.append("div").attr("class", "card-body");

    // Append state information as card titles and text
    cardBody.append("h5").attr("class", "card-title").text(`State: ${firstItem.State}`);
    cardBody.append("h6").attr("class", "card-subtitle mb-2 text-muted").text(`State Abbreviation: ${firstItem["State Abbriviation"]}`);
    cardBody.append("p").attr("class", "card-text").html(`
      <strong>Latitude:</strong> ${firstItem.Latitude} <br>
      <strong>Longitude:</strong> ${firstItem.Longitude} <br>
      <strong>% Clear Days:</strong> ${firstItem["% Clear Days"]} <br>
      <strong>Average Temperature (F):</strong> ${firstItem["Average Temperature (F)"]} <br>
      <strong>Median AQI:</strong> ${firstItem["Median AQI"]}
    `);

    // Loop through each item in the data array and build metadata summary
    data.forEach((item) => {
      // Create a Bootstrap card for each health condition
      let itemCard = panel.append("div").attr("class", "card mb-2");

      // Create a card body
      let itemCardBody = itemCard.append("div").attr("class", "card-body");

      // Append health condition information as card titles and text
      itemCardBody.append("h6").attr("class", "card-title").text(`Health Condition: ${item["Health Condition"]}`);
      itemCardBody.append("p").attr("class", "card-text").text(`Condition Prevalence (%): ${item["Condition Prevalence (%)"]}`);
    }); 

    setMapCoords(firstItem.Latitude,firstItem.Longitude,9);
  });    

}

function buildOverallSummary() {
  let url = "http://127.0.0.1:5000/api/v1.0/overall_state_summary";
  d3.json(url).then((data) => {
    data_table = data;
    console.log(data_table);
    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Create a Bootstrap card for the overall summary information
    let card = panel.append("div").attr("class", "card mb-3");

    // Create a card body
    let cardBody = card.append("div").attr("class", "card-body");

    // Append overall summary information as card titles and text
    cardBody.append("h5").attr("class", "card-title").text("Overall State Summary");
    cardBody.append("h6").attr("class", "card-subtitle mb-2 text-muted").text(`Total States: ${data_table.TotalStates}`);
    cardBody.append("p").attr("class", "card-text").html(`
      <strong>Average Clear Days:</strong> ${data_table.AverageValues.AvgClearDays} <br>
      <strong>Average Median AQI:</strong> ${data_table.AverageValues.AvgMedianAQI} <br>
      <strong>Average Temperature (F):</strong> ${data_table.AverageValues.AvgTemperature} <br>
      <strong>Health Conditions:</strong> ${data_table.HealthConditions.join(', ')} <br>
      <strong>Average Condition Prevalence:</strong> ${data_table.AverageValues.AvgConditionPrevalence}
    `);
   
    setMapCoords(34.95, -97.27, 5);
  });    

}


// function to build both charts
function buildCharts(sample) {
  
  if (sample === "All States") {
    url = "http://127.0.0.1:5000/api/v1.0/state_data";
  } else {
    url = "http://127.0.0.1:5000/api/v1.0/state_data/" + sample;
  }
 
  d3.json(url).then((data) => {

    let health_condition = [];
    let pc_prevalence = [];

  // Dictionary to store total prevalence and count for each health condition
  let prevalenceDict = {};

  data.forEach((item) => {
    let condition = item["Health Condition"];
    let prevalence = item["Condition Prevalence (%)"];
    
    if (prevalenceDict[condition]) {
      prevalenceDict[condition].total += prevalence;
      prevalenceDict[condition].count += 1;
    } else {
      prevalenceDict[condition] = { total: prevalence, count: 1 };
    }
  });

  // Calculate average prevalence and store unique health conditions
  for (let condition in prevalenceDict) {
    health_condition.push(condition);
    pc_prevalence.push(prevalenceDict[condition].total / prevalenceDict[condition].count);
  }

  console.log("Unique Health Conditions:", health_condition);
  console.log("Average Prevalence Percentages:", pc_prevalence);

     // For the Polar Chart, map the otu_ids to a list of strings for your yticks

    polarPlotData = {
        labels: health_condition,
        datasets: [{
          label: sample,
          data: pc_prevalence,
          backgroundColor:[
            'rgba(173, 216, 230, 0.5)',
            'rgba(144, 238, 144, 0.5)',
            'rgba(255, 165, 0, 0.5)' 
        ],
        borderColor: ['black'],
        borderWidth: 1
        }]

    }

    //chartData = createChartData(data, sample);
    const ctx = document.getElementById('myPolarChart').getContext('2d');
    updateChart(ctx, polarPlotData);

  });

}

function createChartData(filteredData, selectedState) {
  return {
      labels: filteredData.map(item => item["Health Condition"]),
      datasets: [{
          label: `Condition Prevalence (%) in ${selectedState}`,
          data: filteredData.map(item => item["Condition Prevalence (%)"]),
          backgroundColor: [
              'rgba(173, 216, 230, 0.5)',
              'rgba(144, 238, 144, 0.5)',
              'rgba(255, 165, 0, 0.5)' 
          ],
          borderColor: ['black'],
          borderWidth: 1
      }]
  };
}

function updateChart(ctx, data) {
  // If a chart instance already exists, destroy it before creating a new one
  if (ctx.chart) {
      ctx.chart.destroy();
  }

  // Create a new chart instance
  ctx.chart = new Chart(ctx, {
      type: 'polarArea',
      data: data,
      options: {
          scales: {
              r: {
                  beginAtZero: true
              }
          }
      }
  });
}

function analyzeHealth(){

  let dropdownHC = document.getElementById("selHealthConditon");
  let selectedHCValue = dropdownHC.options[dropdownHC.selectedIndex].value;

  let dropdownEF = document.getElementById("selEnvFactor");
  let selectedEFValue = dropdownEF.options[dropdownEF.selectedIndex].value;

  let url = "http://127.0.0.1:5000/api/v1.0/state_data_byHealthCondn/" + selectedHCValue;
 
  d3.json(url).then((data) => {
    // Arrays to hold the values for the scatter plot
    let xValue = [];
    let conditionPrevalence = [];
    let stateNames = [];

    let x_title ="";
    let y_title ="";
    let title ="";

    // Process data
    data.forEach((item) => {
      if (item["Health Condition"] === selectedHCValue) {
        xValue.push(item[selectedEFValue]);
        conditionPrevalence.push(item["Avg Condition Prevalence (%)"]);
        stateNames.push(item["State"]);
        x_title=selectedEFValue;
        y_title= selectedHCValue +" Prevalence (%)";
        title= selectedHCValue+ " vs "+ selectedEFValue;
      }      
    });

    // Calculate the line of best fit
    let regression = linearRegression(xValue, conditionPrevalence);

    let regressionLine = xValue.map((x) => regression.intercept + regression.slope * x);


    // Create trace for the scatter plot
    let trace = {
      x: xValue,
      y: conditionPrevalence,
      mode: 'markers',
      marker: {
        size: 10,
        color: conditionPrevalence,
        colorscale: 'Earth',
        showscale: false,
        line: {
          width: 1,
          color: 'rgb(0, 0, 0)'
        }
      },
      text: stateNames  // Tooltip with state names
    };

    let trace2 = {
      x: xValue,
      y: regressionLine,
      mode: 'lines',
      line: {
        color: 'rgba(255, 0, 0, 0.5)',
        width: 2
      },
      name: 'Fit Line'
    };

    let scatterData = [trace, trace2];

    // Layout for the scatter plot
    let layout = {
      title: title,
      xaxis: { title: x_title },
      yaxis: { title: y_title },
      margin: { t: 40, l: 40, r: 40, b: 40 },
      hovermode: 'closest',
      paper_bgcolor: 'rgba(230,230,230,1)',
      plot_bgcolor : 'rgba(230,230,230,1)'
    };

    // Render the scatter plot
    Plotly.newPlot('HC_EF_scatter', scatterData, layout);
  });
}

// Function to calculate the slope and intercept of the line of best fit
function linearRegression(x, y) {
  let n = x.length;
  let sumX = x.reduce((a, b) => a + b, 0);
  let sumY = y.reduce((a, b) => a + b, 0);
  let sumXY = x.map((xi, i) => xi * y[i]).reduce((a, b) => a + b, 0);
  let sumX2 = x.map((xi) => xi * xi).reduce((a, b) => a + b, 0);

  let slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  let intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
}

function buildChartsbyHealthCondition(sample) {
  let url = "http://127.0.0.1:5000/api/v1.0/state_data_byHealthCondn/" + sample;
 
  d3.json(url).then((data) => {
    // Arrays to hold the values for the scatter plot
    let xValue = [];
    let conditionPrevalence = [];
    let stateNames = [];

    let x_title ="";
    let y_title ="";
    let title ="";

    // Process data
    data.forEach((item) => {
      if (item["Health Condition"] === "Current Asthma") {
        xValue.push(item["Avg Median AQI"]);
        conditionPrevalence.push(item["Avg Condition Prevalence (%)"]);
        stateNames.push(item["State"]);
        x_title="Median AQI";
        y_title="Current Asthma Prevalence (%)";
        title="Current Asthma vs Median AQI";
      }
      if (item["Health Condition"] === "Depression") {
        xValue.push(item["Avg % Clear Days"]);
        conditionPrevalence.push(item["Avg Condition Prevalence (%)"]);
        stateNames.push(item["State"]);
        x_title="Avg % Clear Days";
        y_title="Depression Prevalence (%)";
        title="Depression vs Avg % Clear Days";
      }
      if (item["Health Condition"] === "Obesity") {
        xValue.push(item["Avg Average Temperature (F)"]);
        conditionPrevalence.push(item["Avg Condition Prevalence (%)"]);
        stateNames.push(item["State"]);
        x_title="Avg Average Temperature (F)";
        y_title="Obesity Prevalence (%)";
        title="Obesity vs Avg Average Temperature (F)";
      }
    });

    // Create trace for the scatter plot
    let trace = {
      x: xValue,
      y: conditionPrevalence,
      mode: 'markers',
      marker: {
        size: 10,
        color: 'rgba(93, 164, 214, 0.5)',
        line: {
          width: 1,
          color: 'rgb(0, 0, 0)'
        }
      },
      text: stateNames  // Tooltip with state names
    };

    let scatterData = [trace];

    // Layout for the scatter plot
    let layout = {
      title: title,
      xaxis: { title: x_title },
      yaxis: { title: y_title },
      margin: { t: 40, l: 40, r: 40, b: 40 },
      hovermode: 'closest'
    };

    // Render the scatter plot
    Plotly.newPlot('health_scatter', scatterData, layout);
  });
}

// Function to run on page load
function init() {
  d3.json("http://127.0.0.1:5000/api/v1.0/state_names").then((data) => {

    // Get the names field
    let stateNames = data.map(item => item.State);

    // Select the dropdown menu using D3
    let dropdown = d3.select("#selDataset");

    dropdown.append("option")
    .text("All States")  // Set the text of the option to the state name
    .attr("value", "All States");

    // Append options to the dropdown for each state name
    stateNames.forEach((state) => {
      dropdown.append("option")
        .text(state)  // Set the text of the option to the state name
        .attr("value", state);  // Set the value attribute of the option to the state name
    });

    // Select the dropdown menu using D3
    let dropdownHC = d3.select("#selHealthConditon");

    dropdownHC.append("option").text("Current Asthma").attr("value", "Current Asthma");
    dropdownHC.append("option").text("Depression").attr("value", "Depression");
    dropdownHC.append("option").text("Obesity").attr("value", "Obesity");

    // Select the dropdown menu using D3
    let dropdownEF = d3.select("#selEnvFactor");

    dropdownEF.append("option").text("Avg % Clear Days").attr("value", "Avg % Clear Days");
    dropdownEF.append("option").text("Avg Average Temperature (F)").attr("value", "Avg Average Temperature (F)");
    dropdownEF.append("option").text("Avg Median AQI").attr("value", "Avg Median AQI");

    // Get the first sample from the list
    State = stateNames[0];
    buildOverallSummary();
    buildCharts('All States');
    analyzeHealth();
    createLineChart();
    createTreeMap();

  });
}


// Function for event listener
function optionChanged(State) {
  // Build charts and metadata panel each time a new sample is selected
  if (State == 'All States'){
    buildOverallSummary(); 
    buildCharts('All States');
  }
  else{
    buildStateSummary(State); 
    buildCharts(State);
  }; 
}

// Function for event listener
function optionHealthChanged(State) {
  // Build charts and metadata panel each time a new sample is selected
  buildChartsbyHealthCondition(State); 
}

// Initialize the dashboard
init();
