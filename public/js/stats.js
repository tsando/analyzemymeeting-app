var path = require('path');

exports.run_python = function (dirname) {
    var spawn = require("child_process").spawn;
    
    var input = path.join(dirname, '/public/data/uploads')
    var output = path.join(dirname, '/public/data/csvs')
    var nspeakers = 4;
    var pythonProcess = spawn('python', ["/Users/tsando/code/analyzemymeeting/analyzemymeeting.py", input, nspeakers, output]);
    // pythonProcess.stdout.on('data', function (data) {
    //     // Do something with the data returned from python script
    //     console.log(data)
    // });
}
