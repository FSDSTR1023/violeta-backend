const express = require("express")
const router = express.Router()
const MailController = require("./mail.controller")
const mailController = new MailController()


router.get("/", mailController.sendEmail.bind(mailController)) 
   

module.exports = router;