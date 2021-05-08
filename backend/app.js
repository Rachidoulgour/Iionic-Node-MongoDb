const express = require('express');

const cors = require('cors');
//const path = require('path');



const app = express();


//settings
app.set('port', process.env.PORT || 5500);

//CORS
app.use(express.json());
//app.use(cors());



//app.use('/uploads', express.static(path.resolve('uploads')));



module.exports = app;