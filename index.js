d3.csv('data/data.csv', function(err, data) {
    if(err) {
        console.error(err);
        alert("Some unexpected erro ocurred while trying to download the data");
        return;
    }

    document.getElementById("loading-status")
        .innerHTML = "Baixado";
    
    data.forEach(element => {
        element.dt = new Date(element.dt);
    });

    var ndx = crossfilter(data);
});