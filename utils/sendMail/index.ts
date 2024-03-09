import nodemailer, { Transporter, SendMailOptions, createTransport } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const sendMail = async (to: string, subject: string, text: string) => {
    const transportDetails: SMTPTransport.Options = {
        host: process.env.SMTP_SERVER,
        port: Number(process.env.SMTP_PORT),
        auth: {
            user: process.env.SMTP_EMAIL_USER,
            pass: process.env.SMTP_EMAIL_PASS,
        },
    };

    const transporter: Transporter = createTransport(transportDetails);

    const mailOptions: SendMailOptions = {
        from: '',
        to,
        subject,
        text,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};

export default sendMail;