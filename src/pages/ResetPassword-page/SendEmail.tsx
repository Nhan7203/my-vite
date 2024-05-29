import nodemailer from "nodemailer";

import asyncHandler from "express-async-handler";

const sendMail = asyncHandler(async (email, html) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: "mnbmilkshop@gmail.com",
            pass: "nggmcfnpgwqlkqlq",
        },
    })

    const info = await transporter.sendMail({
        from: '"Cua hang sua Me va Be MnB" <no-reply@mnbshop.com>', // sender address
        to: email, // list of receivers
        subject: "Forgot Password", // Subject line
        html: html, // html body
    })

    return info;
})

module.exports = sendMail