import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, Table, MetaData, distinct

from flask import Flask, jsonify
from flask_cors import CORS


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///../Resources/Output/project3.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# Save reference to the table
data_table = Base.classes.data

data_table_population = Base.classes.population

# Reflect the tables
metadata = MetaData()
metadata.reflect(bind=engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
CORS(app)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/state_names<br/>"
        f"/api/v1.0/state_data<br/>"
        f"/api/v1.0/state_data/Alabama<br/>"
        f"/api/v1.0/overall_state_summary<br/>"
        f"/api/v1.0/state_data_byHealthCondn/Obesity"
    )


@app.route("/api/v1.0/state_data")
def allStates():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of passenger data including the state, latitude, and longitude of each passenger"""
    # Query all states
    results = session.query(
        data_table.State,
        getattr(data_table, "State Abbriviation"),
        getattr(data_table, "Health Condition"),
        getattr(data_table, "Condition Prevalence (%)"),
        getattr(data_table, "Median AQI"),
        getattr(data_table, "% Clear Days"),
        getattr(data_table, "Average Temperature (F)"),
        data_table.Latitude, 
        data_table.Longitude
        ).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    states = []
    for State, State_abbr, Health_condn, Cond_preval_pc, Median_AQI, pc_clear_days, Avg_temp, Latitude, Longitude in results:
        states_dict = {}
        states_dict["State"] = State
        states_dict["State Abbriviation"] = State_abbr
        states_dict["Health Condition"] = Health_condn
        states_dict["Condition Prevalence (%)"] = Cond_preval_pc
        states_dict["Median AQI"] = Median_AQI
        states_dict["% Clear Days"] = pc_clear_days
        states_dict["Average Temperature (F)"] = Avg_temp
        states_dict["Latitude"] = Latitude
        states_dict["Longitude"] = Longitude
        states.append(states_dict)

    return jsonify(states)

@app.route("/api/v1.0/state_population_data")
def state_population_data():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of passenger data including the state, latitude, and longitude of each passenger"""
    # Query all states
    results = session.query(
        data_table.State,
        getattr(data_table, "State Abbriviation"),
        getattr(data_table, "Health Condition"),
        getattr(data_table, "Condition Prevalence (%)"),
        getattr(data_table, "Median AQI"),
        getattr(data_table, "% Clear Days"),
        getattr(data_table, "Average Temperature (F)"),
        data_table.Latitude, 
        data_table.Longitude,
        data_table_population.Population
        ).join(data_table_population, data_table.State == data_table_population.State).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    states = []
    for State, State_abbr, Health_condn, Cond_preval_pc, Median_AQI, pc_clear_days, Avg_temp, Latitude, Longitude, Population in results:
        states_dict = {}
        states_dict["State"] = State
        states_dict["State Abbriviation"] = State_abbr
        states_dict["Health Condition"] = Health_condn
        states_dict["Condition Prevalence (%)"] = Cond_preval_pc
        states_dict["Median AQI"] = Median_AQI
        states_dict["% Clear Days"] = pc_clear_days
        states_dict["Average Temperature (F)"] = Avg_temp
        states_dict["Latitude"] = Latitude
        states_dict["Longitude"] = Longitude
        states_dict["Population"] = Population
        states.append(states_dict)

    return jsonify(states)

