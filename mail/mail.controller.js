const sgMail = require('@sendgrid/mail')


class MailController{
    constructor() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        this.msg = {
            from: "trailnest1@gmail.com"
        }
    }

    sendEmail(_req,res) {
        
        const msg = {
        ...this.msg,
        to: 'joel.montilla.heredia@gmail.com', // Change to your recipient
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        }
        sgMail
        .send(msg)
        .then(() => {
            res.send('Email sent')
        })
        .catch((error) => {
            console.error("Error sending mail:", error);
            res.status(500).send("Error sending mail");
        })
    }


}



module.exports = MailController