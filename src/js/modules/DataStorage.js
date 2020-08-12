import formatDate from "../utils/formatDate";

export default class DataStorage {
  setNews (arr) {
    sessionStorage.setItem('news', JSON.stringify(arr));
    this._setVisitDate();
  }

  setSearchRequest (request) {
    sessionStorage.setItem('request', JSON.stringify(request));
  }

  getNews () {
    return JSON.parse(sessionStorage.getItem('news'));
  }

  getSearchRequest () {
    return JSON.parse(sessionStorage.getItem('request'));
  }

  _setVisitDate() {
    sessionStorage.setItem('visitDate', JSON.stringify(formatDate(new Date())));
  }

  getVisitDate () {
    return JSON.parse(sessionStorage.getItem('visitDate'));
  }
}
