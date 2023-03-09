const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "8a4d07d19b8365",
        pass: "95832cacca7931"
    },
});

module.exports = transporter;

//clase 23 min 46;
user: "8a4d07d19b8365"
pass: "95832cacca7931"

// user: process.env.mail_username,
// pass: process.env.mail_password