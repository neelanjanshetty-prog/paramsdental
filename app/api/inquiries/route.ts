import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from '@/data/site';
import { sendEmailJS } from '@/utils/emailjs';

type InquiryPayload = {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as InquiryPayload;

    if (!payload.name || !payload.phone || !payload.email || !payload.subject || !payload.message) {
      return NextResponse.json(
        { success: false, error: 'Missing required inquiry fields.' },
        { status: 400 }
      );
    }

    if (!isValidEmail(payload.email)) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const emailStatus = await sendEmailJS({
      to_email: siteConfig.email,
      recipient_email: siteConfig.email,
      form_type: 'inquiry',
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      subject: payload.subject,
      message: payload.message,
    });

    if (!emailStatus.sent) {
      return NextResponse.json(
        {
          success: false,
          error: emailStatus.enabled
            ? 'Inquiry received, but the email notification could not be sent. Please check EmailJS settings.'
            : 'Email notifications are not configured. Please add EmailJS environment variables.',
          emailStatus,
        },
        { status: 502 }
      );
    }

    const inquiryRecord = {
      ...payload,
      submittedAt: new Date().toISOString(),
      backendReady: {
        adminEmail: siteConfig.email,
        smtpConfigured: Boolean(process.env.SMTP_FROM),
        emailjsConfigured: emailStatus.enabled,
        emailjsSent: emailStatus.sent,
      },
    };

    console.info('Inquiry request received', inquiryRecord);

    return NextResponse.json({
      success: true,
      message: 'Inquiry sent successfully.',
      data: inquiryRecord,
    });
  } catch (error) {
    console.error('Inquiry API error', error);

    return NextResponse.json(
      { success: false, error: 'Unable to process inquiry request.' },
      { status: 500 }
    );
  }
}
