class Group {
  constructor(data) {
    this.ndx = crossfilter(data);
    this.dateDimension = this.ndx.dimension(d => d.dt);    
    this.countryDimension = this.ndx.dimension(d => d.Country);
    this.dateDimension2 = this.ndx.dimension(d => d.dt);
    
    this.dateGroup = this.dateDimension
      .group(d => d.getFullYear()).reduce(avgTmpAdd, avgTmpRemove, avgTmpInit);
    this.dateGroup2 = this.dateDimension2
      .group(d => d.getFullYear()).reduce(avgTmpAdd, avgTmpRemove, avgTmpInit); 
    this.countryGroup = this.countryDimension
      .group().reduce(avgTmpAdd, avgTmpRemove, avgTmpInit);

    this.anchorElement = document.createElement("div")
    this.anchorElement.setAttribute('hidden', '')
    this.geoChart = createGeoChart(this.anchorElement, this.countryDimension, this.countryGroup)
    this.focusChart = createTimeFocuseChart(this.anchorElement, this.dateDimension2, this.dateGroup2)
    
    this.buildLineChart = this.buildLineChart.bind(this);
  }

  buildLineChart(compositeChart) {
    return dc.lineChart(compositeChart)
      .dimension(this.dateDimension)
      .group(this.dateGroup)
      .keyAccessor(function(p){
          return new Date(p.key, 1);
      })
      .valueAccessor(p => {
          return p.value.count ? p.value.sum/p.value.count : 0.0 
      })
  }
}