type EmailTemplateParams = Record<string, string>;

export async function sendEmailJS(templateParams: EmailTemplateParams) {
  const serviceId = process.env.EMAILJS_SERVICE_ID ?? process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID ?? process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY ?? process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey) {
    return {
      enabled: false,
      sent: false,
    };
  }

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        ...(privateKey ? { accessToken: privateKey } : {}),
        template_params: templateParams,
      }),
    });

    return {
      enabled: true,
      sent: response.ok,
      status: response.status,
    };
  } catch (error) {
    console.error('EmailJS send failed', error);
    return {
      enabled: true,
      sent: false,
      status: 500,
    };
  }
}
