d3.csv('data/data.csv', function(err, data) {
    if(err) {
        console.error(err);
        alert("Some unexpected erro ocurred while trying to download the data");
        return;
    }
    // habemus datam
});