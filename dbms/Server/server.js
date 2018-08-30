const express = require("express");
const http=require("http")
const axios= require("axios");
const mysql = require('mysql');
const socketio=require("socket.io");

const path= require('path');

const db= require('./createDb.js');
const publicPath=path.join(__dirname,'../public');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "mydb"
  });
  
db.create();

var app= express();

var server=http.createServer(app);
var io=socketio(server);

app.use(express.static(publicPath));
io.on('connection', (socket)=>{
    console.log("User connected");
    socket.on('disconnect',()=>{
        console.log("Client disconnected");
    });
});

app.get('/',(req,res) => {
    res.send();
});
// app.get('/table',(req,res) => {
//     res.render(`${publicPath}/try.html`,{});
// });
var str="";
axios.get("https://api.iextrading.com/1.0/stock/market/collection/sector?collectionName=Health%20Care")
.then((response) => {
    for(i=0;i<10;i++)
    {
        sql = `INSERT INTO stocks VALUES(${JSON.stringify(response.data[i].symbol)},${JSON.stringify(response.data[i].latestPrice)},${JSON.stringify(response.data[i].changePercent)})`;
        con.query(sql, function (err, result) {
            if(err) throw err;

    });
    }
// con.connect(function(err) {
//     if (err) throw err;

io.on('connection',(socket)=>{

con.query("SELECT * FROM stocks", function (err, result, fields) {
        if (err) throw err;
        socket.emit('tabledata',result);
    });
});
}).catch((e) => {
console.log("Promise rejected");
});
// });
server.listen(3000, () => {
    console.log("Server is up on port 3000");
});