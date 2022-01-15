const connecTodb = require('../connecTodb.js');
const mysql = require('mysql');
const bcrypt = require('bcrypt');  //bcrpyt permet un cryptage sécurisé
const jwt = require('jsonwebtoken');  //jwt permet l'échange sécurisé de jetons (tokens)

class UserModels {
    constructor() {
    }
    signup(sqlInserts){  // Enregistre un nouvel utilisateur dans la base de données
        let sql = 'INSERT INTO users VALUES(NULL, ?, ?, ?, ?, NULL, ?)';
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve, reject) =>{
            connecTodb.query(sql, function(err, result){
                if (err) reject({error : 'Erreur dans l\'inscription'});
                resolve({message : 'Nouvel utilisateur !'})
            })
        })
    }
    login(sqlInserts, password){   //  Vérifie que l'utilisateur a bien un compte d'enregistré
        let sql = 'SELECT * FROM users WHERE email = ?';
        sql = mysql.format(sql, sqlInserts);
        
        return new Promise((resolve, reject) =>{
            connecTodb.query(sql, function(err, result){
                if (err) reject({ err });
                if (!result[0]){
                    reject ({ error : 'Utilisateur introuvable !'});
                } else {
                    bcrypt.compare(password, result[0].password) 
                        .then(valid => { 
                            if (!valid) return reject({ error: 'Mot de passe incorrect !' });
                            resolve({
                                userId: result[0].id,
                                token: jwt.sign(
                                    { userId: result[0].id,
                                    moderation: result[0].moderation },
                                    'RANDOM_TOKEN_SECRET',
                                    { expiresIn: '24h' } 
                                ),
                                moderation: result[0].moderation
                            });
                        })
                        .catch(error => reject({ error }));
                }
            })
        
        })
    }
    seeMyProfile(sqlInserts){  // Permet d'afficher le profil de l'utilisateur avec les données depuis la base de données
        let sql = 'SELECT firstName, lastName, email, imageProfil FROM users WHERE id = ?';
        sql = mysql.format(sql,sqlInserts);
        return new Promise((resolve, reject) =>{
            connecTodb.query(sql, function(err, result){
                if (err) return reject({error : 'page indisponible'});
                resolve(result);
            }) 

        })
    
    }
    updateUser(sqlInserts){ //  Met à jour les modifications de l'utilisateur, dans la base de données
        let sql = 'UPDATE users SET firstName = ?, lastName = ?, email = ?, imageProfil = ? WHERE id = ?';
        sql = mysql.format(sql,sqlInserts);
        return new Promise((resolve, reject) =>{
            connecTodb.query(sql, function(err, result){
                if (err) return reject({error : 'fonction indisponible'});
                resolve({message : 'Informations mises à jour !'});
            }) 

        })
    }
    deleteUser(sqlInserts){  // Supprime l'utilisteur de la base de données
        let sql = 'DELETE FROM users WHERE id = ?'; 
        sql = mysql.format(sql,sqlInserts);
        return new Promise((resolve, reject) =>{
            connecTodb.query(sql, function(err, result){
                if (err) return reject({error : 'fonction indisponible'});
                resolve({message : 'Utilisateur supprimé'});
            }) 

        })
    
    }
}

module.exports = UserModels;
