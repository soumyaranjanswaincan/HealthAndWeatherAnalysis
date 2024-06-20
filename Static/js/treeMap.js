let asthmaTrace, obesityTrace, depressionTrace, layout;

function createTreeMap() {
    let url = "http://127.0.0.1:5000/api/v1.0/state_population_data";
    d3.json(url).then((data) => {
        let asthmaData = data.filter(item => item["Health Condition"] === "Current Asthma");
        let obesityData = data.filter(item => item["Health Condition"] === "Obesity");
        let depressionData = data.filter(item => item["Health Condition"] === "Depression");

        asthmaTrace = {
            type: 'treemap',
            labels: asthmaData.map(item => item["State"]),
            parents: asthmaData.map(item => item["Health Condition"]),
            values: asthmaData.map(item => Math.round(item["Condition Prevalence (%)"]*item["Population"])),
            hovertemplate: '<b>%{label}</b><br>%{value}',
            name: 'Asthma'
        };

        obesityTrace = {
            type: 'treemap',
            labels: obesityData.map(item => item["State"]),
            parents: obesityData.map(item => item["Health Condition"]), 
            values: obesityData.map(item => Math.round(item["Condition Prevalence (%)"]*item["Population"])),
            hovertemplate: '<b>%{label}</b><br>%{value}',
            name: 'Obesity'
        };

        depressionTrace = {
            type: 'treemap',
            labels: depressionData.map(item => item["State"]),
            parents: depressionData.map(item => item["Health Condition"]),
            values: depressionData.map(item => Math.round(item["Condition Prevalence (%)"]*item["Population"])),
            hovertemplate: '<b>%{label}</b><br>%{value}',
            name: 'Depression'
        };

        layout = {
            title: 'States with Highest Health Condition Prevalence',
            updatemenus: [{
                buttons: [
                    { label: 'Asthma', method: updateChartTree, args: ['Asthma'] },
                    { label: 'Obesity', method: updateChartTree, args: ['Obesity'] },
                    { label: 'Depression', method: updateChartTree, args: ['Depression'] }
                ],
                direction: 'down',
                showactive: true,
            }]
        };



        Plotly.newPlot('treeMap', [asthmaTrace], layout);
    });
}

function updateChartTree(selectedCondition) {
    switch (selectedCondition) {
        case 'Asthma':
            Plotly.react('treeMap', [asthmaTrace], layout);
            break;
        case 'Obesity':
            Plotly.react('treeMap', [obesityTrace], layout);
            break;
        case 'Depression':
            Plotly.react('treeMap', [depressionTrace], layout);
            break;
        default:
            Plotly.react('treeMap', [asthmaTrace], layout);
            break;
    }
}