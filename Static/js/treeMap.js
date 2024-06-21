let asthmaTrace, obesityTrace, depressionTrace, layout;

function createTreeMap() {
    let url = "http://127.0.0.1:5000/api/v1.0/state_population_data";
    d3.json(url).then((data) => {
        let asthmaData = data.filter(item => item["Health Condition"] === "Current Asthma");
        let obesityData = data.filter(item => item["Health Condition"] === "Obesity");
        let depressionData = data.filter(item => item["Health Condition"] === "Depression");
        let firstTrace = data.filter(item => item["Health Condition"] === "Current Asthma");

        firstTrace = { 
            type: 'treemap',
            labels: firstTrace.map(item => item["State"]),
            parents: firstTrace.map(item => item["Health Condition"]),
            values: firstTrace.map(item => Math.round(item["Condition Prevalence (%)"] * item["Population"])),
            hovertemplate: '<b>%{label}</b><br>%{value}',
            name: 'Asthma'
        };

        asthmaTrace = { 
            type: 'treemap',
            labels: asthmaData.map(item => item["State"]),
            parents: asthmaData.map(item => item["Health Condition"]),
            values: asthmaData.map(item => Math.round(item["Condition Prevalence (%)"] * item["Population"])),
            hovertemplate: '<b>%{label}</b><br>%{value}',
            name: 'Asthma'
        };

        obesityTrace = {
            type: 'treemap',
            labels: obesityData.map(item => item["State"]),
            parents: obesityData.map(item => item["Health Condition"]), 
            values: obesityData.map(item => Math.round(item["Condition Prevalence (%)"] * item["Population"])),
            hovertemplate: '<b>%{label}</b><br>%{value}',
            name: 'Obesity'
        };

        depressionTrace = {
            type: 'treemap',
            labels: depressionData.map(item => item["State"]),
            parents: depressionData.map(item => item["Health Condition"]),
            values: depressionData.map(item => Math.round(item["Condition Prevalence (%)"] * item["Population"])),
            hovertemplate: '<b>%{label}</b><br>%{value}',
            name: 'Depression'
        };

        var frames = [{
            name: 'Asthma',
            data: [asthmaTrace]
          },
          {
            name: 'Obesity',
            data: [obesityTrace]
          },
          {
            name: 'Depression',
            data: [depressionTrace]
          }
        ];

        layout = {
            title: 'States with Highest Health Condition Prevalence',
            updatemenus: [{
                buttons: [{
                    method: 'animate',
                    args: [['Asthma']],
                    label: 'Asthma'
                },
                {
                    method: 'animate',
                    args: [['Obesity']],
                    label: 'Obesity'
                },
                {
                    method: 'animate',
                    args: [['Depression']],
                    label: 'Depression'
                }],
                direction: 'down',
                showactive: true,
                type: 'dropdown'
            }]
        };

        // Create the initial plot with asthmaTrace
        Plotly.newPlot('treeMap', [firstTrace], layout).then(function(){
            Plotly.addFrames('treeMap', frames);
        });
    });
}