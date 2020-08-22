export default function formatCardDate (date) {
  // Принимает дату в формате YYYY-MM-DD
  return date.replace(/(\d{4})-(\d{1,2})-(\d{1,2}).+/g, (str, year, mouth , day) => {
    const formatMounth = new Date(mouth).toLocaleString('ru', {month: 'long'}).replace(/.{2}$/, (str) => {
      switch(str) {
        case 'рь':
          return 'ря'
        case 'ля':
          return 'ля'
        case 'ль':
          return 'ля'
        case 'нь':
          return 'ня'
        case 'рт':
          return 'рта'
        case 'ст':
          return 'ста'
        case 'ай':
          return 'ая'
        default:
          return str;
      }
    });
  return +day + ' ' + formatMounth + ', ' + year;
  });
}
