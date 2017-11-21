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

    data = data.filter(d => !isNaN(d.AverageTemperature))

    var ndx = crossfilter(data);

    var dateDimension = ndx.dimension(d => d.dt);
    var dateDimension2 = ndx.dimension(d => d.dt);    
    var countryDimension = ndx.dimension(d => d.Country);

    var dateGroup = dateDimension.group(d => d.getFullYear()).reduce(avgTmpAdd, avgTmpRemove, avgTmpInit);    
    var dateGroup2 = dateDimension.group(d => d.getFullYear()).reduce(avgTmpAdd, avgTmpRemove, avgTmpInit);
    var countryGroup = countryDimension.group().reduce(avgTmpAdd, avgTmpRemove, avgTmpInit);

    var geoChart = dc.geoChoroplethChart("#geo-chart");
    var timeSeriesChart = dc.lineChart("#time-series-chart");
    var focuseChart = dc.lineChart("#focus-time-series-chart");
    

    createMap(geoChart, countryDimension, countryGroup);
    createTimeSeriesChart(timeSeriesChart, focuseChart, dateDimension, dateGroup);
    createFocuseChart(focuseChart, dateDimension2, dateGroup2);

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

function createTimeSeriesChart(chart, focuseChart, dimension, group) {
    chart
    .width("1000")
    .height("400")
    .transitionDuration(1000)
    .dimension(dimension)
    .x(d3.time.scale().domain([new Date(1850, 0, 1), new Date(2013, 11, 31)]))
    .rangeChart(focuseChart)
    .y(d3.scale.linear().domain([-20, 40]))
    .brushOn(false)
    .group(group)
    .keyAccessor(function(p){
        return new Date(p.key, 1);
    })
    .valueAccessor(p => {
        return p.value.count ? p.value.sum/p.value.count : 0.0 
    })
}

function createFocuseChart(chart, dimension, group){
    chart.width("1000") 
    .height("40")
    .margins({top: 0, right: 50, bottom: 20, left: 40})
    .dimension(dimension)
    .group(group)
    .x(d3.time.scale().domain([new Date(1850, 0, 1), new Date(2013, 11, 31)]))
    .xUnits(d3.time.years)
    .keyAccessor(function(p){
        return new Date(p.key, 1);
    })
    .valueAccessor(p => {
        return p.value.count ? p.value.sum/p.value.count : 0.0 
    })
    .yAxis().ticks(0);
}

function createMap(geoChart, dimension, group){

    geoChart.width(990)
            .height(500)
            .dimension(dimension)
            .group(group)
            .projection(d3.geo.mercator())
            .colors(d3.scale.linear()
                            .domain([-10, 30])
                            .interpolate(d3.interpolateRgb)
                            .range(['#00edff', '#ff0000']))
            .overlayGeoJson(geojson.features, "Country", d => d.properties.name)
            .valueAccessor(
                function(p){
                    return p.value.count ? p.value.sum/p.value.count : 0.0;
                }
            )
            .title(function(d){
                return "Country: " + d.key + "\nAverage Temperature: " + (d.value? d.value : 0);
            });
}
    
