import mysql from 'mysql';

const dbConn = mysql.createConnection({
    host     : 'sql11.freesqldatabase.com',
    user     : 'sql11451093',
    password : 'affluent',
    database : 'sql11451093'
});

dbConn.connect((err) => {
    if (err) throw err;
    console.log("Database Connected!");
});

export default dbConn;
