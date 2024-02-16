const sgMail = require('@sendgrid/mail')

class MailController{
    constructor() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        this.msg = {
            from: "joel.montilla.heredia@gmail.com"
        }
    }

    sendEmail(req,res) {
        
        const msg = {
        ...this.msg,
        to: 'test@example.com', // Change to your recipient
        from: 'test@example.com', // Change to your verified sender
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
            res.error("Error sending mail")
        })
    }


}

// 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 api key

module.exports = MailController