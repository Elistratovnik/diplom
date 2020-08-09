export default function createNewsUrl (value, startDate, endDate) {
  let url = 'http://newsapi.org/v2/everything?' +
  `q=${value}&` +
  `from=${startDate}&` +
  `to=${endDate}&` +
  'pageSize:100&' +
  'sortBy=popularity&' +
  'apiKey=8444801f72944ce3ba4c611536407156';
  return url;
}
