const nodemailer = require("nodemailer");

async function enviarCorreo(req, res, next){
   
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "ricky.vandervort47@ethereal.email", // generated ethereal user
            pass: "sB2CWZ7kefQjV4Zjyk", // generated ethereal password
        },
    });


    let message = {
        from: "Remitente",
        to: "wwe_abascal-654@hotmail.com",
        subject: "Message title",
        text: "Hola hemos recibido tu correo, en breve uno de nuestros tecnicos se pondra en contacto contigo"
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

