var groups = []
var colors = ['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'];

function criarGrupoCallback() {
  if(groups.length == 9) return;
  var newGroup = new Group(data, `Grupo ${groups.length + 1}`);
  groups.push(newGroup);
  var newButton = document.createElement('button');
  newButton.className = "btn waves-effect waves-light";
  newButton.style.background = colors[groups.length-1];
  newButton.onclick = createGroupSelectionCallback(groups.length - 1);
  newButton.innerText = `${groups.length}`
  groups[groups.length-1].button = newButton;
  document.getElementById('group-buttons').appendChild(newButton);
  timeSeriesChart
    .compose(groups.map((d,i) => d.buildLineChart(timeSeriesChart, colors[i])))
    .render();
  createGroupSelectionCallback(groups.length-1)();
}

function createGroupSelectionCallback(idx) {
  return function() {
    for(var i in groups) {
      if(i == idx) {
        groups[i].geoGroup.style.display = 'block';
        groups[i].suggestionGroup.style.display = 'block';
        groups[i].selectedCountriesGroup.style.display = 'block';        
        groups[i].geoChart.render();
        groups[i].button.classList.remove('deselected');
      } else {
        groups[i].geoGroup.style.display = 'none';
        groups[i].suggestionGroup.style.display = 'none';
        groups[i].selectedCountriesGroup.style.display = 'none';
        groups[i].button.className += ' deselected';
      }
    }
  }
}