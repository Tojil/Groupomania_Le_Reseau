
const jwt = require('jsonwebtoken');  //jwt permet l'échange sécurisé de jetons (tokens)
const connecTodb = require('../connecTodb.js');
const mysql = require('mysql');

// Middleware d'authentification
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];  // il va recuperer le token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');  // il va decoder et verifier le token
        const userId = decodedToken.userId;  // il va recuperer l'id de l'utilisateur qui est encodé dans le token
        let sqlInserts = [userId];
        let sql = 'SELECT COUNT(id) FROM users WHERE id=?';
        sql = mysql.format(sql, sqlInserts); 
        connecTodb.query(sql, function(err, result){
            if (err) reject({error : 'Erreur dans l\'inscription'});
            if (result[0]['COUNT(id)'] !== 1) {
                throw 'Token invalide';
            } else {
                next();
            }
        })
    } catch (error) {
        res.status(401).json({error: error | 'Requête non authentifiée!'})
    }
}; 