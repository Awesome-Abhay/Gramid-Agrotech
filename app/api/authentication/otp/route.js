import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }
    const OTP = Math.floor(100000 + Math.random() * 900000).toString();

    const baseUrl = request.nextUrl.origin;
    const result = await fetch(`${baseUrl}/api/mail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        subject: '🔐 Your OTP Code for Secure Access',
        message: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
                <div style="max-width: 500px; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px #ccc;">
                    <h2 style="text-align: center; color: #333;">🔒 Verification Code</h2>
                    <p style="font-size: 16px; color: #555;">Hello,</p>
                    <p style="font-size: 16px; color: #555;">Use the following OTP to complete your verification process. This code is valid for <strong>10 minutes</strong>.</p>
                    <div style="text-align: center; padding: 15px; background: #007bff; color: #fff; font-size: 24px; font-weight: bold; border-radius: 5px;">
                        ${OTP}  
                    </div>
                    <p style="font-size: 14px; color: #777; text-align: center; margin-top: 10px;">If you didn’t request this, please ignore this email.</p>
                    <p style="font-size: 14px; color: #777; text-align: center;">Thanks, <br> Your Company Team</p>
                </div>
            </div>
        `
      })
    })

    if(result.status !== 200) {
      return NextResponse.json({ message: 'Failed to send OTP', status: 500 }, { status: 500 });
    }
    else{
      return NextResponse.json({ message: 'OTP sent successfully', OTP, status: 200 }, { status: 200 });
    }

  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json({ message: 'Failed to send OTP', status: 500 }, { status: 500 });
  }
}