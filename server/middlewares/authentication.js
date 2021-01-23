//verificacion del token
const jwt = require('jsonwebtoken');

let verificaToken = (req, res, next) => {
    //next continua la ejecucion del programa
    //obengo los headers
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decode) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            })
        }

        //el usuario llega en el payload 
        req.usuario = decode.usuario;
        next();
    });


    //console.log(token);

};

//VERIFICA SI ES ADMIN

let verificaAdmin = (req, res, next) => {

    let usuario = req.usuario;
    let token = req.get('token');

    if (usuario.role === 'ADMIN_ROLE') {
        next();

    } else {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'Este usuario no es ADMINISTRADOR'
            }
        });
    }

}

module.exports = {
    verificaToken,
    verificaAdmin
}