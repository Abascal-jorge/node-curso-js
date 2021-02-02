const jwt = require("jsonwebtoken");

let verificaToken = ( req, res, next ) => {
    let token = req.get("token");

    jwt.verify(token, process.env.SEED, ( error, decoded ) => {
        if(error){
            return res.status(401).json({
                ok: false,
                error
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};

let verificaTokenImagen = (req, res, next) => {
    let token = req.query.token;

    jwt.verify(token, process.env.SEED, ( error, decoded ) => {
        if(error){
            return res.status(401).json({
                ok: false,
                error
            });
        }
        req.usuario = decoded.usuario;
        next();
    });  
}

module.exports = {
    verificaToken,
    verificaTokenImagen
}