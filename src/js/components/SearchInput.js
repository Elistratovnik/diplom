import BaseComponent from "./BaseComponent";

export default class SearchInput extends BaseComponent {
  constructor({handlers, input}) {
    super(handlers);
    this.input = input;
    this.value = '';
  }

  updateValue = () => {
    this.value = this.input.value;
  }

  setInputText (text) {
    this.input.value = text;
    this.updateValue();
  }

  getValue () {
    return this.value;
  }
}
