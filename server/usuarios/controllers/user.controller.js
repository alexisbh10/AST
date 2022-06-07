var User = require('../models/user')
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');
const user = require('../models/user');

function registrar(req, res){
    var params = req.body;
    var user = new User();

    if (params.password){
        bcrypt.hash(params.password,null,null,function(err,hash){
            if (hash){
                user.password = hash;
                user.nombre = params.nombre;
                user.apellidos = params.apellidos;
                user.email = params.email;
                user.role = params.role;

                user.save((err,user_save)=>{
                    if (err){
                        res.status(500).send({error: 'No se ha añadido el usuario'});
                    } else {
                        res.status(200).send({user:user_save});
                    }
                });
            }
        });
    } else {
        res.status(403).send({error: 'No se ha ingresado una contraseña'});
    }
}

function login(req,res){
    var data = req.body;

    User.findOne({email: data.correo}, (err,user_data)=>{
        if (err){
            res.status(500).send({message: 'Error en el servidor'});
        } else {
            if (user_data){
                bcrypt.compare(data.password,user_data.password, function(err,check){
                    if (check){
                        if (data.gettoken){
                            res.status(200).send({
                                user:user_data,
                                jwt: jwt.createToken(user_data)
                            })
                        } else {
                            res.status(200).send({
                                user: user_data,
                                message: 'no token',
                                jwt: jwt.createToken(user_data)
                            })

                        }
                    } else {
                        res.status(403).send({error: 'El correo o la contraseña no coinciden'});
                    }
                });
            } else {
                res.status(403).send({error: 'El email no existe'});
            }
        }
    });
}

function listar(req,res){
    User.find((err,users_data)=>{
        if (users_data){
            res.status(200).send({users: users_data});
        } 
    })
}

function editar(req,res){
    var id = req.params['id'];
    var data = req.body;

    if(data.password){
        bcrypt.hash(data.password,null,null,function(err,hash){
            if (hash){
                User.findByIdAndUpdate(id,{nombre: data.nombre, password: hash, email: data.email, role: data.role},(err,user_edit)=>{
                    if (user_edit){
                        res.status(200).send({user:user_edit});
                        console.log(user_edit)
                    } else {
                        res.status(500).send({message: 'El usuario no se ha podido editar.'});

                    }
                });
            }
        });
    } else {
        User.findByIdAndUpdate(id,{nombre: data.nombre, email: data.email, role: data.role},(err,user_edit)=>{
            if (user_edit){
                res.status(200).send({user:user_edit});
            } else {
                res.status(500).send({message: 'El usuario no se ha podido editar.'});

            }
        });
    }
}

function get_user(req,res){
    var id = req.params['id'];

    User.findById(id,(err,user_data)=>{
        if (user_data){
            res.status(200).send({user: user_data});
        } else {
            res.status(403).send({message: 'No se ha encontrado ningún registro.'});
        }
    })
}


module.exports = {
    registrar,
    login,
    listar,
    editar,
    get_user
}