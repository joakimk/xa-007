// base64 command that encodes as a single line on both osx and windows

let path = process.argv[process.argv.length - 1]
var fs = require("fs")

let data = fs.readFileSync(path)
console.log(Buffer.from(data).toString('base64'))