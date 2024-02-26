const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

function bufferToBits(buffer) {
    let bits = '';
    for (const byte of buffer) {
        console.log(byte)
    }
}

function zipAndLog(filename, callback){
    const filePath = path.join(__dirname, filename);

    const readStream = fs.createReadStream(filePath);
    const gzip = zlib.createGzip();
    var tab_zip = "";

    readStream.pipe(gzip);

    gzip.on('data', (chunk) => {
        bufferToBits(chunk)
    });

    gzip.on('error', (err) => {
        console.error(err.toString());
    });

    gzip.on('end', () => {
        console.log('Complete');
        callback(null, tab_zip)
    });
}

function unzip(tab_zipper){
    const binaryData = Buffer.from(tab_zipper, 'binary');

    // Dekompresja danych za pomocą zlib
    zlib.gunzip(binaryData, (err, decompressedData) => {
        if (err) {
            console.error('Decompression Error:', err);
            return;
        }
        // Wyświetlenie zdekompresowanych danych jako tekst
        console.log('Decompressed Data:', decompressedData.toString());
    });
}

const filename = "test.txt";
const zip = zipAndLog(filename, async (err, zip) => {
    if (err) {
        console.error('Error:', err);
        return;
    }
    
    console.log(unzip(zip))
});