var data, geojson, similars;

var q = d3.queue();

q.defer(function(callback){
    d3.csv('data/data.csv', function(res){
        data = res;
        callback(null, res);
    });
});

q.defer(function(callback){
    d3.json('data/countries.geojson', function(res){
        geojson = res;
        callback(null, res);
    });
});

q.defer(function(callback){
    d3.csv('data/similar.csv', function(res){
        similars = res;
        callback(null, res);
    })
})

q.awaitAll(visualization);

var timeSeriesChart = dc.compositeChart("#timechart");

function visualization(err, res){
    if(err) {
        console.error(err);
        alert("Some unexpected erro ocurred while trying to download the data");
        return;
    };

    setSimilarityData(similars);

    data.forEach(element => {
        element.dt = new Date(element.dt);
        element.AverageTemperature = parseFloat(element.AverageTemperature);
    });

    data = data.filter(d => !isNaN(d.AverageTemperature))
    
    /*var ndx = crossfilter(data);
    var dateDimension = ndx.dimension(d => d.dt);
    var dateGroup = dateDimension
    .group(d => d.getFullYear()).reduce(avgTmpAdd, avgTmpRemove, avgTmpInit);*/

    createTimeSeriesChart(timeSeriesChart);
  //  createTimeFocuseChart(focuseChart, dateDimension, dateGroup);
    criarGrupoCallback();

    document.body.removeAttribute('hidden');
}

function createTimeSeriesChart(chart) {
    chart
    .width("950")
    .height("475")
    .renderHorizontalGridLines(true)
    .renderVerticalGridLines(true)
    .x(d3.time.scale().domain([new Date(1850, 0, 1), new Date(2013, 11, 31)]))
    .y(d3.scale.linear().domain([-40, 40]))
    .elasticY(true)
    .elasticX(false)
    .brushOn(false)
    .transitionDuration(0);
}

function createTimeFocuseChart(chart, dimension, group){
    chart.width("950") 
        .height("40")
        .x(d3.time.scale().domain([new Date(1850, 0, 1), new Date(2013, 11, 31)]))
        .xUnits(d3.time.years)
        .dimension(dimension)
        .group(group)
        .yAxis().ticks(0);
}
