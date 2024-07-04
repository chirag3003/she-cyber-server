import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    pool: true,
    auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD,
    },
})
