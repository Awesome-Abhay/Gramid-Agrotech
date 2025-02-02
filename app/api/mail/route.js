import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email, subject, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'gourav.sharma.apsmat2932@gmail.com',
        pass: 'ferz gdew pzls egul', 
      },
    });

    const mailOptions = {
      from: 'gourav.sharma.apsmat2932@gmail.com',
      to: email,
      subject: subject,
      html: message,
    };

    await transporter.sendMail(mailOptions);

    return new NextResponse(
      JSON.stringify({ message: 'Email sent successfully', status: 200 }),
      { status: 200 }
    );
  } 
  catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: 'Error sending email', status: 500 }),
      { status: 500 }
    );
  }
}
