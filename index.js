var data, geojson;

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

q.awaitAll(visualization);

function visualization(err, res){
    if(err) {
        console.error(err);
        alert("Some unexpected erro ocurred while trying to download the data");
        return;
    };

    document.getElementById("loading-status")
    .innerHTML = "Baixado";
    
    data.forEach(element => {
        element.dt = new Date(element.dt);
        element.AverageTemperature = parseFloat(element.AverageTemperature);
    });

    var ndx = crossfilter(data);

    var dateDimension = ndx.dimension(d => d.dt);
    var countryDimension = ndx.dimension(d => d.Country);

    var dateGroup = dateDimension.group(d => d.getFullYear()).reduce(avgTmpAdd, avgTmpRemove, avgTmpInit);
    var countryGroup = countryDimension.group().reduce(avgTmpAdd, avgTmpRemove, avgTmpInit);

    var focuseChart = dc.lineChart("#focus-time-series-chart");
    var timeSeriesChart = dc.lineChart("#time-series-chart");

    createTimeSeriesChart(timeSeriesChart, focuseChart, dateDimension, dateGroup)

    dc.renderAll();
}

function avgTmpAdd(p, v){
    if(isNaN(v.AverageTemperature))
        return p;
    return {
        count: p.count + 1,
        sum: p.sum + v.AverageTemperature
    }
}

function avgTmpRemove(p, v){
    if(isNaN(v.AverageTemperature))
        return p;
    return {
        count: p.count - 1,
        sum: p.sum - v.AverageTemperature
    }
}

function avgTmpInit(p, v){
    return {
    count: 0,
    sum: 0
    };
}

function createTimeSeriesChart(dcTimeSeriesChart, focuseChart, dimension, group) {
    dcTimeSeriesChart
    .width("1000")
    .height("400")
    .transitionDuration(1000)
    .dimension(dimension)
    .mouseZoomable(false)
    .x(d3.time.scale())
    .xUnits(d3.time.years)        
    .elasticX(true)
    .brushOn(false)
    .group(group)
    .valueAccessor(p => {
        return p.value.count ? p.value.sum/p.value.count : 0.0 
    })
    .rangeChart(focuseChart)

    focuseChart.width("1000") 
               .height("40")
               .margins({top: 0, right: 50, bottom: 20, left: 40})
               .dimension(dimension)
               .group(group)
               .x(d3.time.scale().domain([new Date(1746, 0, 1), new Date(2012, 11, 31)]))
               .xUnits(d3.time.years);
}

function createMap(geojson){

}
    