# Impact of Weather conditions over Health

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

## Vizualiaztiona Setup and Navigation



## Conclusion
By understanding the complex interactions between weather factors and health conditions, we can develop more effective strategies to improve public health outcomes. This project aims to contribute valuable knowledge to the fields of environmental health and epidemiology, ultimately helping to create healthier communities across the USA.


