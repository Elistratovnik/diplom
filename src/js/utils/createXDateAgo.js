export default function createXDateAgo (daysAgo) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date
}
