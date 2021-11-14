'use strict';
const mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection({
    host     : 'sql11.freesqldatabase.com',
    user     : 'sql11451093',
    password : 'affluent',
    database : 'sql11451093'
});
dbConn.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
});
module.exports = dbConn;
