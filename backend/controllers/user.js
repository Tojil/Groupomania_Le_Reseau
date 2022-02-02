const bcrypt = require('bcrypt');  //bcrpyt permet un cryptage sécurisé
const jwt = require('jsonwebtoken');  //jwt permet l'échange sécurisé de jetons (tokens)
const connecTodb = require('../connecTodb.js');
const mysql = require('mysql');
const UserModels = require ('../Models/UserModels');
const fs = require('fs');
const { response } = require('express');

let userModels = new UserModels();

// Enregistrement d'un nouvel usager
exports.signup = (req, res, next) => {
    let email = req.body.email;
    // let sqlInserts = [email];
    // mysql.createPool.query(sqlInserts, [email], (error, results) => {
    //     if(results.rows.length) {
    //         res.send("Cette email existe déjà")
    //     }
    // })
	let password = req.body.password;
	let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    bcrypt.hash(password, 10)
        .then (hash => {
            let sqlInserts = [lastName, firstName, email, hash];
            userModels.signup(sqlInserts)
                .then((response) =>{
                    res.status(201).json(JSON.stringify(response))
                })
                .catch((error) =>{
                    console.error(error);
                    res.status(400).json({error})
                })
        })
        .catch(error => res.status(500).json(error)) 
};
// Login d'un usager
exports.login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    let sqlInserts = [email];
    userModels.login(sqlInserts, password)
        .then((response) =>{
            res.status(200).json(response);
        })
        .catch((error) =>{
            res.status(400).json(error)
        })
}
// Permet de voir le profil
exports.seeMyProfile = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let sqlInserts = [userId];
    userModels.seeMyProfile(sqlInserts)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response))
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).json(error)
        })
}   
// Met à jour les informations de l'utilisateur
exports.updateUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let imageProfil = undefined;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let sqlInserts = undefined;
    if (req.file){
        imageProfil = req.file.path;
        sqlInserts = [firstName, lastName, email, imageProfil, userId];
    } else {
        sqlInserts = [firstName, lastName, email, userId];
    }
    userModels.updateUser(sqlInserts)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response))
        })
        .catch((error) =>{
            res.status(400).json(error)
        })
}
 //  Supprime un utilisateur
exports.deleteUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let sqlInserts = [userId];
    userModels.deleteUser(sqlInserts)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response))
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).json(error)
        })
}

exports.deleteImage = (req, res, next) => {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        userModels.seeMyProfile([userId]).then(user => {
        const filename = user[0].imageProfil; 
        fs.unlink(filename, () => console.log("ok")); 
    })
  }
 


