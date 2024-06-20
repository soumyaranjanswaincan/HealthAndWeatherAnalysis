function createPieLineChart() {
    let url = "http://127.0.0.1:5000/api/v1.0/state_data";
    d3.json(url).then((data) => {
        // Filter data for each health condition
        let asthmaData = data.filter(item => item["Health Condition"] === "Current Asthma");
        let obesityData = data.filter(item => item["Health Condition"] === "Obesity");
        let depressionData = data.filter(item => item["Health Condition"] === "Depression");
    
        // Define traces for each condition
        var traceAsthma = {
            type: 'treemap',
            labels: asthmaData.map(item => item["State"]),
            parents: asthmaData.map(item => item["State Abbriviation"]),
            values: asthmaData.map(item => item["Condition Prevalence (%)"]),
            hovertemplate: '<b>%{parents}</b><br>%{values}',
            name: 'Asthma'
        };
    
        var traceObesity = {
            type: 'treemap',
            labels: obesityData.map(item => item["State"]),
            parents: obesityData.map(item => item["State Abbriviation"]),
            values: obesityData.map(item => item["Condition Prevalence (%)"]),
            hovertemplate: '<b>%{parents}</b><br>%{values}',
            name: 'Obesity'
        };
    
        var traceDepression = {
            type: 'treemap',
            labels: depressionData.map(item => item["State"]),
            parents: depressionData.map(item => item["State Abbriviation"]),
            values: depressionData.map(item => item["Condition Prevalence (%)"]),
            hovertemplate: '<b>%{parents}</b><br>%{values}',
            name: 'Depression'
        };
    
        // Define initial data and layout for the default view (Asthma)
        var data = [traceAsthma];
        var layout = {
            title: 'Asthma by State',
            margin: { t: 30, l: 0, r: 0, b: 0 },
            treemapcolorway: ['rgba(0, 128, 0, 0.5)', 'rgba(255, 0, 0, 0.5)', 'rgba(0, 0, 255, 0.5)'],
        };
    
        // Build dropdown menu
        var dropdownOptions = [
            {
                label: 'Asthma',
                method: 'restyle',
                args: ['values', [asthmaData.map(item => item["Condition Prevalence (%)"])]]
            },
            {
                label: 'Obesity',
                method: 'restyle',
                args: ['values', [obesityData.map(item => item["Condition Prevalence (%)"])]]
            },
            {
                label: 'Depression',
                method: 'restyle',
                args: ['values', [depressionData.map(item => item["Condition Prevalence (%)"])]]
            }
        ];
    
        // Add dropdown menu to layout
        layout.updatemenus = [{
            buttons: dropdownOptions,
            direction: 'down',
            showactive: true,
        }];
    
        // Default view is asthma
        Plotly.newPlot('pieplot', data, layout);
    
        // Update based on dropdown
        function updateChart(selectedCondition) {
            switch (selectedCondition) {
                case 'Asthma':
                    Plotly.react('pieplot', [traceAsthma], layout);
                    break;
                case 'Obesity':
                    Plotly.react('pieplot', [traceObesity], layout);
                    break;
                case 'Depression':
                    Plotly.react('pieplot', [traceDepression], layout);
                    break;
                default:
                    Plotly.react('pieplot', [traceAsthma], layout);
                    break;
            }
        }
    });
};
