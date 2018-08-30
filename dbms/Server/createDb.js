const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "mydb"
  });
var create=()=>{
con.connect(function(err) {
    if (err) throw err;
    else
    console.log("Connected!");
    var sql = "DROP TABLE stocks";
    con.query(sql, function (err1, result) {
         if(err1) throw err1;
         else
         console.log("table dropped!");
      });
    sql = "CREATE TABLE stocks (name VARCHAR(20), marketprice VARCHAR(10),perclose VARCHAR(10))";
    con.query(sql, function (err2, result) {
      if (err2){console.log("Database Open");} 
      else if(err2) throw err2;
      else
      console.log("Database created");
    });
  });
};


module.exports={
    create
}