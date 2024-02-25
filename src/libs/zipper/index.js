const fs = require('fs');
const zlib = require('zlib');

function zipAndLog(filename){
    const readStream = fs.createReadStream(filename)
    const gzip = zlib.createGzip()

    readStream.pipe(gzip)

    gzip.on('data', (chunk) => {
        console.log(chunk)
    })

    gzip.on('error', (err) => {
        return err.toString();
    })

    gzip.on('end', (chunk) => {
        return 'Complete';
    })
}

const filename = "C:\\Users\\PC\\Desktop\\Pro\\Storage\\src\\tests\\test.txt"
zipAndLog(filename)