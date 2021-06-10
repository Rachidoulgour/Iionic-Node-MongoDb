const express = require('express');

const cors = require('cors');
//const path = require('path');



const app = express();

const user_routes = require('./routes/users')


//settings
app.set('port', process.env.PORT || 5500);

//CORS
app.use(express.json());
//app.use(cors());

app.use('/api', user_routes);



//app.use('/uploads', express.static(path.resolve('uploads')));



module.exports = app;