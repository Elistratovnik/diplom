export default class SearchInput {
  constructor(input, button) {
    this.input = input;
    this.button = button;
    this.value = '';
    this._setEventListeners();
  }

  _updateValue () {
    this.value = this.input.value;
  }

  setInputText (text) {
    this.input.value = text;
    this._updateValue();
  }

  getValue () {
    return this.value;
  }

  _setEventListeners () {
    this.input.addEventListener('input', () => {this._updateValue()});
  }
}
