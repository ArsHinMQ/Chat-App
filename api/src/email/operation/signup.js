import transporter from "#src/email/transporter.js"
import getTemplate from "#src/email/template/get-template.js"

export default async function sendSignupEmail(email, code) {
    const template = getTemplate('signup')
    const mailOptions = {
        from: process.env.SMTP_USERNAME,
        to: email,
        subject: template.subject,
        text: template.content.replace("{{code}}", code)
    }

    const res = await transporter.sendMail(mailOptions)
    return res.messageId
}