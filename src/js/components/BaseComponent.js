export default class BaseComponent {
  constructor (handlers = []) {
    this.handlers = handlers;
  }

  setHandlers (callbacks) {
    this.handlers.forEach((handler, index) => {
      this._addhandler(handler, callbacks[index])
    })
  }

  _addhandler ({element, event}, callback) {
    element.addEventListener(event, callback);
  }
}


