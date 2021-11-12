const mysql = require('mysql');
console.log('Connexion à la base de données...');
let connecTodb = mysql.createConnection({ 
    host: 'localhost',
    user: 'root', 
    password: 'tojil1908', 
    database: 'groupomania_le_reseau_db', 
});

connecTodb.connect((err) => {
    if (err)
        throw err;
    console.log('Connecté!');
});
// connecTodb.connect(function(err) { 
//     if (err) throw err;
//     console.log('Connecté!')
// });

module.exports = connecTodb;

