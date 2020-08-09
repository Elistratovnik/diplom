export default class DataStorage {
  setNews (arr) {
    sessionStorage.setItem('news', JSON.stringify(arr));
  }

  getNews () {
    return JSON.parse(sessionStorage.getItem('news'));
  }
}
