export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

export function buildUpcomingDates(days = 7) {
  const todayParts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const todayValues = Object.fromEntries(todayParts.map((part) => [part.type, part.value]));
  const today = new Date(Date.UTC(Number(todayValues.year), Number(todayValues.month) - 1, Number(todayValues.day)));

  return Array.from({ length: days }, (_, index) => {
    const nextDate = new Date(today);
    nextDate.setUTCDate(nextDate.getUTCDate() + index);
    const year = nextDate.getUTCFullYear();
    const month = String(nextDate.getUTCMonth() + 1).padStart(2, '0');
    const dayOfMonth = String(nextDate.getUTCDate()).padStart(2, '0');

    return {
      iso: `${year}-${month}-${dayOfMonth}`,
      day: new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: 'UTC' }).format(nextDate),
      date: new Intl.DateTimeFormat('en-US', { day: 'numeric', timeZone: 'UTC' }).format(nextDate),
      month: new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' }).format(nextDate),
    };
  });
}
