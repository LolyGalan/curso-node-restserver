const { request, response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { emailExiste } = require('../helpers/db-validators');


const usuariosGet = async (req = request, res = response)=>{
    //const { q, nombre = 'No name', apikey, page = 1, limit} = req.query;//para traernos los datos de la query que ponemos en la url
    const { limite = 5, desde = 0} = req.query;
    const query = {estado: true};
    const [total, usuarios] = await Promise.all([
        Usuario.find(query),
        Usuario.count(query)
         .skip(Number(desde))
         .limit(Number(limite))
    ])
    res.json({
        total,
        usuarios
        //total,
        //usuarios
    });
}

const usuariosPost = async (req, res = response) => {
    
    const { nombre, correo, password, rol} = req.body;//solo nos traemos del body los parametro nombre y edad
    //const body = req.body;Así nos traemos todo lo que hubiera en el body
    const usuario = new Usuario( {nombre, correo, password, rol} );

    
    
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);//hashSync metodo para encriptar en una sola vuelta, necesita como argumentos el password y el salt
    
    //Guardar en base de datos
    await usuario.save();
    res.json({
        "ok": true,
        "msg": "post API",
        usuario
    });
}

const usuariosPut = async(req, res = response)=> {
    const { id } = req.params;
    const { password, google, correo,...resto } = req.body;//lo que no necesitamos que se grabe lo extraemos almeterlo entre llaves
    //TODO validar contr base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt); 
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

const usuariosDelete = async (req, res = response) =>{
    const { id } =req.params;

    //const uid = req.uid;
    //Lo borramos físicamente
    //const usuario = await Usuario.findByIdAndDelete( id );Así lo borraríamos de la bbdd
    const usuario = await Usuario.findByIdAndUpdate( id, {estado: false} );
    const usuarioAutenticado = req.usuario;
    res.json({
        usuario,
        usuarioAutenticado
    });
}

const usuariosPatch = (req, res = response)=> {
    res.json({
        msg: 'patch API'
    })
}
module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}