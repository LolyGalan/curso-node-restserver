const { request, response} = require('express');

const usuariosGet = (req = request, res = response)=>{
    const query = req.query;//para traernos los datos de la query que ponemos en la url
    res.json({
        "ok": true,
        "msg": "get API- controlador",
        query
    });
}

const usuariosPost = (req, res = response) => {
    const { nombre, edad } = req.body;//solo nos traemos del body los parametro nombre y edad
    //const body = req.body;Así nos traemos todo lo que hubiera en el body
    res.json({
        "ok": true,
        "msg": "post API",
        nombre,
        edad
    });
}

const usuariosPut = (req, res = response)=> {
    const { id } = req.params;
    res.json({
        "ok": true,
        "msg": "put API",
        id
    });
}

const usurariosDelete = (req, res = response) =>{
    res.json({
        "ok": true,
        "msg": "delete API"
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
    usurariosDelete,
    usuariosPatch
}