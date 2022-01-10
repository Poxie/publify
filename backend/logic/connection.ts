import mysql from 'mysql2';

let connection: mysql.Connection;
export const initializeConnection = () => {
    connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    })
    
    connection.connect(error => {
        if(error) return console.error(error);
    
        console.log('MySQL connected.');
    })

    return connection;
};

