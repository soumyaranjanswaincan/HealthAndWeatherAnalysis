# Impact of Weather conditions over Health

### Presentation Link:
https://www.canva.com/design/DAGIn3w-RYs/1VE-25TFAd2c4Jte8d7zXg/edit?utm_content=DAGIn3w-RYs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

## Analyzing Health Conditions and Their Relationship with Weather Factors Across the USA
In this project, we will conduct an in-depth analysis of common health conditions such as asthma, obesity, and depression. Our goal is to explore the relationships between these health conditions and various weather factors, including temperature, air quality index (AQI), and clear skies, across all states in the USA.

## Understanding Common Health Conditions

### Asthma:
Asthma is a chronic respiratory condition characterized by inflammation and narrowing of the airways, leading to difficulty breathing. Factors such as air pollution, allergens, and weather changes can trigger asthma symptoms.
### Obesity:
Obesity is a complex health condition involving an excessive amount of body fat. It is associated with various health issues, including heart disease, diabetes, and certain cancers. Environmental factors, including weather patterns, can influence physical activity levels and, consequently, obesity rates.
### Depression:
Depression is a common mental health disorder marked by persistent feelings of sadness and loss of interest in activities. Weather conditions, particularly sunlight exposure and temperature, can significantly affect mood and mental health.

## Weather Factors and Their Impact on Health

### Temperature:
Temperature variations can have profound effects on both physical and mental health. Extreme heat or cold can exacerbate chronic health conditions, influence physical activity, and affect mental well-being.
### Air Quality Index (AQI):
AQI measures the concentration of pollutants in the air. Poor air quality, indicated by a high AQI, can worsen respiratory conditions like asthma and has been linked to adverse cardiovascular and mental health outcomes.
### Clear Skies:
The presence of clear skies and sunlight can positively impact mood and mental health by increasing serotonin levels. Conversely, prolonged periods of cloudy weather or lack of sunlight can contribute to seasonal affective disorder (SAD) and other depressive symptoms.

## Methodology

Our analysis will involve collecting data on health conditions and weather factors from reliable sources. We will use statistical techniques to identify correlations and potential causal relationships between the prevalence of asthma, obesity, and depression and weather variables like temperature, AQI, and the frequency of clear skies.

## Goals and Objectives

### Identify Patterns:
Examine geographical and seasonal patterns in the prevalence of asthma, obesity, and depression across different states.
### Analyze Relationships:
Explore how variations in temperature, AQI, and clear skies correlate with the occurrence of these health conditions.
### Provide Insights:
Offer insights and recommendations for public health interventions aimed at mitigating the adverse effects of weather conditions on health.

## Data Aquisition

