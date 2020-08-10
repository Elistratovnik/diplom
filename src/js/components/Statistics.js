export default class Statistics {
  constructor(statisticsContainer, table, formatDateСellDate, formatDateCellResult, getNewsData, getRequestData) {
    this.statisticsContainer = statisticsContainer;
    this.table = table;
    this.formatDateCellDate = formatDateСellDate;
    this.formatDateCellResult = formatDateCellResult;
    this.getNewsData = getNewsData;
    this.getRequestData = getRequestData;
  }

  setTableDates () {
    this.headerMonth = this.table.querySelector('.table__month');
    this.dateColumn = this.table.querySelector('.table__column_day');
    this.dateCells = this.dateColumn.querySelectorAll('.table__cell_date');
    this.resultCells = this.table.querySelectorAll('.table__cell_result');
    let date = new Date();
    this.headerMonth.textContent = `(${date.toLocaleString('ru', {month: 'long'})})`;
    Array.from(this.dateCells).sort(() => -1).forEach((dateCell, index, arr) => {
      dateCell.textContent = this.formatDateCellDate(date);
      this.resultCells[arr.length - 1 - index].setAttribute('data-date', `${this.formatDateCellResult(date)}`)
      date.setDate(date.getDate() - 1);
    });
  }

  setTableResults () {
    const result = this.getNewsData().articles;
    const countDates = result.reduce((acc, el) => {
      acc[el.publishedAt.match(/\d{4}-\d{1,2}-\d{1,2}/)] = (acc[el.publishedAt.match(/\d{4}-\d{1,2}-\d{1,2}/)] || 0) + 1;
      return acc;
    }, {});
    for (let i in countDates) {
      countDates[i] = countDates[i] * 100 / result.length;
    }
    Array.from(this.resultCells).forEach((elem) => {
      elem.querySelector('.table__percent').textContent = countDates[elem.dataset.date] || 0;
      elem.style.width = countDates[elem.dataset.date] + '%';
    });
  }

  setGeneralStatistics () {
    this.title = this.statisticsContainer.querySelector('.statistics__title');
    this.newsPerWeek = this.statisticsContainer.querySelector('.statistics__result_per-week');
    this.headersResult = this.statisticsContainer.querySelector('.statistics__result_headers');
    this.title.textContent = `Вы спросили: «${this.getRequestData()}»`
    this.newsPerWeek.textContent = this.getNewsData().totalResults;
    const regexp = new RegExp(`${this.getRequestData()}`, 'g')
    this.headersResult.textContent = this.getNewsData().articles.reduce((acc, item) => {
      if (regexp.test(item.title)) {return acc + 1};
      return acc;
    }, 0);
  }
}
