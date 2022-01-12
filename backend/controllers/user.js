const bcrypt = require('bcrypt');  //bcrpyt permet un cryptage sécurisé
const jwt = require('jsonwebtoken');  //jwt permet l'échange sécurisé de jetons (tokens)
const connecTodb = require('../connecTodb.js');
const mysql = require('mysql');
const UserModels = require ('../Models/UserModels.js')

let userModels = new UserModels();

// Enregistrement d'un nouvel usager
exports.signup = (req, res, next) => {
    let email = req.body.email;
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
    console.log()
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
    console.log(req.file)
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let imageProfil = req.file.path;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let sqlInserts = [firstName, lastName, email, imageProfil, userId];
    console.log("before update");
    userModels.updateUser(sqlInserts)
        .then((response) =>{
            console.log(response);
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
 


