// var time = [];
// var speaker_number_id = [];

d3.csv("/data/csvs/timeline.csv", function (data) {
    // console.log(err);
    // console.log(data);
    var time = data.map(function (d) { return +d.time })
    var speaker_number_id = data.map(function (d) { return +d.speaker_number_id })

    var gd = document.getElementById("myChart");

    var traces = [];
    traces.push({
        x: time,
        y: speaker_number_id,
    })

    // Layout of secondary axis
    var layout = {
        title: 'Speaker Timeline',
        yaxis: { title: 'Speaker number ID' },
        xaxis: { title: 'Time (seconds)' },
    };

    Plotly.newPlot(gd, traces, layout);

});


d3.csv("/data/csvs/speaking_time.csv", function (data) {
    var speaker_number_id = data.map(function (d) { return d.speaker_number_id })
    var speaking_time = data.map(function (d) { return +d.speaking_time })
    var gd = document.getElementById("speaking_time");

    var traces = [];
    traces.push({
        values: speaking_time,
        labels: speaker_number_id,
        type: 'pie'
    })

    // Layout of secondary axis
    var layout = {
        title: 'Speaking time Share',
        height: 400,
        width: 500,        
    };

    Plotly.newPlot(gd, traces, layout);
});