const nodemailer = require("nodemailer");



async function sendMail(userEmail, link, language) {
  
  return new Promise(
    (resolve, reject) => {
      
        try {
            
            let transporter = nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                tls: {
                    rejectUnauthorized: false,
                },
                auth: {
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD
                }
            });

            const languageEmail = {
                en: {
                    subject: "Resetting the password",
                    text00: "Click on the link below to set a new password.",
                    text01: "RESET PASSWORD"
                },
                fr: {
                    subject: "Réinitialisation du mot de passe",
                    text00: "Cliquez sur le lien ci-dessous pour définir un nouveau mot de passe.",
                    text01: "RÉINITIALISER MOT DE PASSE"
                },
                de: {
                    subject: "Zurücksetzen des Passworts",
                    text00: "Klicken Sie auf den unten stehenden Link, um ein neues Passwort festzulegen.",
                    text01: "PASSWORT ZURÜCKSETZEN"
                }
            }

            const bodyEmail = `
                <h1 style='color:#E50914;'>HYPERTUBE</h1><br><br>
                <div>
                    <p style='color:#227093; font-weight:400; font-size:17px; border:0;'>
                        ${languageEmail[language].text00}<br>
                        <a style='color:#0095f6; font-weight:bold; font-size:16px;'
                        href=${link}
                        >
                            >>>>>${languageEmail[language].text01}<<<<<
                        </a>
                    </p>
                </div><br><br><br>
                <small style='color:#E50914;'>© hypertube-2022</small>`;

            let mail = {
                from: process.env.MAIL_USERNAME,
                to: userEmail,
                subject: languageEmail[language].subject,
                html: bodyEmail
            }

            transporter.sendMail(mail, (err, info) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    console.log(info);
                resolve(true);
                }
            });
            
        }
        catch (e) {
            reject(e);
        }
    
    })

}

module.exports = sendMail;