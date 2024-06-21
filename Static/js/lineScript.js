    function createLineChart(){
        let url = "http://127.0.0.1:5000/api/v1.0/state_data";
       
        d3.json(url).then((data) => {
          let asthmaData = data.filter(item => item["Health Condition"] === "Current Asthma");
          let obesityData = data.filter(item => item["Health Condition"]  === "Obesity");
          let depressionData = data.filter(item => item["Health Condition"]  === "Depression");
        
           // Trace for asthma
        var traceAsthma = {
            x: asthmaData.map(item => item["State"]),
            y: asthmaData.map(item => item["Condition Prevalence (%)"]),
            mode: 'markers',
            type: 'scatter',
            name: 'Current Asthma'
        };

        // Trace for Obesity
        var traceObesity = {
            x: obesityData.map(item => item["State"]),
            y: obesityData.map(item => item["Condition Prevalence (%)"]),
            mode: 'markers',
            type: 'scatter',
            name: 'Obesity'
        };

        // Trace for depression
        var traceDepression = {
            x: depressionData.map(item => item["State"]),
            y: depressionData.map(item => item["Condition Prevalence (%)"]),
            mode: 'markers',
            type: 'scatter',
            name: 'Depression'
        };

        // Traces for weather conditions
        var traceAQI = {
            x: data.map(item => item["State"]),
            y: data.map(item => item["Median AQI"]),
            mode: 'markers',
            type: 'scatter',
            name: 'Median AQI',
            yaxis: 'y2'
        };

        var traceClearDays = {
            x: data.map(item => item["State"]),
            y: data.map(item => item["% Clear Days"]),
            mode: 'markers',
            type: 'scatter',
            name: 'Percent Clear Days',
            yaxis: 'y2'
        };

        var traceTemp = {
            x: data.map(item => item["State"]),
            y: data.map(item => item["Average Temperature (F)"]),
            mode: 'markers',
            type: 'scatter',
            name: 'Average Temperature',
            yaxis: 'y2'
        };
        
        // Adding data to plot
        var plotData = [traceAsthma, traceObesity, traceDepression, traceAQI, traceClearDays, traceTemp];

        // Creating plot
        Plotly.newPlot('plot', plotData, {
            title: 'Condition and Weather Data by State',
            yaxis: {title: 'Condition Prevalence Percent'},
            yaxis2: {
                overlaying: 'y',
                side: 'right'
            }
        });
        
        });
      
      }