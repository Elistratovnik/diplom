export default class NewsApi {
  constructor(url) {
    this.url = url || '';
  }

  _getResponseData (res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
    }

  getNews () {
    return fetch(this.url)
      .then(res => this._getResponseData(res))
  }

  setUrl (url) {
    this.url = url;
  }
}
