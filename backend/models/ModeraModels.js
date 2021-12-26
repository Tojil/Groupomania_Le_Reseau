const connecTodb = require('../connecTodb.js');
const mysql = require('mysql');
//  const bcrypt = require('bcrypt');  //bcrpyt permet un cryptage sécurisé
//  const jwt = require('jsonwebtoken');  //jwt permet l'échange sécurisé de jetons (tokens)

class ModModels {
    constructor() {
    }
    //  Récupére tous les posts(publication) depuis la base de données
    getAllPosts(){  
        let sql = "SELECT posts.id, posts.userId, posts.title, posts.content, DATE_FORMAT(posts.date, '%d/%m/%Y à %H:%i:%s') AS date, posts.likes, users.lastName, users.firstName FROM posts JOIN users ON posts.userId = users.id ORDER BY posts.date DESC";
        return new Promise((resolve) =>{
            connecTodb.query(sql, function (err, result, fields) {
                if (err) throw err;
                resolve(result)
            });
        })
    };
    //  Supprime un post(publication) dans la base de données
    deletePost(sqlInserts){ 
        let sql = 'DELETE FROM posts WHERE id = ?';
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve) =>{
            connecTodb.query(sql, function (err, result, fields){
                if (err) throw err;
                resolve({message : 'Post supprimé !'});
            })
        })
    };
    // Récupère tous les commentaires depuis la base de données
    getAllComments(){
        let sql = "SELECT comments.comContent, DATE_FORMAT(comments.date, '%d/%m/%Y à %H:%i:%s') AS date, comments.id, comments.userId, users.firstName, users.lastName FROM comments JOIN users on comments.userId = users.id ORDER BY date DESC";
        return new Promise((resolve) =>{
            connecTodb.query(sql, function (err, result, fields){
                if (err) throw err;
                resolve(result);
            })
        
        })
    };
    //  Supprime un commentaires dans la base de données
    deleteComment(sqlInserts){
        let sql = 'DELETE FROM comments WHERE id = ?';
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve) =>{
            connecTodb.query(sql, function (err, result, fields){
                if (err) throw err;
                resolve({message : 'Commentaire supprimé !'});
            })
        })
    }

}

module.exports = ModModels;