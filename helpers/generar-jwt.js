const jwt = require('jsonwebtoken');


const generarJWT = (uid = '')=> {//uid identificar único de usuario
    return new Promise(( resolve, reject) =>{
        const payload = { uid };
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token)=>{
            if ( err ) {
                console.log(err);
                reject('No se pudo general el token')
            }else{
                resolve( token )
            }
        })
    })
}
module.exports = {
    generarJWT
}
