class Group {
  constructor(data, title) {
    this.ndx = crossfilter(data);
    this.dateDimension = this.ndx.dimension(d => d.dt);    
    this.countryDimension = this.ndx.dimension(d => d.Country);
    
    this.dateGroup = this.dateDimension
      .group(d => d.getFullYear()).reduce(avgTmpAdd, avgTmpRemove, avgTmpInit);
    this.countryGroup = this.countryDimension
      .group().reduce(avgTmpAdd, avgTmpRemove, avgTmpInit);

      
    this.geoGroup = document.createElement('div');
    document.getElementById("geochart").appendChild(this.geoGroup);
    this.suggestionGroup = document.createElement('div');
    document.getElementById("suggestions").appendChild(this.suggestionGroup);

    this.selectedCountriesGroup = document.createElement('div');
    document.getElementById("selectedCountries").appendChild(this.selectedCountriesGroup);

    this.geoChart = createGeoChart(this.geoGroup, this.countryDimension, this.countryGroup)
      .on('filtered', this.handleSelection.bind(this))
    this.buildLineChart = this.buildLineChart.bind(this);
  }

  buildLineChart(compositeChart, color) {
    return dc.lineChart(compositeChart)
      .dimension(this.dateDimension)
      .group(this.dateGroup)
      .colors([color])
      .colorAccessor(function(d, i){
        return 0;
      })
      .keyAccessor(function(p){
          return new Date(p.key, 1);
      })
      .valueAccessor(p => {
          return p.value.count ? p.value.sum/p.value.count : null
      })
  }

  handleSelection(chart){
    this.updateSelectedCountries.bind(this)(chart);
    this.updateSugestions.bind(this)(chart);
  }

  updateSelectedCountries(chart){
    var countries = chart.filters();
    var oldCountries = this.selectedCountriesGroup;
    while(oldCountries.firstChild)
      oldCountries.removeChild(oldCountries.firstChild);
    var newList = document.createElement('ul');
    newList.style.height = "400px";
    for(var i of countries){
      var newListItem = document.createElement('li');
      newListItem.innerHTML = i;
      newList.appendChild(newListItem);
    }
    this.selectedCountriesGroup.appendChild(newList);
  }

  updateSugestions(chart) {

    
    var bestSugestions = getNextSimilars(chart.filters());
    var oldChild = this.suggestionGroup.querySelectorAll('[name=suggestionList]');
    if(oldChild.length != 0)
      this.suggestionGroup.removeChild(oldChild.item(0));
    var newList = document.createElement('ul');
    newList.style.height = "400px";
    newList.className = "collection"
    for(var i of bestSugestions) {
      var newListItem = document.createElement('li');
      var newButton = document.createElement('button');
      newButton.className = "btn waves-effect waves-light red collection-item";
      newButton.innerHTML = i;
      newButton.onclick = ((a, b) => () => {
        b.filter(a);
        b.render();
      })(i, chart);
      newListItem.appendChild(newButton);
      newList.appendChild(newListItem);
    }
    newList.setAttribute('name', 'suggestionList');
    this.suggestionGroup.appendChild(newList)
  }
}