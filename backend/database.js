const mongoose =require('mongoose');
require('dotenv').config()
async function startConnection(){
    await mongoose.connect('mongodb://localhost/ionicbooks', {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }).then(()=>{
        console.log('database is connected');
    }, error=>{
        console.log(error)
    })
    
}


module.exports = startConnection;