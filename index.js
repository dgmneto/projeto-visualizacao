d3.csv('data/data.csv', function(err, data) {
    if(err) {
        console.error(err);
        alert("Some unexpected erro ocurred while trying to download the data");
        return;
    }
    
    data.forEach(element => {
        element.dt = new Date(element.dt);
    });

    var ndx = crossfilter(data);
});