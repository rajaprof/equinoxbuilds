import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;

    const data = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey,
      template_params: {
        ...body,
        subject: `New Lead: ${body.selectedService} from ${body.clientName}`,
        reply_to_link: `mailto:${body.clientEmail}?subject=Re: Your Project Inquiry`,
      }
    };

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } else {
      const errorText = await response.text();
      console.error('EmailJS error:', errorText);
      return NextResponse.json({ error: 'Failed to send email', details: errorText }, { status: response.status });
    }
  } catch (error) {
    console.error('Email request error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}