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
    const request = this.getRequestData();
    const dateRegExp = new RegExp('\\d{4}\-\\d{1,2}\-\\d{1,2}');
    const requestRegExp = new RegExp(request, 'gi');
    const countDates = result.reduce((acc, data) => {
      do {
        if (requestRegExp.test(data.title + data.description)) {
          acc[data.publishedAt.match(dateRegExp)] = (acc[data.publishedAt.match(dateRegExp)] || 0) + 1;
          acc.total = (acc.total || 0) + 1;
        }
      } while (requestRegExp.lastIndex !== 0)
      return acc;
    }, {});
    for (let date in countDates) {
      if (date !== 'total') {
        countDates[date] = Math.round(countDates[date] * 100 / countDates.total)
      };
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
    const requestRegExp = new RegExp(this.getRequestData(), 'gi')
    this.headersResult.textContent = this.getNewsData().articles.reduce((acc, data) => {
      do {
        if (requestRegExp.test(data.title)) {
          acc = acc + 1;
        };
      } while (requestRegExp.lastIndex !== 0)
      return acc;
    }, 0);
  }

}


