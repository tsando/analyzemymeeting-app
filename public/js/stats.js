var path = require('path');

exports.run_python = function (dirname) {
    // Use a promise so this is done before the 'stats' template is rendered
    return new Promise(function (resolve, reject) {
        console.log('Inside promise')
        var spawn = require('child_process').spawn;
        var input = path.join(dirname, '/public/data/uploads')
        var output = path.join(dirname, '/public/data/csvs')
        var nspeakers = 4;
        var pyprog = spawn('python', ["/Users/tsando/code/analyzemymeeting/analyzemymeeting.py", input, nspeakers, output]);

        pyprog.stdout.on('data', function (data) {
            // console.log(data);
            resolve(data);

        });
        pyprog.stderr.on('data', function (data) {
            // console.log(data);
            reject(data);

        });
    });
}
