const User = require('../models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')




function saveUser(req, res) {
    let params = req.body;
    const user = new User();
    if (params.username && params.email && params.password) {
        user.username = params.username;
        user.email = params.email;
        user.password = params.password;
        user.terms = params.conditions;
        user.role = 'user';
        user.avatar = null;
       

        User.find({
            $or: [{
                    email: user.email.toLowerCase()
                },
                {
                    username: user.username.toLowerCase()
                }
            ]
        }).exec((err, users) => {
            if (err) return res.status(500).send({
                message: 'error a la peticion de usuarios'
            })
            if (users && users.length >= 1) {
                return res.status(200).send({
                    message: 'El usuario ya esta registrado'
                })
            } else {
                bcrypt.hash(params.password, 10, async (err, hash) => {
                    user.password = hash;

                    user.save(async (err, userSaved) => {
                        if (err) return res.status(500).send({
                            message: 'error al guardar usuario'
                        });
                        if (userSaved) {
                            const token = jwt.sign({
                                _id: userSaved._id
                            }, process.env.TOKEN_SECRET || "Tokenimage");
                            console.log(token)
                            
                            
                            res.json({
                                token: token,
                                user_id: userSaved._id,
                                message: "Usuario regitrsado"
                            });;
                        } else {
                            res.status(404).send({
                                message: 'no se ha registrado el usuario'
                            })
                        }
                    });
                })
            }
        });


    } else {
        res.status(200).send({
            message: 'rellena todos los campos'
        })
    }
}

function login(req, res) {
    const params = req.body;
    const email = params.email;

    const password = params.password;

    User.findOne({
        email: email
    }, (err, user) => {
        if (err) return res.status(500).send({
            message: 'error en la petición'
        });
        //console.log("Error",err)
        if (user) {
            
            
            bcrypt.compare(password, user.password, (err, check) => {
                if (check) {
                    user.password = undefined;
                    const token = jwt.sign({
                        _id: user._id
                    }, process.env.TOKEN_SECRET || "Tokenimage", {
                        expiresIn: 60 * 60 * 24
                    });
                    
                    {
                        res.json({
                            token: token,
                            user: user
                        });
                    }

                } else {
                    return res.status(404).send({
                        message: 'no se ha podido identificar'
                    })
                }
            });
        
        } else {
            return res.status(404).send({
                message: 'El usuario no se ha podido identificar'
            })
        }
    })
}




module.exports = {
    saveUser,
    login
}