export default function formatAnalyticsDate (date) {
  const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
  return date.getDate() + ', ' + days[date.getDay()];
}
