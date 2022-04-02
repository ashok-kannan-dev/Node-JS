var http = require('http');
var fs = require('fs')


http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });

    var data = 'writen data working';

    var wirtenData = fs.createWriteStream('final.txt');
    wirtenData.write(data, 'utf-8');
    wirtenData.end();

    wirtenData.on('finish', function() {
        console.log('writen data successfully');
    })

    wirtenData.on('error', function(err) {
        console.log(err.stack);
    })


    var fileOpen = fs.open('output_file.txt', 'r+', function(err, fd) {
        if (err) {
            return console.error(err);
        }
        console.log('File opened successfully');
        console.log(fd);
    })

    response.end(fileOpen);
}).listen(9000);


// Synchronous vs Asynchronous

// Asynchronous read
fs.readFile('final.txt', function(err, data) {
    if (err) {
        return console.err(err.stack);
    }
    console.log("Asynchronous read: " + data.toString());
})

// Synchronous read
var data = fs.readFileSync('final.txt');
console.log("Synchronous read: " + data.toString());


fs.stat('output_file.txt', function(err, state) {
    if (err) {
        return console.error(err);
    }
    console.log(state);

    console.log(state.isDirectory());
    console.log(state.isFile());
})