@app.route("/api/v1.0/state_names")
def States():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of passenger data including the state, latitude, and longitude of each passenger"""
    # Query all passengers
    results = session.query(distinct(data_table.State)).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    states = [{"State": state[0]} for state in results]

    return jsonify(states)




@app.route("/api/v1.0/overall_state_summary")
def overall_summary():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query average values for Condition Prevalence (%), Median AQI, % Clear Days, and Average Temperature (F)
    results1 = session.query(
        func.round(func.avg(getattr(data_table, "Condition Prevalence (%)")),2).label("AvgConditionPrevalence"),
        func.round(func.avg(getattr(data_table, "Median AQI")),2).label("AvgMedianAQI"),
        func.round(func.avg(getattr(data_table, "% Clear Days")),2).label("AvgClearDays"),
        func.round(func.avg(getattr(data_table, "Average Temperature (F)")),2).label("AvgTemperature")
    ).first()  # Use first() since we're querying aggregates
    
    # Query total number of states
    results2 = session.query(func.count(data_table.State)).scalar()

    # Query all distinct health conditions
    results3 = session.query(getattr(data_table, "Health Condition")).distinct().all()

    session.close()

    # Construct JSON response
    summary = {
        "AverageValues": {
            "AvgConditionPrevalence": results1[0],
            "AvgMedianAQI": results1[1],
            "AvgClearDays": results1[2],
            "AvgTemperature": results1[3]
        },
        "TotalStates": results2,
        "HealthConditions": [condition[0] for condition in results3]
    }

    return jsonify(summary)

@app.route("/api/v1.0/state_data/<state_name>")
def State_info(state_name):
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of passenger data including the state, latitude, and longitude of each passenger"""
    # Query all states
    results = session.query(
        data_table.State,
        getattr(data_table, "State Abbriviation"),
        getattr(data_table, "Health Condition"),
        getattr(data_table, "Condition Prevalence (%)"),
        getattr(data_table, "Median AQI"),
        getattr(data_table, "% Clear Days"),
        getattr(data_table, "Average Temperature (F)"),
        data_table.Latitude, 
        data_table.Longitude
        ).filter(data_table.State == state_name).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    states = []
    for State, State_abbr, Health_condn, Cond_preval_pc, Median_AQI, pc_clear_days, Avg_temp, Latitude, Longitude in results:
        states_dict = {}
        states_dict["State"] = State
        states_dict["State Abbriviation"] = State_abbr
        states_dict["Health Condition"] = Health_condn
        states_dict["Condition Prevalence (%)"] = Cond_preval_pc
        states_dict["Median AQI"] = Median_AQI
        states_dict["% Clear Days"] = pc_clear_days
        states_dict["Average Temperature (F)"] = Avg_temp
        states_dict["Latitude"] = Latitude
        states_dict["Longitude"] = Longitude
        states.append(states_dict)

    return jsonify(states)


@app.route("/api/v1.0/state_data_byHealthCondn/<health_condn>")
def allStates_health(health_condn):
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of passenger data including the state, latitude, and longitude of each passenger"""
    # Query all states
    results = session.query(
        data_table.State,
        getattr(data_table, "State Abbriviation"),
        getattr(data_table, "Health Condition"),
        func.avg(getattr(data_table, "Condition Prevalence (%)")).label("Avg Condition Prevalence (%)"),
        func.avg(getattr(data_table, "Median AQI")).label("Avg Median AQI"),
        func.avg(getattr(data_table, "% Clear Days")).label("Avg % Clear Days"),
        func.avg(getattr(data_table, "Average Temperature (F)")).label("Avg Average Temperature (F)"),
        func.avg(data_table.Latitude).label("Avg Latitude"),
        func.avg(data_table.Longitude).label("Avg Longitude")
    ).filter(getattr(data_table, "Health Condition") == health_condn).group_by(
        data_table.State,
        getattr(data_table, "State Abbriviation"),
        getattr(data_table, "Health Condition")
    ).all()

    session.close()

    # Create a dictionary from the row data and append to a list of states
    states = []
    for State, State_abbr, Health_condn, Avg_Cond_preval_pc, Avg_Median_AQI, Avg_pc_clear_days, Avg_temp, Avg_Latitude, Avg_Longitude in results:
        states_dict = {
            "State": State,
            "State Abbriviation": State_abbr,
            "Health Condition": Health_condn,
            "Avg Condition Prevalence (%)": Avg_Cond_preval_pc,
            "Avg Median AQI": Avg_Median_AQI,
            "Avg % Clear Days": Avg_pc_clear_days,
            "Avg Average Temperature (F)": Avg_temp,
            "Avg Latitude": Avg_Latitude,
            "Avg Longitude": Avg_Longitude
        }
        states.append(states_dict)

    return jsonify(states)

if __name__ == '__main__':
    app.run(debug=True)
