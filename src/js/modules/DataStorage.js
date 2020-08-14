import formatDate from "../utils/formatDate";

export default class DataStorage {
  setNews (arr) {
    localStorage.setItem('news', JSON.stringify(arr));
    this._setVisitDate();
  }

  setSearchRequest (request) {
    localStorage.setItem('request', JSON.stringify(request));
  }

  getNews () {
    return JSON.parse(localStorage.getItem('news'));
  }

  getSearchRequest () {
    return JSON.parse(localStorage.getItem('request'));
  }

  _setVisitDate() {
    localStorage.setItem('visitDate', JSON.stringify(formatDate(new Date())));
  }

  getVisitDate () {
    return JSON.parse(localStorage.getItem('visitDate'));
  }
}
