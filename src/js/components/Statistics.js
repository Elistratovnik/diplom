export default class Statistics {
  constructor(table, formatСellDate, formatCellResult, getData) {
    this.table = table;
    this.formatCellDate = formatСellDate;
    this.formatCellResult = formatCellResult;
    this.getData = getData;
  }

  setTableDates () {
    this.headerMonth = this.table.querySelector('.table__month');
    this.dateColumn = this.table.querySelector('.table__column_day');
    this.dateCells = this.dateColumn.querySelectorAll('.table__cell_date');
    this.resultCells = this.table.querySelectorAll('.table__cell_result');
    let date = new Date();
    this.headerMonth.textContent = `(${date.toLocaleString('ru', {month: 'long'})})`;
    Array.from(this.dateCells).sort(() => -1).forEach((dateCell, index, arr) => {
      dateCell.textContent = this.formatCellDate(date);
      this.resultCells[arr.length - 1 - index].setAttribute('data-date', `${this.formatCellResult(date)}`)
      date.setDate(date.getDate() - 1);
    });
  }

  setTableResults () {
    const result = this.getData().articles;
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
}
