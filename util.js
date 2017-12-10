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

function createGeoChart(parentNode, dimension, group) {
    var element = document.createElement("div");
    element.style.gridArea = 'BBB';
    element.id = `geo-chart-${makeid()}`;

    var chart = dc.geoChoroplethChart(element);
    chart.width(990)
        .height(500)
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
        })
        .dimension(dimension)
        .group(group);

    parentNode.appendChild(element);
    return chart
}

function createTimeFocuseChart(parentNode, dimension, group){
    var element = document.createElement("div");
    element.style.gridArea = 'CCC';
    element.id = `focuse-chart-${makeid()}`;

    var chart = dc.lineChart(element);
    chart.width("1000") 
        .height("40")
        .margins({top: 0, right: 50, bottom: 20, left: 40})
        .x(d3.time.scale().domain([new Date(1850, 0, 1), new Date(2013, 11, 31)]))
        .xUnits(d3.time.years)
        .dimension(dimension)
        .group(group)
        .yAxis().ticks(0);

    parentNode.appendChild(element);
    return chart;
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 20; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

function createSuggestionDiv(anchorElement) {
    var ret = document.createElement('div');
    ret.style.gridArea = 'AAA';
    anchorElement.appendChild(ret);
    var header = document.createElement('h3')
    header.innerText = "Sugestões"
    ret.appendChild(header);
    return ret;
}

function createHeaderDiv(anchorElement, title) {
    var ret = document.createElement('div')
    ret.style.gridArea = 'DDD';
    anchorElement.appendChild(ret)
    var header = document.createElement('h2')
    header.innerText = title;
    ret.appendChild(header);
    return ret;
}