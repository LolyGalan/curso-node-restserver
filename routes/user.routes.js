const { Router } = require('express');
const { usuariosGet, usuariosPatch, usuariosPost, usuariosPut, usurariosDelete  } = require('../controllers/user.controllers');
const router = Router();

router.post('/', usuariosPost);
router.put('/:id', usuariosPut);//para poder buscar por algún parámetro ponemos : y el parámetro 
router.delete('/', usurariosDelete);
router.get('/', usuariosGet);
router.patch('/', usuariosPatch);


module.exports = router;