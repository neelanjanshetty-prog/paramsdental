import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from '@/data/site';
import { sendEmailJS } from '@/utils/emailjs';

type AppointmentPayload = {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getSlotMinutes(slot: string) {
  const match = slot.match(/^(\d{1,2}):(\d{2})\s(AM|PM)$/);

  if (!match) {
    return null;
  }

  const [, hourText, minuteText, period] = match;
  const hour = Number(hourText);
  const minute = Number(minuteText);
  const normalizedHour = period === 'PM' && hour !== 12 ? hour + 12 : period === 'AM' && hour === 12 ? 0 : hour;

  return normalizedHour * 60 + minute;
}

function getClinicDateTime() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return {
    isoDate: `${values.year}-${values.month}-${values.day}`,
    minutes: Number(values.hour) * 60 + Number(values.minute),
  };
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as AppointmentPayload;

    if (
      !payload.fullName ||
      !payload.phone ||
      !payload.email ||
      !payload.service ||
      !payload.preferredDate ||
      !payload.preferredTime
    ) {
      return NextResponse.json(
        { success: false, error: 'Missing required appointment fields.' },
        { status: 400 }
      );
    }

    if (!isValidEmail(payload.email)) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const clinicNow = getClinicDateTime();
    const requestedMinutes = getSlotMinutes(payload.preferredTime);

    if (requestedMinutes === null) {
      return NextResponse.json(
        { success: false, error: 'Please choose a valid appointment time.' },
        { status: 400 }
      );
    }

    if (payload.preferredDate < clinicNow.isoDate) {
      return NextResponse.json(
        { success: false, error: 'Please choose today or an upcoming date.' },
        { status: 400 }
      );
    }

    if (payload.preferredDate === clinicNow.isoDate && requestedMinutes <= clinicNow.minutes) {
      return NextResponse.json(
        { success: false, error: 'Please choose a later time slot for today.' },
        { status: 400 }
      );
    }

    const emailStatus = await sendEmailJS({
      to_email: siteConfig.email,
      recipient_email: siteConfig.email,
      form_type: 'appointment',
      name: payload.fullName,
      full_name: payload.fullName,
      phone: payload.phone,
      email: payload.email,
      service: payload.service,
      date: payload.preferredDate,
      time: payload.preferredTime,
      preferred_date: payload.preferredDate,
      preferred_time: payload.preferredTime,
      message: payload.message ?? '',
    });

    if (!emailStatus.sent) {
      return NextResponse.json(
        {
          success: false,
          error: emailStatus.enabled
            ? 'Appointment received, but the email notification could not be sent. Please check EmailJS settings.'
            : 'Email notifications are not configured. Please add EmailJS environment variables.',
          emailStatus,
        },
        { status: 502 }
      );
    }

    const bookingRecord = {
      ...payload,
      submittedAt: new Date().toISOString(),
      integrationStatus: {
        recipientEmail: siteConfig.email,
        emailjsConfigured: emailStatus.enabled,
        emailjsSent: emailStatus.sent,
        mongodbConfigured: Boolean(process.env.MONGODB_URI),
      },
    };

    console.info('Appointment request received', bookingRecord);

    return NextResponse.json({
      success: true,
      message: 'Appointment booked successfully.',
      data: bookingRecord,
    });
  } catch (error) {
    console.error('Appointment API error', error);

    return NextResponse.json(
      { success: false, error: 'Unable to process appointment request.' },
      { status: 500 }
    );
  }
}
