import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';



// https://ethereal.email/create
let nodeConfig = {
    //Ethereal is the SMTP server where user can send fake mails for testing purposes
    /*
    email sending steps :
    1->when we send the emails ,basicallyt we send the didital m,essages across the internet
    2->then send these emails to the reciepnt using the SMPT protocol
    3->the port can be 25,465,587 
    
    */
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, 
    auth: {
        user: process.env.EMAIL, 
        pass: process.env.PASSWORD,
    }
}

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: "default",
    product : {
        name: "Mailgen",
        link: 'https://mailgen.js/'
    }
})

export const registerMail = async (req, res) => {
    const { username, userEmail, text, subject } = req.body;
    //these three were send from the backend so available in the req obj

    const email = {
        body: {
            name: username,
            intro: text || 'Welcome to Daily PIzza Rush  We\'re very excited to have you on board.',
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    };
//now email will be generates using mail generator  with the email body that we ave provided
    const emailBody = MailGenerator.generate(email);

    const message = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: subject || "Signup Successful",
        html: emailBody
    };
//now thw transportar will tyr sending the email
    try {
        await transporter.sendMail(message);
        return res.status(200).send({ msg: "You should receive an email from us." });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).send({ error: "Failed to send email." });
    }
};
