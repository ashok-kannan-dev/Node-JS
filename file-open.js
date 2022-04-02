var fs = require("fs");
var buf = new Buffer.alloc(1024);

console.log("Going to open an existing file");
fs.open('final.txt', 'r+', function(err, fd) {
    if (err) {
        return console.error(err);
    }
    console.log("File opened successfully!");
    fs.read(fd, buf, 0, buf.length, 0, function(err, bytes) {
        if (err) {
            console.log(err);
        }

        // Print only read bytes to avoid junk.
        if (bytes > 0) {
            console.log(buf.slice(0, bytes).toString());
        }

        // Close the opened file.
        fs.close(fd, function(err) {
            if (err) {
                console.log(err);
            }
            console.log("File closed successfully.");
        });
    });
});


// Check file is already deleted or not
fs.exists('./new-3.txt', function(existss) {
    if (!existss) {
        console.log('file is already deleted !');
    } else {
        // Delete file
        fs.unlink('new-3.txt', function(er) {
            if (er) {
                return console.error(er);
            }
            console.log('file deleted successfully !');
        });
    }
})


// Check Directory is already is here 
if (fs.existsSync('./ok')) {
    console.log('Directory is already here !');
} else {
    // Make Directory
    fs.mkdir('./ok', function(er) {
        if (er) {
            console.error(er);
        }
        console.log('Directory created successfully');
    })
}

// Read a Directory
fs.readdir('./ok', function(er, data) {
    if (er) {
        console.error(er);
    }
    if (!data.length == 0) {
        data.forEach(function(files) {
            console.log(files);
        });
    } else {
        console.log('No files are here !');
    }
});

// Remove a Directory
if (fs.existsSync('./New-folder')) {
    fs.rmdir('./New-folder', function(er, data) {
        if (er) {
            console.error(er);
        }
        console.log('directory deleted successfully !');
    });
} else {
    console.log('folder already deleted !');
}


console.log('File name is ' + __filename);
console.log('Directory name is ' + __dirname);