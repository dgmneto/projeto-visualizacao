class Group {
  constructor(data, title) {
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
    this.geoChart = createGeoChart(this.anchorElement, this.countryDimension, this.countryGroup)
      .on('filtered', this.updateSugestions.bind(this))
    this.focusChart = createTimeFocuseChart(this.anchorElement, this.dateDimension2, this.dateGroup2)
    this.suggestionDiv = createSuggestionDiv(this.anchorElement)
    this.headerDiv = createHeaderDiv(this.anchorElement, title);
    this.anchorElement.style.gridTemplateAreas = '"DDD DDD" "AAA BBB" "CCC CCC"';
    this.anchorElement.style.display = 'none'
    
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
          return p.value.count ? p.value.sum/p.value.count : null
      })
  }

  updateSugestions(chart) {
    var bestSugestions = getNextSimilars(chart.filters());
    var oldChild = this.suggestionDiv.querySelectorAll('[name=suggestionList]');
    if(oldChild.length != 0)
      this.suggestionDiv.removeChild(oldChild.item(0));
    var newList = document.createElement('ol');
    for(var i of bestSugestions) {
      var newListItem = document.createElement('li');
      var newButton = document.createElement('button');
      newButton.onclick = ((a, b) => () => {
        b.filter(a);
        b.render();
      })(i, chart);
      newButton.innerText = i;
      newListItem.appendChild(newButton);
      newList.appendChild(newListItem);
    }
    newList.setAttribute('name', 'suggestionList');
    this.suggestionDiv.appendChild(newList)
  }
}