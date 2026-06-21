//                                  Assignment 2-Hussein Hassan

const fs = require('node:fs');
const zlib = require('node:zlib');
const http = require("node:http");
// //1.
const readData1 = fs.createReadStream("data.txt", { encoding: 'utf8' });

readData1.on('data', (chunk) => { console.log(`chunk is : ${chunk}`) });
// //*******************************************************
// //2.
const readData2 = fs.createReadStream("data.txt", { encoding: 'utf8' });

const writeToFile2 = fs.createWriteStream("output.txt");

readData2.on('data', (chunk) => {
    writeToFile2.write(chunk);
});

readData2.on('end', (chunk) => {
    console.log("finish task 2");
});
// //*******************************************************
// //3.
const readData3 = fs.createReadStream("data.txt", { encoding: 'utf8' });

const writeToFile3 = fs.createWriteStream("data.txt.gz");

readData3.pipe(zlib.createGzip()).pipe(writeToFile3);

// *******************************************************
// Part2: Simple CRUD Operations Using HTTP 

const createServer = http.createServer((req, res) => {
    const { method, url } = req;
    if (method === 'POST' && url === '/addUsers') {
        let body = "";

        req.on('data', (chunk) => {
            body = body + chunk;
        });

        req.on('end', () => {
            const newUSer = JSON.parse(body);
            fs.readFile("users.json", "utf8", (err, data) => {
                const users = JSON.parse(data);

                const exist = users.find(
                    user => user.email === newUSer.email,
                );

                if (exist) {
                    return res.end(
                        JSON.stringify({ message: "This user is Found Already" }),
                    );
                } else {
                    users.push(newUSer);
                    fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
                        if (err) {
                            return res.end(JSON.stringify({ message: "error writing file" }));
                        }
                        res.end(JSON.stringify({ message: "adding successful" }));
                    });
                }
            })
        });
    }
});


createServer.listen(3000, () => {
    console.log("server is Running successful");
});
// *******************************************************
// Part2: Simple CRUD Operations Using HTTP
2.
const createServer = http.createServer((req, res) => {
    const { method, url } = req;
    if (method === 'PUT' && url === '/updateUsers') {
        let body = "";
        req.on('data', chunk => {
            body = body + chunk;
        })

        req.on('end', () => {
            const updatedUser = JSON.parse(body);
            fs.readFile("users.json", 'utf8', (err, data) => {
                if (err) {
                    res.end("Error reading file");
                }

                const users = JSON.parse(data);

                const userIndex = users.findIndex(
                    (user) => user.email == updatedUser.email,
                );
                if (userIndex == -1) {
                    res.end("User not found");
                }
                users[userIndex] = updatedUser;

                fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
                    if (err) {
                        res.end("Error writing file");
                        return;
                    }
                    res.end("User updated successfully");

                })

            });

        });
    }
});
createServer.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
//*******************************************************
//Part2: Simple CRUD Operations Using HTTP
//3.
const createServer = http.createServer((req, res) => {
    const { method, url } = req;
    if (method === 'DELETE' && url === '/deleteUser/') {
        let body = "";
        req.on('data', chunk => {
            body = body + chunk;
        })

        req.on('end', () => {
            const DeleteddUser = JSON.parse(body);
            fs.readFile("users.json", 'utf8', (err, data) => {
                if (err) {
                    res.end("Error reading file");
                }

                const users = JSON.parse(data);

                const userIndex = users.findIndex(
                    (user) => user.email == DeleteddUser.email,
                );
                if (userIndex == -1) {
                    res.end("User not found");
                }

                users.splice(userIndex, 1);


                fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
                    if (err) {
                        res.end("Error writing file");
                        return;
                    }
                    res.end("User updated successfully");

                })

            });

        });
    }
});
createServer.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
// *******************************************************
// Part2: Simple CRUD Operations Using HTTP
4.
const createServer = http.createServer((req, res) => {
    const { method, url } = req;
    if (method === 'GET' && url === '/getAllUser') {
        fs.readFile("users.json", 'utf8', (err, data) => {
            const users = JSON.parse(data);
            res.end(JSON.stringify(users));
        });
    } else {
        res.end('The Path is wrong');
    }
});

createServer.listen(3000, () => {
    console.log("The server running successful");
});
//*******************************************************
//Part2: Simple CRUD Operations Using HTTP
//5.
const createServer = http.createServer((req, res) => {
    const { method, url } = req;
    if (method === 'GET' && url.startsWith('/user/')) {
        const id = req.url.replace("/user/", "");
        fs.readFile("users.json", 'utf8', (err, data) => {
            const users = JSON.parse(data);
            const user = users.find(
                user => user.id == id
            );
            res.end(JSON.stringify(user));
        });
    } else {
        res.end('The Path is wrong');
    }
});

createServer.listen(3000, () => {
    console.log("The server running successful");
});