const User = require('../models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')




export function saveUser(req, res) {
    let params = req.body;
    const user = new User();
    if (params.username && params.email && params.password) {
        user.username = params.username;
        user.email = params.email;
        user.password = params.password;
        user.role = 'user';
        user.terms = params.conditions;
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