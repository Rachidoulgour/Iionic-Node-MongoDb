const express = require('express');
const PublicationController = require('../Controllers/publication');
const api = express.Router();
//const authentication = require('../middleware/autenticated');

const multipart = require('connect-multiparty');
const upload = multipart({uploadDir: './uploads'});

api.post('/publication/:userId', PublicationController.savePublication);
api.post('/upload-image-pub/:id', upload ,PublicationController.uploadAvatar);
api.get('/pub-image', PublicationController.getAvatarFile);



module.exports = api;