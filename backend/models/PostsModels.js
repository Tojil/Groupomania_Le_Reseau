const connecTodb = require('../connecTodb.js');
const mysql = require('mysql');
const fs = require('fs');


class PostsModels {
    constructor() {
    }
    getAllPosts(){  //  Récupére tous les posts(publication) depuis la base de données
        let sql = "SELECT posts.id, posts.userId, posts.title, posts.content, DATE_FORMAT(DATE(posts.date), '%d/%m/%Y') AS date, TIME(posts.date) AS time, posts.likes, posts.media, users.lastName, users.firstName FROM posts JOIN users ON posts.userId = users.id ORDER BY posts.date DESC";
        return new Promise((resolve) =>{
            connecTodb.query(sql, function (err, result, fields) {
                if (err) throw err;
                resolve(result)
            });
        })
    }
    createPost(sqlInserts){  // Crée un nouveau post(publication) dans la base de données
        let sql = 'INSERT INTO posts (userId, title, content, date, likes, media) VALUES(?, ?, ?, NOW(), 0, ?)';
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve) =>{
            connecTodb.query(sql, function (err, result, fields) {
                if (err) throw err;
                resolve({message : 'Nouveau post !'});
            })       
        })
    }
    updatePost(sqlInserts1, sqlInserts2){  //  Met à jour un post(publication) modifié dans la base de données
        let sql1 = 'SELECT * FROM posts where id = ?';
        sql1 = mysql.format(sql1, sqlInserts1);
        return new Promise((resolve) =>{
            connecTodb.query(sql1, function (err, result, fields){
                if (err) throw err;
                if(sqlInserts2[3] == result[0].userId){
                    let sql2 = 'UPDATE posts SET title = ?, content = ? WHERE id = ? AND userId = ?';
                    sql2 = mysql.format(sql2, sqlInserts2);
                    connecTodb.query(sql2, function (err, result, fields){
                        if (err) throw err;
                        resolve({message : 'Post modifié !'});
                    })
                }else{
                    reject({error: 'fonction indisponible'});
                }
            })
        });
    }
    deletePost(sqlInserts1, sqlInserts2){  //  Supprime un post(publication) de la base de données
        let sql1 = 'SELECT * FROM posts where id = ?';
        sql1 = mysql.format(sql1, sqlInserts1);
        return new Promise((resolve, reject) =>{    
            connecTodb.query(sql1, function (err, result, fields){
                    const filename = result[0].media;
                    console.log(filename);
                    fs.unlink(filename, () => console.log("ok"));
                if (err) throw err;
                if(sqlInserts2[1] == result[0].userId){
                    let sql2 = 'DELETE FROM posts WHERE id = ? AND userId = ?';
                    sql2 = mysql.format(sql2, sqlInserts2);
                    connecTodb.query(sql2, function (err, result, fields){
                        if (err) throw err;
                        resolve({message : 'Post supprimé !'});
                    })
                }else{
                    reject({error: 'fonction indisponible'});
                }
            });
            
        })
    }
    getComments(sqlInserts){  //  Récupére tous les commentaires depuis la base de données
        let sql = "SELECT comments.comContent, DATE_FORMAT(comments.date, '%d/%m/%Y à %H:%i:%s') AS date, comments.id, comments.userId, users.firstName, users.lastName FROM comments JOIN users on comments.userId = users.id WHERE postId = ? ORDER BY date";
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve) =>{
            connecTodb.query(sql, function (err, result, fields){
                if (err) throw err;
                resolve(result);
            })
        
        })
    }
    createComment(sqlInserts){  //  Crée un nouveau commentaire dans la base de données
        let sql = 'INSERT INTO comments VALUES(NULL, ?, ?, NOW(), ?)';
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve) =>{
            connecTodb.query(sql, function (err, result, fields){
                if (err) throw err;
                resolve({message : 'Nouveau commentaire !'})
            })
        })
    }
    updateComment(sqlInserts1, sqlInserts2){  //  Met à jour un commentaire modifié, dans la bse de données
        let sql1 = 'SELECT * FROM comments where id = ?';
        sql1 = mysql.format(sql1, sqlInserts1);
        return new Promise((resolve) =>{
            connecTodb.query(sql1, function (err, result, fields){
                if (err) throw err;
                if(sqlInserts2[2] == result[0].userId){
                    let sql2 = 'UPDATE comments SET comContent = ? WHERE id = ? AND userId = ?';
                    sql2 = mysql.format(sql2, sqlInserts2);
                    connecTodb.query(sql2, function (err, result, fields){
                        if (err) throw err;
                        resolve({message : 'Commentaire modifié !'});
                    })
                }else{
                    reject({error: 'fonction indisponible'});
                }
            })
        });
    }
    deleteComment(sqlInserts1, sqlInserts2){  //  Suprime un commentaire de la base de données
        let sql1 = 'SELECT * FROM comments where id = ?';
        sql1 = mysql.format(sql1, sqlInserts1);
        return new Promise((resolve, reject) =>{
            connecTodb.query(sql1, function (err, result, fields){
                if (err) throw err;
                if(sqlInserts2[1] == result[0].userId){
                    let sql2 = 'DELETE FROM comments WHERE id = ? AND userId = ?';
                    sql2 = mysql.format(sql2, sqlInserts2);
                    connecTodb.query(sql2, function (err, result, fields){
                        if (err) throw err;
                        resolve({message : 'Commentaire supprimé !'});
                    })
                }else{
                    reject({error: 'fonction indisponible'});
                }
            
            });
        })
    }

    
    getAllLikes(){  //  Récupére tous les likes depuis la base de données
        let sql = 'SELECT * FROM likes';
        return new Promise((resolve) =>{
            connecTodb.query(sql, function (err, result, fields) {
                if (err) throw err;
                resolve(result)
            });
        })
    }
    postLike(sqlInserts1, sqlInserts2, liked){  //  Ajoute ou supprime un like dans la base de données
        let sql1 = 'INSERT INTO likes VALUES (NULL, ?, ?)'; 
        sql1 = mysql.format(sql1, sqlInserts1);
        let sql2 = 'UPDATE posts SET likes = ? WHERE id = ?';
        sql2 = mysql.format(sql2, sqlInserts2);
        let sql3 = 'DELETE FROM likes WHERE postId = ? AND userId = ?';
        sql3 = mysql.format(sql3, sqlInserts1);
        return new Promise((resolve) =>{
            connecTodb.query(sql2, function (err, result, fields){
                if (err) throw err;
                
            });
            if(liked === false){
                connecTodb.query(sql1, function (err, result, fields){
                    if (err) throw err;
                    resolve({ message: 'Like !'})
                })
            }
            if(liked === true){
                connecTodb.query(sql3, function(err, result, fields){
                    if(err) throw err;
                    resolve({ message : 'Like annulé!' })
                })
            }
        })

    }
};

module.exports = PostsModels;