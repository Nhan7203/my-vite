import nodemailer from "nodemailer";

const sendMail = async (email: any) => {
    // Generate a random 8-digit code
    const code = Math.floor(10000000 + Math.random() * 90000000);

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: "mnbmilkshop@gmail.com",
            pass: "nggmcfnpgwqlkqlq",
        },
    });

    const info = await transporter.sendMail({
        from: '"Cua hang sua Me va Be MnB" <no-reply@mnbshop.com>',
        to: email,
        subject: "Forgot Password",
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>CodePen - OTP Email Template</title>
            </head>
            <body>
                <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                    <div style="margin:50px auto;width:70%;padding:20px 0">
                        <div style="border-bottom:1px solid #eee">
                            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">MnB Milk Shop</a>
                        </div>
                        <p style="font-size:1.1em">Hi,</p>
                        <p>Thank you for choosing MnB Milk Show. Use the following code to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
                        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${code}</h2>
                        <p style="font-size:0.9em;">Regards,<br />Koding 101</p>
                        <hr style="border:none;border-top:1px solid #eee" />
                        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                            <p>MnB Inc</p>
                            <p>Block E2a-7, D1 Street Saigon Hi-tech Park, Long Thanh My Ward, District 9, Ho Chi Minh City, Vietnam</p>
                            <p>Email: mnbmilkshop@gmail.com</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>`,
    });

    return { info, code };
};

export default sendMail;