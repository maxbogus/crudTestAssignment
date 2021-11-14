import mysql from 'mysql';

const dbConn = mysql.createConnection({
    host     : 'www.db4free.net',
    port: 3306,
    user     : 'affluenttestadm',
    password : 'affluent',
    database : 'affluenttesttask'
});

dbConn.connect((err) => {
    if (err) throw err;
    console.log("Database Connected!");
});

export default dbConn;
