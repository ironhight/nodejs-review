const fs = require("fs");

// const bookJSON = JSON.stringify(book); //chuyen object or array thanh json
// fs.writeFileSync("test.json", bookJSON);
const dataJSON = fs.readFileSync("test.json");
const obj = JSON.parse(dataJSON);
obj.title = "aaaa";
obj.author = "huhu";

// fs.writeFileSync("test.json", JSON.stringify(obj)); //ghi de file
const objJSON = JSON.stringify(obj);
fs.writeFileSync("test.json", objJSON);
// const bookObj = JSON.parse(bookJSON);
// console.log(bookJSON);
// console.log(bookObj);
