export default class DataStorage {
  setNews (arr) {
    sessionStorage.setItem('news', JSON.stringify(arr));
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
}
