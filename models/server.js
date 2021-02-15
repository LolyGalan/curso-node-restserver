const express = require('express');
const cors = require('cors');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        //Midelwares
        this.middlewares();
        //Rutas de mi aplicación
        this.routes();
    }
    middlewares(){
        //Cors
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use( express.json() );
        //Directorio publico
        this.app.use( express.static('public'));
    }
    routes() {
        this.app.use(this.usuariosPath, require('../routes/user.routes'));
    }
    listen() {
        this.app.listen( process.env.PORT, () => {
            console.log('Servidor corriendo en puerto', this.port );
        })
    }
};
module.exports = Server;