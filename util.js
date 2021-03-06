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
    element.id = `geo-chart-${makeid()}`;

    var chart = dc.geoChoroplethChart(element);
    chart.width(950)
        .height(500)
        .projection(d3.geo.mercator().scale(150).translate([478, 300]))
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



function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 20; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}