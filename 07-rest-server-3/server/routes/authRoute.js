const express = require("express");
const Usuario = require("../models/usuarioModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const app = express();


app.post("/auth", ( req, res ) => {
    let datos = req.body;
    Usuario.findOne({email: datos.email}, ( error, usuario ) => {
        if(error){
            return res.status(500).json({
                ok:false,
                error
            });
        }
        
        if(!usuario){
            return res.status(400).json({
                ok: false,
                error: {
                    message: "Usuario o contraseña no validos"
                }
            });
        }

        //Comparar la contraseña encryptadas
        if( !bcrypt.compareSync( datos.password, usuario.password ) ){
            return res.status(400).json({
                ok: false,
                error: {
                    message: "Contraseña no valida"
                }
            });
        }

        //Generar un json web token
        let token = jwt.sign({
            usuario
        }, process.env.SEED,{ expiresIn: process.env.CADUCIDAD_TOKEN } );

        res.json({
            ok: true,
            usuario,
            token
        });
    });
});


/*CONGIGURACION GOOGLE */
async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
  });
  const payload = ticket.getPayload();
  

  return {
      nombre: payload.name,
      email: payload.email,
      img: payload.picture,
      google: true
  }
}



app.post("/google", async ( req, res ) => {
        let token = req.body.token;

        //console.log(`Token por body: ${token}`);

        let usuarioGogle = await verify(token)
                            .catch(error => {
                                return res.status(400).json({
                                    ok: false,
                                    error
                                })
                            });

        //console.log(usuarioGogle);

        Usuario.findOne({email: usuarioGogle.email}, ( error, usuarioDB ) => {
            if(error){
                return res.status(500).json({
                    ok: false,
                    error
                });
            }
            //console.log(usuarioDB);
            if(usuarioDB){
                //console.log(usuarioDB);
                if(usuarioDB.google === false){
                    return res.status(400).json({
                        ok: false,
                        error: {
                            message: "Debes iniciar sesión, con tu correo o contraseña"
                        }
                    });
                }else{
                    let token = jwt.sign({
                        usuario: usuarioDB
                    }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN});

                    return res.json({
                        ok: true,
                        usuario: usuarioDB,
                        token
                    });
                }
            }else{
                //Si el usuario n  existe en la base de datos
                let usuario = new Usuario({
                    nombre: usuarioGogle.nombre,
                    email: usuarioGogle.email,
                    img: usuarioGogle.img,
                    google: usuarioGogle.google,
                    password: ":)="
                });

                usuario.save(( error, usuarioDB ) => {
                    if(error){
                        return res.status(400).json({
                            ok: false,
                            error
                        });
                    }

                    let token = jwt.sign({
                        usuario: usuarioDB
                    }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN});

                    res.json({
                        ok: true,
                        usuario: usuarioDB,
                        token
                    });

                });
            }
        });

});


module.exports = app;