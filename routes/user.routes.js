const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPatch, usuariosPost, usuariosPut, usuariosDelete  } = require('../controllers/user.controllers');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const Role = require('../models/role');

const router = Router();


router.post('/', [
    //Con check le decimos el campo del body que queremos validar, lo que hacemos si no es validoy por último lo que tiene que ser
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser de mas de 6 letras').isLength({ min: 6}),
    check('correo').custom( emailExiste),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRoleValido ),
    validarCampos//Si el middleware validarCampos no se ejecuta entonces pasa al controlador
] ,usuariosPost);

router.put('/:id',[
    check('id', 'No es un id válido').isMongoId(), 
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut);//para poder buscar por algún parámetro ponemos : y el parámetro 

router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un id válido').isMongoId(), 
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

router.get('/', usuariosGet);

router.patch('/', usuariosPatch);


module.exports = router;