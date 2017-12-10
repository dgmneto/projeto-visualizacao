var points = {
  'first': 10,
  'second': 5,
  'third': 3,
  'fourth': 2,
  'fifth': 0
}

var similarityData = {}

function setSimilarityData(data) {
  for(var i of data)
    similarityData[i.country] = i
}

function getNextSimilars(selecteds) {
  console.log(selecteds)
  var totalPoints = {}
  for(var i of selecteds)
    for(var j of Object.keys(points))
      if(similarityData[i][j]) {
        if(totalPoints[similarityData[i][j]]) totalPoints[similarityData[i][j]] += 1;
        else totalPoints[similarityData[i][j]] = 1;
      }
  var candidates = Object.keys(totalPoints).filter(d => selecteds.indexOf(d) == -1);
  candidates.sort((a, b) => {
    if(totalPoints[a] > totalPoints[b]) return -1;
    else if(totalPoints[a] == totalPoints[b]) return 0;
    else return 1;
  });
  return candidates;
}
