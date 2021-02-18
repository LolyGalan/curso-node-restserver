const { response } = require('express');
const Usuario = require('../models/usuario');

const bcrypts = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req,res = response) => {

    const { correo, password }= req.body;
    try {

        //Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if(!usuario){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos '
            })
        }
        //Verificar si el usuario está activo
        
        if(!usuario.estado){
            return res.status(400).json({
                msg:'Usuario no registrado '
            })
        }
        //Verificar la contraseña
        const validPassport = await bcrypts.compareSync(password, usuario.password)
        if(!validPassport){
            return res.status(400).json({
                msg:'Password no correcto '
            })
        }
        //Generar el JWT
        const token = await generarJWT( usuario.id)
        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
    
}
const googleSignin = (req, res = response) =>{
    const { id_token } = req.body;
    res.json({
        msg: 'Todo ok googlesignin',
        id_token
    })
}
module.exports = {
    login,
    googleSignin
}