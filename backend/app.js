const express = require('express');  // Ici, nous importons le package express pour creer des applications express
const xss = require('xss-clean');
const helmet = require("helmet");  // Ici, nous importons le package helmet Helmet nous aide à sécuriser nos applications Express.js en définissant divers en-têtes HTTP
const app = express();
const routesPosts = require('./routes/routesPosts');
const routesUsers = require('./routes/routesUsers');
const routesModera = require('./routes/routesModera');
const { join } = require('path');

app.use(xss());
app.use (helmet()); 
app.use(express.json());

// Middleware appliqué à toutes les routes, permettant l'envoie de requête et d'accéder à l'API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/images', express.static(join(__dirname, 'images')));
app.use('/api/posts', routesPosts);
app.use('/api/auth', routesUsers);
app.use('/api/moderation', routesModera);  // Enregistrement du routeur pour toutes les demandes effectuées vers /api/moderation

module.exports = app;  // Donne l'accès depuis les autres fichiers, notamment le serveur Node
