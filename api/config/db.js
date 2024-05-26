const mysql = require('mysql2');

const connectDB = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"restaurant"
});

connectDB.connect((err)=>{
    if(err){
        console.log("Something went wrong DB"+err);
    }else{
        console.log("Database connected successfully");

    }
})

module.exports = connectDB;