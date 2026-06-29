const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
//==================Add Users=================

// app.post("/addUsers", (req, res) => {
//     const newUser = req.body;

//     fs.readFile("users.json", "utf8", (err, data) => {
//         const users = JSON.parse(data);

//         const existUser = users.find(
//             user => user.id === newUser.id,
//         );

//         if (existUser) {
//             return res.json({ message: "User is Already exist" });
//         } else {
//             users.push(newUser);
//             fs.writeFile("users.json", JSON.stringify(users, null, 2), (err, data) => {
//                 res.json({ message: "User already added successful" });
//             });
//         }
//     });
// })

//==================PATCH By Id=================
// app.patch("/userPatch/:id", (req, res) => {
//     const id = Number(req.params.id);

//     fs.readFile("users.json", "utf8", (err, data) => {
//         const users = JSON.parse(data);

//         const existUser = users.findIndex(
//             user => user.id === id,
//         );

//         if (existUser === -1) {
//             return res.status(404).json({ message: "user not found" });
//         }
//         const updatedData = req.body;

//         const updatedUser = {
//             ...users[existUser], ...updatedData,
//         };

//         users[existUser] = updatedUser;

//         fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
//             res.status(200).json({ message: "updated data doen", user: updatedUser });
//         });
//     });
// });

//==================Delete By Id=================
// app.delete("/userDelete/:id", (req, res) => {
//     const id = Number(req.params.id);

//     fs.readFile("users.json", "utf8", (err, data) => {
//         const users = JSON.parse(data);

//         const existUser = users.findIndex(
//             user => user.id === id,
//         );

//         if (existUser === -1) {
//             return res.status(404).json({ message: "user not found" });
//         }

//         users.splice(existUser,1);
        
//         fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
//             res.status(200).json({ message: "deleted data doen" });
//         });
//     });
// });


//==================Get User By Name=================
// app.get("/getUserByName/:name" , (req, res) => {

// const name = req.params.name;
//     fs.readFile("users.json", "utf8", (err, data) => {

//         const users = JSON.parse(data);

//         const existUser = users.find(
//             user => user.name === name,
//         );
//         res.json(existUser);
//     });
// });

//==================Get All Users=================

// app.get("/getAllData",(req,res)=>{
//      fs.readFile("users.json","utf8",(err,data)=>{
//         const users = JSON.parse(data);
//         res.json({users:users});
//      });
// });


//==================Get User Filter By Age=================

// app.get("/GetUserFilter/:minAge" , (req, res) => {
//     const minAge = Number(req.params.minAge);

// const name = req.params.name;
//     fs.readFile("users.json", "utf8", (err, data) => {

//         const users = JSON.parse(data);

//         const filterUser = users.filter(user=> user.age >= minAge);

//         res.status(200).json(filterUser);
//     });
// });


//==================Get User By Id=================
app.get("/getUser/:id" , (req, res) => {

const id = Number(req.params.id);
    fs.readFile("users.json", "utf8", (err, data) => {

        const users = JSON.parse(data);

        const existUser = users.find(
            user => user.id === id,
        );
        res.json(existUser);
    });
});




app.use("{/*demo}", (req, res, next) => {
    res.status(400).json({ message: "url not found 404" });
});


app.listen(3000, () => {
    console.log("Server is running on port=3000");
})
