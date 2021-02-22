const nodemailer = require("nodemailer");

async function enviarCorreo(req, res){
    
    let datos = req.body;
    const {nombre, apellido, telefono, correo, mensaje} = datos.datos;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user:"pcspyder86@gmail.com",
            pass: "abascal12345"
        }
    });


    let message = {
        from: "Spyder Pc",
        to: [correo, "pcspyder86@gmail.com"],
        subject: "Spyder PC Reparaciones",
        text: `Hola buenas tardes ${nombre} ${apellido}, \nHemos recibido tu correo, pronto un ingeniero se contractara contigo para darle seguimiento a tu problema.\n\nNombre: ${nombre} ${apellido}\nTelefono: ${telefono}\nCorreo: ${correo}\nDescripción Problema: ${mensaje}\n\nSaludos Buen Día.`
    };


   transporter.sendMail(message, (err, info) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json(info);
   });
}

module.exports = enviarCorreo;

/*host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "ricky.vandervort47@ethereal.email", // generated ethereal user
            pass: "sB2CWZ7kefQjV4Zjyk", // generated ethereal password
        }, 
        
        
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "ricky.vandervort47@ethereal.email", // generated ethereal user
            pass: "sB2CWZ7kefQjV4Zjyk", // generated ethereal password
        },
        tls:{
            rejectUnauthorized: false
        }
        
        
        */