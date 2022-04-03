var http = require('http');

var optoins = {
    host: 'localhost',
    post: '6000',
    path: '/index.html'
}

var callback = function(response) {
    var body = '';

    response.on('data', function(data) {
        body += data;
    });

    response.on('end', function() {
        console.log(body);
    });
}

var req = http.request(optoins, callback)
req.end();