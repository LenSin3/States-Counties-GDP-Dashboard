// line color function
function lineColorScale(x) {
    var maxVal = Math.max(...x);
    if (maxVal > 0 && maxVal <= 10000000) {
        return '#ff0000';
    }
    else if (maxVal > 10000000 && maxVal <= 50000000) {
        return '#cc6600';
    }
    else if (maxVal > 50000000 && maxVal <= 100000000) {
        return '#ffff00';
    }
    else if (maxVal > 100000000 && maxVal <= 250000000) {
        return '#00ffff';
    }
    else if (maxVal > 250000000 && maxVal <= 500000000) {
        return '#ff4000';
    }
    else if (maxVal > 500000000 && maxVal <= 750000000) {
        return '#666699';
    }
    else {
        return '#0000ff';
    }
}

// bar color scale
function barColorScale(x) {
    var maxVal = Math.max(...x);

    if (maxVal > 0 && maxVal <= 10000000) {
        return '#ff0000';
    }
    else if (maxVal > 10000000 && maxVal <= 50000000) {
        return '#cc6600';
    }
    else if (maxVal > 50000000 && maxVal <= 100000000) {
        return '#ffff00';
    }
    else if (maxVal > 100000000 && maxVal <= 250000000) {
        return '#00ffff';
    }
    else if (maxVal > 250000000 && maxVal <= 500000000) {
        return '#ff4000';
    }
    else if (maxVal > 500000000 && maxVal <= 750000000) {
        return '#666699';
    }
    else {
        return '#0000ff';
    }

}

// KPI color function
function highlightKPI(x) {
    if (x === 1) {
        return '#08A613';
    }
    else if (x > 1 && x <= 10) {
        return '#084CA6';
    }
    else if (x > 10 && x <= 20) {
        return '#9BA608';
    }
    else if (x > 20 && x <= 30) {
        return '#A64B08';
    }
    else if (x > 30 && x <= 40) {
        return '#9A08A6';
    }
    else if (x > 40 && x <= 55) {
        return '#A6082C';
    }
   
}

// Configure a parseTime function which will return a new Date object from a string
var parseTime = d3.timeParse("%Y");
var updateState;
var updateYear;



// function to create time series of states gdp
async function buildLinePlot(state) {
    const url = '/states/' + state;
    let data = await d3.json(url);

    // gdp
    let gdp = data.map(d => d.gdp);
    console.log(gdp);
    // years
    let year = data.map(d => d.year.toString());
    console.log(year);
    // rank
    let rank = data.map(d => d.rank);
    console.log(rank);

    
    // Average National Rank
    let average = (array) => array.reduce((a, b) => a + b) / array.length;
    
    var avgRank = Math.round(average(rank))
    console.log(avgRank);

    // Create Line Chart
    let lineTrace = {
        // x: parseTime(year),
        // x: year,
        x: ['2015', '2016', '2017', '2018', '2019'],
        y: gdp,
        type: 'scatter',
        mode: 'lines',
        // line: {color: '#17BECF'}
        line: {color: lineColorScale(gdp)}
    };

    var lineData = [lineTrace];

    var lineLayout = {
        title: state + ' ' + 'GDP Time Series',
        xaxis: {
            type: 'date',
            // range: ['2015', '2019'],
          title: 'Years'
        },
        yaxis: {
          title: 'GDP x $1M'
        }
      };
    var config = {responsive: true}
    Plotly.newPlot('time-series-chart', lineData, lineLayout, config);

    var kpdata = [
        {
          type: "indicator",
          mode: "number",
          value: avgRank,
          title: {
              text: 'Average GDP Rank of ' + '<br>' + state,
              color: '#17BECF' 
          }
          
        }
      ];
      
      var kplayout = {
        paper_bgcolor: "white",
        // width: 290,
        // height: 460,
        // margin: { t: 10, b: 10, l: 10, r: 10 }
        font: {
            color: highlightKPI(avgRank)
        }
      };
      
      Plotly.newPlot('kpi-2015', kpdata, kplayout);
  

}

function scaleRadius(x) {
    return x/50000000;
};

function scaleBubbles(x) {
    var gdpMax = Math.max(...x);
    for ( var i = 0 ; i < x.length; i++) {

        if (gdpMax > 0  && gdpMax < 50000000) {
            return x[i]/75000;
        }
        else if (gdpMax > 50000000  && gdpMax <= 100000000) {
            return x[i]/100000;
        }
        else if (gdpMax > 100000000  && gdpMax <= 250000000) {
            return x[i]/150000;
        }
        else if (gdpMax > 250000000  && gdpMax <= 500000000) {
            return x[i]/175000;
        }
        else if (gdpMax > 250000000  && gdpMax <= 500000000) {
            return x[i]/1000000;
        }
        else if (gdpMax > 500000000  && gdpMax <= 1000000000) {
            return x[i]/10000000;
        }
    }
      
}

