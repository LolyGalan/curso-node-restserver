const Role = require('../models/role');
const { find } = require('../models/usuario');
const Usuario = require('../models/usuario');
const esRoleValido = async(rol = '')=> {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ){
        throw new Error(`El rol ${ rol } no está registrado en la BD`)
    }
}
//Verificar si el correo existe
const emailExiste = async(correo = '1@1.es')=>{
    const existeEmail = await Usuario.findOne({ correo})//Encuentra un correo como el que introducimos
    if (existeEmail){
        throw new Error(`El email ${ correo } ya existe en la base de datos`)
    }
}
const existeUsuarioPorId = async(id)=>{
    const existeUSuario = await Usuario.findById(id)//Encuentra un correo como el que introducimos
    if (!existeUSuario){
        throw new Error(`El id ${ id } no existe en la base de datos`)
    }
}
module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
};