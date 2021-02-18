const { response, request } = require("express");
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    console.log(token);
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }
    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        const usuario = await Usuario.findById( uid );
        if (!usuario){
            return res.status(401).json({
                msg: 'Token no válido por no encontrarse en bbdd'
        })
        }
        //Verificar si el uid tiene estado en true
        if (!usuario.estado){
            return res.status(401).json({
                msg: 'Token no válido por estado:false'
            })
        }
        req.usuario = usuario;
       //console.log(payload);
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
    
}

module.exports = {
    validarJWT
}