# Conservatory-GDP-DataViz

Interactive data visualization dashboard of GDP by State and County.

## Objective

In 2019 U.S Nominal GDP reached $21.43 trillions. This number is a combination of GDP of all 51 states. While every state makes its own contribution, some states such as  California and New York are leading contributors to overall GDP. Many of the states  have economies that are comparable to some of the largest countries in the world.  
We decided to create an interactive visualization dashboard using the key economic indicator GDP of all US States and counties from 2015 to 2019 to better understand the economic value being contributed to total GDP. 

## Data Sources

* [Gross Domestic Product by County](https://www.bea.gov/news/2020/gross-domestic-product-county-2019)

* [US County Boundaries](https://public.opendatasoft.com/explore/dataset/us-county-boundaries/table/?disjunctive.statefp&disjunctive.countyfp&disjunctive.name&disjunctive.namelsad&disjunctive.stusab&disjunctive.state_name)

## Project steps

![Snip20210106_12](https://user-images.githubusercontent.com/66816965/103853935-19848900-5064-11eb-9038-ae8613b9d36e.png)

### Step 1: Extract and Transform

We started out by retrieveing our data from the US Bureau of Economic Activity (BEA)website through an API request.  The response  was parsed and transformed into a desirable format to be loaded in a database. The transformation involved an iterative process of data cleaning and munging.
A second set of data containing geolocation points of all counties in all 51 States were extracted from opendatasoft.com. These points were required to plot maps and other geolocation charts. The transformation steps were similar to the steps above mentioned.

### Step 2: Load

The load is the final step in the ETL process. It is an integral part of the data acquisition and management pipeline.
MongoDB was used as a database for storage purposes. The end structure of the datasets was taken into consideration when deciding to employ this Database Management System. The data was transformed into a JSON and then loaded into the database. Please see newload.py for more details.

### Step 3: Visualization

The visualization was rendered on the browser employing JavaScript and associated libraries such as D3.js, Leaflet.js and Plotly.js.
The data for the plots was retrieved from the MongoDB database via a Flask powered API (see app.py). A dashboard was created to compare several chart types showing GDP of Counties and States across the time period of 2015 - 2019. The charts are interactive and can be updated with dropdown actions. 

The dashboard charts are in index.html and the codes are in plotlyScript.js. A screen shot of the dashboard is seen below.  

![Snip20210106_17](https://user-images.githubusercontent.com/66816965/103855455-9107e780-5067-11eb-8aaa-98cb3c8a6193.png)

### Step 4: Analysis and Conclusion

* The state with the highest GDP is California and the county with the highest GDP is Los Angeles.
* The US has experienced a gradual increase in GDP to date. States like California, New York and Texas share a large percentage of the overall growth of GDP.

## Tools and Libraries

* Python
* Flask
* MongoDB
* JavaScript
* Plotly.js
* D3
* HTML
* CSS

## Environment

* Python 3.6 in:
  * Jupyter Notebook
  * VS Code

