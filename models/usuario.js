const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true//Para que no se pudan dar dos correos iguales en dos usuarios distintos
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado:{
        type:Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});
UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;//Con esto hemos cambiado id por uid cuando lo renderizamos en Postman
    return usuario
}
module.exports = model( 'Usuario', UsuarioSchema);