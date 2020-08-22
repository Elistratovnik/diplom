export default class GithubApi {
  constructor(url) {
    this.url = url || '';
  }

  _getResponseData (res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
    }

  getData () {
    return fetch(this.url)
      .then(res => this._getResponseData(res))
  }
}
