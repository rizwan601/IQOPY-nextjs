import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email } = req.body;

        // Create a transporter
        let transporter = nodemailer.createTransport({
            host: 'smtp.example.com', // Replace with your SMTP host
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'user@example.com', // Replace with your SMTP username
                pass: 'password' // Replace with your SMTP password
            }
        });

        // Send the email
        let info = await transporter.sendMail({
            from: '"Your Name" <user@example.com>', // Replace with your name and email
            to: email,
            subject: 'Reset Password',
            text: 'Please click the link below to reset your password.', // Replace with your email text
            html: `
                <!DOCTYPE html>
                <html lang="en">

                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Password Reset</title>
                    <style>
                        body {
                            font-family: 'Lato', sans-serif;
                            background-color: #081524;
                            color: #d5c28f;
                            margin: 0;
                            padding: 0;
                        }

                        .container {
                            font-family: 'Lato', sans-serif;
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #1a4578;
                            border-radius: 10px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        }

                        h2 {
                            font-family: 'Alice', serif;
                            color: #C7AE6A;
                            text-align: center;
                        }

                        p {
                            color: #d5c28f;
                        }

                        a {
                            background-color: #b99a45;
                            color: #081524;
                            text-decoration: none;
                            padding: 10px 20px;
                            border-radius: 5px;
                            display: inline-block;
                        }
                    </style>
                </head>

                <body>
                    <div class="container">
                        <h2>Password Reset</h2>
                        <p>We received a request to reset your password. If you didn&apos;t make this request, you can ignore this email.
                            Otherwise, you can reset your password by clicking the button below:</p>
                        <p style="text-align: center;">
                            <a href="RESET_PASSWORD_LINK">Reset Password</a>
                        </p>
                        <p>If you&apos;re having trouble clicking the "Reset Password" button, copy and paste the following link into your
                            web browser:</p>
                        <p>RESET_PASSWORD_LINK</p>
                        <p>If you didn&apos;t request a password reset or have any concerns, please contact our support team.</p>
                        <p>Thank you,</p>
                        <p>The iQopy Team</p>
                    </div>
                </body>

                </html>
            ` // Replace with your email HTML
        });

        console.log('Message sent:', info.messageId);

        res.status(200).json({ success: true });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}