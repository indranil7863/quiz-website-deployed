import { mailtrapClient, sender } from "./mailtrap.config.js"
import {PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, verification_email_template} from './emailTemplates.js'


export const sendVerificationEmail= async (email, verificationToken) =>{
    const recipient = [{email}]
    try{
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "verify your email",
            html: verification_email_template.replace("{verificationCode}", verificationToken),
            category: "Email verification"
        });

        console.log("Email sent successfully", response);
    }catch(error){
        console.log(`Error sending verification`, error);
        throw new Error(`Error sending verification email:  ${error}`);

    }
}

export const sendWelcomeEmail = async (email, name) =>{
    const recipient = [{ email }]

    try{
      const response = await mailtrapClient.send({
            from:sender,
            to: recipient,
            template_uuid: "5790dfd1-1673-4667-b524-b434e4f0182b",
            template_variables: {
                "company_info_name": "Quiz website!",
                "name": name
              }
        });
        console.log("Welcome Email send successfully",response)
    }catch(error){
        console.error("Error sending welcome email ", error);
    }
}

export const sendPasswordRestEmail = async (email, resetURL) =>{
    const recipient = [{ email }];

    try{
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{link}", resetURL),
            category: "Password Reset"
        });

    }catch(error){
        console.error("Error sending password reset email ", error);
        throw new Error(`Error sending pasword reset email: ${error}`);

    }
}

export const sendResetSuccessEmail = async (email)=>{
    const recipient = [{email}];
    try{
        const response = await mailtrapClient.send({
            from: sender, 
            to: recipient,
            subject: "password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        });
        console.log("Password reset email successfully", response);
    }catch(error){
        console.log(`Error sending password reset success email`, error);
        throw new Error(`Error sending password reset success email: ${error}`);
    }
}