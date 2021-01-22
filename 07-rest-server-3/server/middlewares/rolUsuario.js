 

 let usuarioRol = (req, res, next) => {
    if(req.usuario.role === "ADMIN_ROLE"){
        next();
    }else{
        return res.status().json({
            ok: false,
            error: {
                message: "Solo los administradores pueden realizar estas acciones"
            }
        });
    }
 }


 module.exports = {
    usuarioRol
 }