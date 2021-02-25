function Firstdata(meta) {
    d3.json("countyGDP.json").then((data) => {
        var metadata = data.metadata;
        var filtermeta = metadata.filter(object => object.id == meta);
        var result = filtermeta[0]
        var read = d3.select("#sample-metadata");
        read.html("");
        Object.entries(result).forEach(([key, value]) => {
            read.append("h5").text(`${key}: ${value}`);
        });
    })
}


function makechart(sample) {
    d3.json("countyGDP.json").then((data) => {
        var samples = data.samples;
        var filterid = samples.filter(object => object.id == sample);
        var result = filterid[0];
        var ids = result.otu_ids;
        var values = result.sample_values;

        var data = [{
            x: ids,
            y: values,
            mode: "markers",
            marker: {
                color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
                size: values
            }
        }];        
        Plotly.newPlot("bubble", data);


        var bardata = [{
            y:ids.slice(0,10).map(otuid => `OTU ${otuid}`).reverse(),
            x:values.slice(0,10).reverse(),
            type:"bar",
            orientation:"h"
        }];
        var barlayout = {
            margin: { t: 10, l: 100 }
        };
        Plotly.newPlot("bar", bardata, barlayout);

    });
}

function init() {
  var dataselect = d3.select("#selDataset");

  d3.json("countyGDP.json").then((data) => {
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      dataselect
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    var firstdata = sampleNames[0];
        makechart(firstdata);
        Firstdata(firstdata);
    });
    }

    function optionChanged(newone) {
    makechart(newone);
    Firstdata(newone);
    }

init();