// counties plot
async function buildCountiesPlots(state, year) {

    const url = '/counties/' + state + '/' + year;
    console.log(url);
    let data = await d3.json(url);
    console.log(data)

    var sortedData = data.sort(function(a, b){return b.gdp - a.gdp});
    console.log(sortedData);
    // Get bar chart plot parameters.
    // var gdp = dataLatest.map(d => d.gdp).slice(0, 20);
    var gdp = data.map(d => d.gdp);
    // var counties = dataLatest.map(d => d.counties).slice(0, 20);
    var counties = data.map(d => d.counties).slice(0, 50);

    var state_rank = data.map(d => d.state_rank);

    var barTrace = {
    x: counties.slice(0, 10),
    y: gdp.slice(0, 10),
    type: 'bar',
    // text: ['4.17 below the mean', '4.17 below the mean', '0.17 below the mean', '0.17 below the mean', '0.83 above the mean', '7.83 above the mean'],
    marker: {
        // color: 'rgb(142,124,195)'
        color: barColorScale(gdp)
    }
    };

    var barData = [barTrace];

    var layout = {
    title: year + ' ' + state + ' GDP' + '<br>' + 'Top Counties',
    font:{
        family: 'Raleway, sans-serif'
    },
    showlegend: false,
    xaxis: {
        tickangle: -35
    },
    yaxis: {
        zeroline: false,
        gridwidth: 2,
        title: 'GDP'
    },
    bargap :0.05
    };

    var config = {responsive: true};

    Plotly.newPlot('bar-chart', barData, layout, config);
    
    // State Bubble Map
    var geoString = data.map(d => JSON.parse(d.geo_point)[0]);
    // console.log(geoString);


    var countyName = data.map(d => d.counties),
        countyGDP =data.map(d => d.gdp),
        countyLat = data.map(d => JSON.parse(d.geo_point)[0]),
        countyLon = data.map(d => JSON.parse(d.geo_point)[1]),
        color = [,"rgb(255,65,54)","rgb(133,20,75)","rgb(255,133,27)","lightgrey"],
        countySize = [],
        hoverText = [];
        scale = 6250000;

    for ( var i = 0 ; i < countyGDP.length; i++) {
        var currentSize = countyGDP[i]/scale;
        var currentText = countyName[i] + " gdp: " + countyGDP[i];
        countySize.push(currentSize);
        hoverText.push(currentText);
    }

    var bubbleData = [{
        type: 'scattergeo',
        locationmode: 'USA-states',
        lat: countyLat,
        lon: countyLon,
        hoverinfo: 'text',
        text: hoverText,
        marker: {
            size: countySize,
            line: {
                color: 'black',
                width: 2
            },
        }
    }];

    var bubbleLayout = {
        title: year + ' ' + state + ' GDP Distribution',
        showlegend: false,
        geo: {
            scope: 'usa',
            projection: {
                type: 'albers usa'
            },
            showland: true,
            landcolor: 'rgb(255,165,0)',
            // landcolor: 'rgb(217, 217, 217)',
            subunitwidth: 1,
            countrywidth: 1,
            subunitcolor: 'rgb(255,255,255)',
            countrycolor: 'rgb(255,255,255)'
        },
    };
    var config = {responsive: true};

    Plotly.newPlot("map-id", bubbleData, bubbleLayout, config, {showLink: false});
    
}

function init() {
    let dropdown = d3.select("#selDataset"); // states
    let yearDropdown = d3.select("#selYear"); // year

    d3.json("/states").then((stateNames) => {
        d3.json("/years").then((gdpYears) => {

            stateNames.forEach((value) => {
                dropdown.append("option").text(value).property("value");
            });

            // Initialize bar chart, bubble map and top county plots
            gdpYears.forEach((value) => {
                yearDropdown.append("option").text(value).property("value");
            });

                     // For Line Chart
            const firstState = stateNames[0];
            buildLinePlot(firstState);
            updateState = firstState;
    
            


            const firstYear = gdpYears[0];
            buildCountiesPlots(firstState, firstYear);
            updateYear = firstYear;        




        })



    })
    

   
};






function optionChangedState(newState) {

    updateState = newState;
    buildLinePlot(newState);
    buildCountiesPlots(updateState, updateYear);   
   
};

function optionChangedYear(newYear) {
    updateYear = newYear;
    buildCountiesPlots(updateState, updateYear);
};

init();
