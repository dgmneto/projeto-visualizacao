var groups = []

function criarGrupoCallback() {
  var newGroup = new Group(data);
  document.getElementById('groups').appendChild(newGroup.anchorElement);
  groups.push(newGroup);
  var newButton = document.createElement('button');
  newButton.onclick = createGroupSelectionCallback(groups.length - 1);
  newButton.innerText = `Grupo ${groups.length}`
  document.getElementById('group-buttons').appendChild(newButton);
  timeSeriesChart
    .compose(groups.map(d => d.buildLineChart(timeSeriesChart)))
    .render();
}

function createGroupSelectionCallback(idx) {
  return function() {
    console.log(idx)
    for(var i in groups) {
      console.log(i)
      if(i == idx) {
        groups[i].anchorElement.removeAttribute('hidden');
        groups[i].geoChart.render();
        groups[i].focusChart.render();
      } else {
        groups[i].anchorElement.setAttribute('hidden', '');
      }
    }
  }
}