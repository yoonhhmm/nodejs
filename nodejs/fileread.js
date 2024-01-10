// nodejs module중 filesystem
var fs = require('fs');
fs.readFile('sample.txt', function(err, data){  // sample.txt : 읽고 싶은 file
    console.log(data);
});