### Data Sources
- **Health Data**: Includes information on health conditions like obesity, depression, and asthma (`health_data.csv`). Source: Kaggle
- **Air Quality Index (AQI)**: Provides the median AQI per state (`aqi_2021.csv`). Source: National Oceanic and Atmospheric Administration
- **Temperature Data**: Lists state-wise average temperatures for the year 2021 (`temp.csv`). Source: National Oceanic and Atmospheric Administration
- **Sunlight Data**: Dynamically scraped from [Current Results](https://www.currentresults.com/Weather/US/average-annual-state-sunshine.php), which provides data on the number of clear days per state.
- **Population Data**: Contains population figures by state (`population.xlsx`). Source: U.S. Census Bureau.

### Dependencies
- **Pandas**: For data manipulation and analysis.
- **Geopy**: To obtain geographical coordinates for U.S. states.
- **BeautifulSoup & Requests**: Used for web scraping sunlight data.
- **SQLite3**: For storing processed data in an SQL database.

### How to Run the Script
1. Install all required dependencies
2. Acess all the raw data files via this [link](https://drive.google.com/drive/folders/1bKu4oZ_xsZzrS1Nzyk13LZjRdaeh1BHM).
3. Place all data files in the specified directory (`../../Resources/Raw_data/`).
3. Run the script in a Python environment.
4. The processed data will be stored in an SQLite database (`../../Resources/Output/project3.sqlite`).

### Data Processing Steps
- **Reading and filtering data**: Extracting relevant columns from raw data files.
- **Aggregating data**: Calculating mean values for grouped data.
- **Fetching geographical data**: Obtaining latitudes and longitudes for U.S. states.
- **Data merging**: Combining all datasets into a single DataFrame.
- **Data rounding and cleaning**: Rounding numerical data and setting up a primary key.
- **Database storage**: Writing processed data into an SQLite databas

## Serving Data via Local API

### Overview
This Flask API provides access to a dataset integrated with health conditions and environmental factors across U.S. states. The data is stored in a SQLite database and the API allows querying the data by state or health condition, as well as retrieving general summaries.

### Dependencies
- **Flask**
- **Flask-CORS**
- **SQLAlchemy**

### How to Run the Script
1. Install all required dependencies
2. Ensure the database file `project3.sqlite` is located at  `../Resources/Output/` relative to the script.
3. Navigate to the directory `API` containing the `app_solution.py` file and run:
   ```bash
   python app_solution.py
4. The API will start running on `http://localhost:5000/`.
5. List of API's:
   -  /api/v1.0/state_names
   -  /api/v1.0/state_data
   -  /api/v1.0/state_data/Alabama
   -  /api/v1.0/overall_state_summary
   -  /api/v1.0/state_data_byHealthCondn/Obesity
   -  /api/v1.0/state_population_data

## Visualization, Setup and Navigation:
To access all scripts containing interactive visualizations' elements please navigate to `static` and then `js` folders.

### Libraries Required:
- **D3.js**: For fetching data from the API.
- **Plotly.js**: For creating the visualization.
- **Bootstrap**: For styling and layout enhancements.

### Interactive Scatter Plot:
The `createLineChart` function is designed to fetch and visualize state-specific data regarding health conditions and weather patterns. This visualization includes prevalence percentages of Current Asthma, Obesity, and Depression, along with weather-related data such as Median AQI, Percentage of Clear Days, and Average Temperature.

#### Functionality:

- **Data Fetching**: The function retrieves data from a local API endpoint (`http://127.0.0.1:5000/api/v1.0/state_data`).
- **Data Filtering**: It separates the fetched data into categories based on health conditions.
- **Data Visualization**: Utilizes Plotly to plot the data in a scatter plot format.

#### Plot Details:

- The plot contains separate traces for each category, allowing for an integrated view of health and environmental factors by state. 
- Dual y-axes are used to display condition prevalence percentages and weather-related data on the same plot but with different scales.

### Interactive Tree Map Visualization:
The `createTreeMap` function is designed to fetch and visualize data related to the prevalence of certain health conditions (Current Asthma, Obesity, Depression) across different states, adjusted by population. It uses a TreeMap representation to show the magnitude of each condition, which allows for quick visual comparisons.

#### Functionality:

- **Data Fetching**: Retrieves data from a local API endpoint (`http://127.0.0.1:5000/api/v1.0/state_population_data`).
- **Data Processing**: Filters the data based on health conditions and calculates values by multiplying prevalence percentages by state populations.
- **Dynamic Visualization**: Uses Plotly to create a dynamic treemap that can switch views between the different health conditions using animation frames.

#### Visualization Details:

- **Treemap Configuration**: Each health condition is represented by a treemap where each state is a node. The size of the node is proportional to the adjusted prevalence of the condition in that state.
- **Interactivity**: Users can switch between different health conditions using a dropdown menu integrated into the treemap.

### Interactive Polar Area Chart and Summary Table:
Provides visualizations and summaries of various health conditions and environmental factors across U.S. states. It fetches data dynamically from a local API and presents information using interactive polar area chart and metadata panels.

#### Functionality:

- **State-Specific Summaries**: Displays detailed information for a selected state including health conditions and environmental factors.
- **Overall Summary**: Provides aggregated data across all states.
- **Dynamic Charts**: Visualizes data comparisons between health conditions and environmental factors.

#### Details and Key Functions:

1. **`buildStateSummary(sample)`**:Fetches and displays state-specific data. Visualizes data in Bootstrap cards within a metadata panel.

2. **`buildOverallSummary()`**: Fetches and displays summary data for all states. Summarizes average conditions and environmental factors.

3. **`buildCharts(sample)`**: Fetches data for either a specific state or all states. Displays a polar area chart of average health condition prevalence.

4. **`init()`**: Initializes the dashboard by populating dropdown menus and loading initial data visualizations.

5. **`optionChanged(State)** and **optionHealthChanged(State)`**: Event listeners for dropdown menu changes to update visualizations based on selected state or health condition.


### Interactive Correlation Visualization:
The interactive correlation scatter plot examines the relationships between health conditions and environmental factors across U.S. states. It is designed to visualize how different environmental factors might influence the prevalence of specific health conditions, helping to uncover potential correlations.

#### Functionality:

 **Data Fetching and Processing**: Fetches state-specific data based on the selected health condition and environmental factor, then calculates averages for display. Utilizes the `analyzeHealth()` function for data fetching and dynamic updates.
- **Dynamic Visualization**: Allows users to dynamically select a health condition and an environmental factor to visualize their correlation across states. This is managed through updates within the `analyzeHealth()` function, which re-renders the scatter plot based on user selections.
- **Regression Analysis**: Computes and displays a regression line on the scatter plot, indicating the trend between the selected variables. The `linearRegression(x, y)` function is used to calculate the necessary statistical parameters for this line.

### Interactive Heat Map:
This section outlines the core functionalities of the interactive state maps and heatmap visualizations, along with the key JavaScript functions used to implement these features using the Leaflet library.

#### Functionality

- **Basic Map Setup**: Initializes the map and sets up the base tile layer using OpenStreetMap tiles to provide geographical context.
- **Data Fetching**: Dynamically retrieves state-specific data from a local API and uses it to populate the map with markers and heatmaps.
- **Marker Clustering**: Enhances map readability and performance through clustering of markers, which is particularly useful for displaying large datasets.
- **Heatmap Visualization**: Employs a heatmap layer to represent the intensity of various data points such as disease prevalence or environmental conditions, making it easy to visualize areas of high concentration.

#### Details and Key Functions:

1. **`createMap(markers, heatArray)`**: Establishes the base and overlay layers on the map, configures the heatmap settings, and integrates layer controls for user interaction.
2. **`createMarkers(response)`**: Interprets the API response to generate markers and a heatmap array. These elements are subsequently utilized by `createMap` to render the visual representations on the map.
3. **`popupHTMLData(sample)`**: Requests and formats detailed data for a specific state. This information is displayed in a popup when a marker is clicked, providing additional context to the user.
4. **`setMapCoords(Latitude, Longitude, zoom)`**: Modifies the map’s center and zoom level based on user interactions or automated processes, ensuring the map focuses on relevant areas selected in the drop down box.

### Execution: 
To run the webpage containing visualizations please navigate to this folder: `../WeatherAndHealthAnalysis/index.html`; and open `index.html` file in your browser. 

Note: Before, please ensure that your local api app is running. 

### Visualizations Examples:
#### Tree Map:
Highlights the states with the highest number of the analyzed health issues on a national level
![image](https://github.com/soumyaranjanswaincan/HealthAndWeatherAnalysis/assets/82301665/31beb155-5fd3-4ae8-9603-9cdad1fe3d6d)
#### Scatterplot:
Outlines the trends of health issues versus the weather trigger on a national level
![image](https://github.com/soumyaranjanswaincan/HealthAndWeatherAnalysis/assets/82301665/c02e06f4-3977-4793-a556-dbad5420efd0)
#### Polar Area Chart:
Visualizes the prevalence of each health problem and relevant weather factors on a state level
![image](https://github.com/soumyaranjanswaincan/HealthAndWeatherAnalysis/assets/82301665/9016a202-3ecc-4570-a074-69c10e930b00)
#### Heat Map:
Identifies the states with the highest percentage of health problems relative to their location and weather
![image](https://github.com/soumyaranjanswaincan/HealthAndWeatherAnalysis/assets/82301665/16ecfc80-d0bf-4808-b630-1b2d0dd87b7c)
#### Line Plot:
Uses a line of best-fit to compare one health condition and one weather trigger on a national level
![image](https://github.com/soumyaranjanswaincan/HealthAndWeatherAnalysis/assets/82301665/1d49be0d-5c90-44b1-9e02-6147eac528d6)

### Conclusions:
Healthcare professionals should invest in data collection and storage technologies as clear links can be found between certain weather conditions and health issues at a large scale. These projects can assist in resource allocation and preventative measures.

### Data Sources:
Data uses Census.gov for population analysis and sourcing, National Oceaninc and Atmospheric Administration: Center for Environmental Information for the weather data.
Kaggle is also used to source weather data, while AQI is retrieved from CurrentResults.com.

#### Census.gov:
https://www.census.gov/

#### National Oceaninc and Atmospheric Administration: Center for Environmental Information:
https://www.ngdc.noaa.gov/#:~:text=NOAA%20National%20Centers%20for%20Environmental%20Information%20(NCEI)%20is%20responsible%20for,of%20geophysical%20data%20and%20information.

#### Kaggle:
https://www.kaggle.com/

#### Current Results:
https://www.currentresults.com/

### Disclaimers and Usage:
#### Disclaimer:
We are not healthcare professionals. This data and conclusions drawn are from the perspective of data analysts - independent conclusions should be formed when interpretting the data.

#### Usage:
This data the app sources from specifies that this content is for educational purposes only. This app purpose is also for educational usage only. This app is not to be monetized and is not a substitute for industry-standard market data.

## Other References and Libraries
-www.d3-graph-gallery.com/index.html
- www.leafletjs.com
- www.kaggle.com
- www.noaa.gov
- www.census.gov
- UofT Bootcamp activities

## Conclusion
By understanding the complex interactions between weather factors and health conditions, we can develop more effective strategies to improve public health outcomes. This project aims to contribute valuable knowledge to the fields of environmental health and epidemiology, ultimately helping to create healthier communities across the USA.
