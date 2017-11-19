d3.csv('data/data.csv', function(err, data) {
    if(err) {
        console.error(err);
        alert("Some unexpected erro ocurred while trying to download the data");
        return;
    }
    document.getElementById("loading-status")
        .innerHTML = "Baixado";
    
    data = data.filter(p => p.AverageTemperature)

    data.forEach(element => {
        element.dt = new Date(element.dt);
        element.AverageTemperature = parseFloat(element.AverageTemperature);
    });

    var ndx = crossfilter(data);

    var focuseChart = dc.lineChart("#focus-time-series-chart");
    var timeSeriesChart = dc.lineChart("#time-series-chart");
    createTimeSeriesChart(timeSeriesChart, ndx, focuseChart)

    dc.renderAll();
});

function createTimeSeriesChart(dcTimeSeriesChart, ndx, focuseChart) {
    var dimension = ndx.dimension(d => d.dt);
    var group = dimension.group().reduce((p, v) => {
        if(isNaN(v.AverageTemperature))
            return p;
        return {
            count: p.count + 1,
            sum: p.sum + v.AverageTemperature
        }
    }, (p, v) => {
        if(isNaN(v.AverageTemperature))
            return p;
        return {
            count: p.count - 1,
            sum: p.sum - v.AverageTemperature
        }
    }, () => {
        return {
            count: 0,
            sum: 0
        };
    });

    dcTimeSeriesChart
        .width("1000")
        .height("400")
        .transitionDuration(1000)
        .dimension(dimension)
        .mouseZoomable(true)

        .rangeChart(focuseChart)
        .x(d3.time.scale())
        .xUnits(d3.time.years)
        .elasticX(true)

        .brushOn(false)

        .group(group)
        .valueAccessor(p => {
            //console.log(p, p.value.count ? p.value.sum/p.value.count : undefined);
            return p.value.count ? p.value.sum/p.value.count : 0.0 
        })
    
    focuseChart.width("1000") 
        .renderArea(false)
        .height("40")
        .margins({top: 0, right: 50, bottom: 20, left: 40})
        .dimension(dimension)
        .group(group)
        .x(d3.time.scale().domain([new Date(1985, 0, 1), new Date(2012, 11, 31)]))
        .xUnits(d3.time.years);
}