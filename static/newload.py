# Script to load our data into MongoDB via PyMongo: mainCountiesGeoFips.json, mainStatesGdp.json and usTotals.json

# Import json and Mongo Client
import json
from pymongo import MongoClient


client = MongoClient('localhost', 27017) # Set up the client
db = client['MainGDP_DB'] # Create database
collection_counties = db['mainCountiesGDP'] # Create collection for counties GDP
collection_states = db['mainStatesGDP'] # Create collection for states GDP
collection_usTotal = db['usTotalGDP'] # create collection for US Total

# Load mainCountiesGeoFips.json
with open('mainCountiesGeoFips.json') as f: 
    county_data = json.load(f)

collection_counties.insert_many(county_data)
# Close the connection
client.close()

# Load mainStatesGDP.json
with open('mainStatesGdp.json') as f:
    state_data = json.load(f)
# Use insert_many to insert the documents
collection_states.insert_many(state_data)
# Close the connection
client.close()

# Load usTotals.json
with open('usTotals.json') as f:
    us_data = json.load(f)
# Use insert_many to insert the documents
collection_usTotal.insert_many(us_data)
# Close the connection
client.close()