import nodemailer, {
    Transporter,
    SendMailOptions,
    createTransport,
} from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"

const sendMail = async (mailOptions: SendMailOptions) => {
    const transportDetails: SMTPTransport.Options = {
        host: process.env.SMTP_SERVER,
        port: Number(process.env.SMTP_PORT),
        auth: {
            user: process.env.SMTP_EMAIL_USER,
            pass: process.env.SMTP_EMAIL_PASS,
        },
    }

    const transporter: Transporter = createTransport(transportDetails)

    const info = await transporter.sendMail(mailOptions)

    console.log("Message sent: %s", info.messageId)
}

export default sendMail
