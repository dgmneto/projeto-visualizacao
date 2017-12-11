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

    document.body.removeAttribute('hidden');
    
    createTimeSeriesChart(timeSeriesChart);
    criarGrupoCallback();
}

function createTimeSeriesChart(chart) {
    chart
    .width(document.getElementById('timechart-parent-element').offsetWidth)
    .height("475")
    .renderHorizontalGridLines(true)
    .renderVerticalGridLines(true)
    .x(d3.time.scale().domain([new Date(1880, 0, 1), new Date(2013, 11, 31)]))
    .y(d3.scale.linear().domain([-40, 40]))
    .elasticY(true)
    .elasticX(false)
    .brushOn(false)
    .transitionDuration(0.25);
}
