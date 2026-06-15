// Assignment 2-Hussein Hassan
const path = require('node:path');
//1.                          
function logsTheCurrentFileAndDir() {
    console.log(`File:${__filename},Dir:${__dirname}`);
}
logsTheCurrentFileAndDir();
//*******************************************************
//2.
function fileName(filePath) {
    console.log(path.basename(filePath));
}
fileName(__filename);
//*******************************************************
//3.
function formatePath(obj) {
    return path.format(obj);
}
console.log(formatePath({
    dir: path.dirname(__filename),
    name: path.basename(__filename).name,
    ext: path.extname(__filename)
}));

//*******************************************************
//4.
function getExtension(filePath) {
    return console.log(path.extname(filePath));
}

getExtension(__filename);

//*******************************************************
//5.
function getNameandExt(filePath) {
    return console.log(`Name:"${path.parse(filePath).name}"`, `,Ext:"${path.parse(filePath).ext}"`);
}
getNameandExt(__filename);

//*******************************************************
//6.
function checkIsAps(filePath) {
    if (path.isAbsolute(filePath)) {
        return console.log(true);
    }
}

checkIsAps(__filename);
//*******************************************************
//7.
function joinPath(...paths) {
    return console.log(path.join(...paths));
}
joinPath('home', 'user', 'documents', 'file.txt');
//*******************************************************
//8.
function resolveRelativePath(relativePath) {
    return console.log(path.resolve(relativePath));
}
resolveRelativePath('./assigment2.js');
//*******************************************************
//9.
function joinTwoPaths(path1, path2) {
    return console.log(path.join(path1, path2));
}

joinTwoPaths('/home/user/documents', 'file.txt');
//*******************************************************
//10.
const fs = require('node:fs')
function deletedFile(filePath) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.log(err);

        }
        console.log(`${filePath} is deleted.`);

    });
}
deletedFile(__filename);

//*******************************************************
//11.

function makeFolderSync(fN) {

    fs.mkdirSync(fN);
    console.log("Created Successfuly")
}
makeFolderSync("MyFolder");

//*******************************************************
//12.
const EventEmitter = require('node:events')
const MyEmmiter = new EventEmitter();
MyEmmiter.on('start', () => {
    console.log('Welcom With Hussein');
});

MyEmmiter.emit('start');

//*******************************************************
//13.
MyEmmiter.on('login', (name) => {
    console.log(`User Login In ${name}`);
});

MyEmmiter.emit('login', "Hussein");
//*******************************************************
//14.
const fs = require('node:fs');

const data = fs.readFileSync("./data.txt", 'utf8');
console.log(`The file content => "${data}"`);

//*******************************************************
//15.
const fs = require('node:fs');

fs.writeFile("./data.txt", "Hello My name is Hussein", (err) => {
    if (err) {
        console.log(err);
        return;
    }
})
//*******************************************************
//16.
const fs = require('node:fs');
const data = fs.existsSync("./data.txt")
console.log(data)

//*******************************************************
//17.

const os = require('os');

function getSysInfo() {
    return {
        platform: os.platform(),
        arch: os.arch(),
    };
}

console.log(getSysInfo());
