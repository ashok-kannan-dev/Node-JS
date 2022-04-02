var http = require('http');
var fs = require('fs');
var events = require('events');
var zlip = require('zlib');
var eventEmitter = new events.EventEmitter();

http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });

    // buf = new Buffer.alloc(26);
    // for (i = 0; i < 26; i++) {
    //     buf[i] = i + 97;
    // }
    // response.end(buf.toString());

    // fs.readFile('divi.txt', function(err, data) {
    //     if (err) {
    //         return console.error(err);
    //     } else {
    //         response.end(data.toString());
    //     }
    // });

    // var ok = fs.readFileSync('divi.txt')
    response.end("ok");

}).listen(3000);

// var ConnectHandler = function connected() {
//     console.log('Connected successful');
//     eventEmitter.emit('data_ok');
// }

// eventEmitter.on('connection', ConnectHandler);
// eventEmitter.on('data_ok', function() {
//     console.log('data recived successfuly');
// })

// eventEmitter.emit('connection');

var listner1 = function listner1() {
    console.log('Listner 1 working');
}

var listner2 = function listner2() {
    console.log('Listner 2 working');
}

var listner3 = function listner3() {
    console.log('Listner 3 working');
}

eventEmitter.addListener('connection', listner1);
eventEmitter.on('connection', listner2);

var listenercount = eventEmitter.listenerCount('connection');
console.log(listenercount);

eventEmitter.emit('connection');


// eventEmitter.removeListener('connection', listner2);
// console.log(listenercount);

// eventEmitter.emit('connection');

buf = new Buffer.alloc(26);
// len = buf.write('ashok');
// console.log('buffer writen ' + len);

for (var i = 0; i < 26; i++) {
    buf[i] = i + 97;
}

console.log(buf.toJSON('utf8'));


// Concatenate Buffers

//Syntax
//Buffer.concat(list[, totalLength])
var buffer1 = new Buffer.alloc(256);
buffer1.write("TutorialsPoint |");

var buffer2 = new Buffer.alloc(256);
buffer2.write("Simply Easy Learning |");

var buffer3 = Buffer.concat([buffer1, buffer2, buf]);

console.log("buffer3 content: " + buffer3.toString())


//Compare Buffers

//Syntax
//buf.compare(otherBuffer);
var result = buffer1.compare(buffer2);
console.log(result);

if (result == 0) {
    console.log('buffer is not same !');
} else {
    console.log('atleast 1 element is same on this buffer');
}


//Copy Buffer

//Syntax
//buf.copy(targetBuffer[, targetStart][, sourceStart][, sourceEnd])
// var allbuffers = new Buffer.alloc(256);
// buffer2.copy(allbuffers.toString());



//Slice Buffer

//Syntax
//buf.slice([start][, end])
var sliced = buffer1.slice(0, 9);
console.log("sliced buffer is " + sliced.toString());


//Buffer Length

//Syntax
//buf.length
var lengthss = new Buffer.alloc(50);
lengthss.write('ashok');

console.log("Buffer length is " + lengthss.length);



// Streams
var data = '';


// Create a readable stream
var readeStream = fs.createReadStream('divi.txt');

// Set the encoding to be utf8. 
readeStream.setEncoding('utf8');

readeStream.on('data', function(chunk) {
    data += chunk;
});

readeStream.on('end', function() {
    console.log(data);
});

readeStream.on('error', function(err) {
    console.log(err.stack);
});


// Writing to a Stream
var wirtenData = 'writen data working ashok';

var writeStream = fs.createWriteStream('output.txt');

writeStream.write(wirtenData, 'utf8');
writeStream.end();

writeStream.on('finish', function() {
    console.log('date wirten successfully');
});

writeStream.on('error', function(err) {
    console.log(err.stack);
});



// Piping the Streams
var newReadStream = fs.createReadStream('input_file.txt');

var newWriteStream = fs.createWriteStream('output_file.txt');

newReadStream.pipe(newWriteStream);



// Chaining the Streams

// Compress the file
newReadStream
    .pipe(zlip.createGzip())
    .pipe(fs.createWriteStream('input_file.txt.gz'));


// // Decompress the file
// newReadStream
//     .pipe(zlip.createGunzip())
//     .pipe(fs.createWriteStream('input_file.txt'));



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



// Open a File
// Syntax
// fs.open(path, flags[, mode], callback)

fs.open('output_file.txt', 'r+', function(err, fd) {
    if (err) {
        return console.error(err);
    }
    console.log('File opened successfully');
    console.log(fd);
})



// Get File Information
// Syntax
// fs.stat(path, callback)

fs.stat('output_file.txt', function(err, state) {
    if (err) {
        return console.error(err);
    }
    console.log(state);

    console.log(state.isDirectory());
    console.log(state.isFile());
})


// Writing a File
// Syntax
// fs.writeFile(filename, data[, options], callback)

datass = 'new content added';
fs.writeFile('output_file.txt', datass, function(err) {
    if (err) {
        return console.error(err);
    }

    fs.readFile('output_file.txt', function(err, data) {
        if (err) {
            return console.error(err);
        }
        console.log(data.toString());
    })
})