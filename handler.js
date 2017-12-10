var groups = []

function criarGrupoCallback() {
  if(groups.length == 5) return;
  var newGroup = new Group(data, `Grupo ${groups.length + 1}`);
  document.getElementById('groups').appendChild(newGroup.anchorElement);
  groups.push(newGroup);
  var newButton = document.createElement('button');
  newButton.onclick = createGroupSelectionCallback(groups.length - 1);
  newButton.innerText = `${groups.length}`
  document.getElementById('group-buttons').appendChild(newButton);
  timeSeriesChart
    .compose(groups.map(d => d.buildLineChart(timeSeriesChart)))
    .render();
}

function createGroupSelectionCallback(idx) {
  return function() {
    for(var i in groups) {
      if(i == idx) {
        groups[i].anchorElement.style.display = 'grid';
        groups[i].geoChart.render();
        groups[i].focusChart.render();
      } else {
        groups[i].anchorElement.style.display = 'none';
      }
    }
  }
}