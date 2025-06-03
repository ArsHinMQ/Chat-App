import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT, // or 587
    auth: {
        user: process.env.SMTP_USERNAME,       // Your Elastic Email account
        pass: process.env.SMTP_PASSWORD,   // From SMTP/API settings in Elastic Email
    },
})

export default transporter
