import { NextRequest, NextResponse } from 'next/server';

type AppointmentPayload = {
  fullName: string;
  phone: string;
  email: string;
  age?: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
};

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

function getDashboardAppointmentUrl() {
  const baseUrl = process.env.NEXT_PUBLIC_DASHBOARD_API_URL || 'https://api.paramsdental.com';

  return `${baseUrl.replace(/\/$/, '')}/api/public/appointments`;
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as AppointmentPayload;
    const name = payload.fullName?.trim();
    const phone = payload.phone?.trim();
    const date = payload.preferredDate?.trim();
    const time = payload.preferredTime?.trim();

    if (!name || !phone || !date || !time) {
      return NextResponse.json(
        {
          success: false,
          message: 'Name, phone, date, and time are required.',
          error: 'Name, phone, date, and time are required.',
        },
        { status: 400 }
      );
    }

    const clinicNow = getClinicDateTime();
    const requestedMinutes = getSlotMinutes(time);

    if (requestedMinutes === null) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please choose a valid appointment time.',
          error: 'Please choose a valid appointment time.',
        },
        { status: 400 }
      );
    }

    if (date < clinicNow.isoDate) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please choose today or an upcoming date.',
          error: 'Please choose today or an upcoming date.',
        },
        { status: 400 }
      );
    }

    if (date === clinicNow.isoDate && requestedMinutes <= clinicNow.minutes) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please choose a later time slot for today.',
          error: 'Please choose a later time slot for today.',
        },
        { status: 400 }
      );
    }

    const publicBookingApiKey = process.env.PUBLIC_BOOKING_API_KEY;

    if (!publicBookingApiKey) {
      console.error('PUBLIC_BOOKING_API_KEY is not configured');

      return NextResponse.json(
        {
          success: false,
          message: 'Unable to submit appointment request. Please try again or contact the clinic.',
          error: 'Unable to submit appointment request. Please try again or contact the clinic.',
        },
        { status: 500 }
      );
    }

    const dashboardResponse = await fetch(getDashboardAppointmentUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-public-booking-key': publicBookingApiKey,
      },
      body: JSON.stringify({
        name,
        phone,
        email: payload.email?.trim() ?? '',
        age: payload.age ?? '',
        date,
        time,
        service: payload.service?.trim() ?? '',
        message: payload.message?.trim() ?? '',
        source: 'website',
      }),
    });

    const dashboardResult = await dashboardResponse.json().catch(() => null) as { success?: boolean } | null;

    if (!dashboardResponse.ok || dashboardResult?.success === false) {
      console.error('Dashboard appointment API failed', {
        status: dashboardResponse.status,
        response: dashboardResult,
      });

      return NextResponse.json(
        {
          success: false,
          message: 'Unable to submit appointment request. Please try again or contact the clinic.',
          error: 'Unable to submit appointment request. Please try again or contact the clinic.',
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Appointment request submitted successfully',
    });
  } catch (error) {
    console.error('Appointment API error', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to submit appointment request. Please try again or contact the clinic.',
        error: 'Unable to submit appointment request. Please try again or contact the clinic.',
      },
      { status: 500 }
    );
  }
}
