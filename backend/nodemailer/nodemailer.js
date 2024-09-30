import { createServer } from "http";
import { createTransport } from "nodemailer";

const server = createServer((request, response) => {
    const auth = createTransport({
        service: "gmail",
        secure : true,
        //by default gmail or email uses port 465 and we cant chnage this 
        port : 465,
        auth: {
            user: "",
            pass: "your_password"

        }
    });

    const receiver = {
        from : "youremail@gmail.com",
        to : "youremail@gmail.com",
        subject : "Node Js Mail Testing!",
        text : "Hello this is a text mail!"
    };

    auth.sendMail(receiver, (error, emailResponse) => {
        if(error)
        throw error;
        console.log("success!");
        response.end();
    });
    
});

server.listen(8080);