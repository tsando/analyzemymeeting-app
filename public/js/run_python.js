var path = require('path');

exports.run_python = function (dirname, nspeakers) {
    // Use a promise so this is done before the 'stats' template is rendered
    return new Promise(function (resolve, reject) {
        console.log('Inside promise')
        var spawn = require('child_process').spawn;
        var input = path.join(dirname, '/public/data/uploads')
        var output = path.join(dirname, '/public/data/csvs')
        var pyprog = spawn('python', [path.join(dirname, "/public/python/analyzemymeeting.py"), input, nspeakers, output]);

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
