# Flask App
# Import dependencies
from flask import Flask, render_template, jsonify, redirect, request
from flask_pymongo import PyMongo
from config import MONGODB_URI
import dns
import urllib


# Create Instance of Flask App

app = Flask(__name__)
# mongo = PyMongo(app, uri="mongodb://localhost:27017/MainGDP_DB")
mongo = PyMongo(app, uri=MONGODB_URI)

# create route that renders index.html template
@app.route("/")
def index():
    """Returns the homepage"""
    return render_template("index.html")

# End point to get unique states
@app.route("/states")
def get_states():
    """Returns unique states list"""
    states = mongo.db.mainStatesGDP
    states_data = states.find()

    # create empty list to hold unique state abbreviations
    unique_states = []
    for s in states_data:
        state = s['state_name']
        if state not in unique_states:
            unique_states.append(state)
    return jsonify(unique_states)

# End point to get unique years
@app.route("/years")
def get_years():
    """Returns unique years list"""
    states = mongo.db.mainStatesGDP
    states_years = states.find()

    # create empty list to hold unique years
    unique_years = []
    for s in states_years:
        year = s['year']
        if year not in unique_years:
            unique_years.append(year)
    return jsonify(unique_years)

# end point to get states data
@app.route("/states/<state>")
def get_states_gdp(state):
    """Returns GDP and Rank of selected State by year"""
    myquery = {'state_name': state}
    states = mongo.db.mainStatesGDP
    states_data = states.find(myquery)

    # create empty list to hold unique state data
    gdp_rank = []
    for s in states_data:
        all_data = {}
        all_data['year'] = s['year']
        all_data['gdp'] = s['gdp']
        all_data['rank'] = s['rank']        
        gdp_rank.append(all_data)
    return jsonify(gdp_rank)

# End point to get counties data
@app.route("/counties/<state>/<year>", methods = ["GET", "POST"])
def get_counties_gdp(state, year):
    """Returns GDP, Ranks, Latitude and Longitude of CountiesIn a State and particular Year"""
    # years = [2015, 2016, 2017, 2018, 2019]
    str_year = int(float(year))
    myquery = {'$and': [{'state_name': state}, {'year': str_year}]}
    counties = mongo.db.mainCountiesGDP
    counties_data = counties.find(myquery)
    # create empty list to hold data on counties
    state_counties_data = []
    for s in counties_data:
        state_counties_dict = {}
        state_counties_dict['counties'] = s['county']
        state_counties_dict['gdp'] = s['gdp']
        state_counties_dict['state_rank'] = s['state_rank']
        state_counties_dict['national_rank'] = s['national_rank']
        state_counties_dict['geo_point'] = s['geo_point']
        
        state_counties_data.append(state_counties_dict)
                
    return jsonify(state_counties_data)


if __name__ == "__main__":

    app.run(debug=True)



