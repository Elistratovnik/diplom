import BaseComponent from "./BaseComponent";

export default class SearchInputValidator extends BaseComponent {
  constructor({handlers, input, button, errorMessages, errorElement}) {
    super(handlers)
    this.input = input;
    this.button = button;
    this.errorElement = errorElement;
    this.errorMessages = errorMessages;
  }

  validate = () => {
    this._checkInputValidity();
    this._errorMessage();
    this.setSubmitButtonState();
    return this.isValid;
  }

  _checkInputValidity () {
    if (this.input.validity.valueMissing) {
      this.isValid = false;
      this.error = this.errorMessages.valueMissing;
      return false;
    }
    if (this.input.validity.tooShort || this.input.validity.tooLong) {
      this.isValid = false;
      this.error = this.errorMessages.tooShort;
      return false;
    }
    if (this.input.validity.patternMismatch) {
      this.isValid = false;
      this.error = this.errorMessages.patternMismatch;
      return false;
    }
    this.isValid = true;
    this.error = '';
  }

  _errorMessage () {
    if (this.isValid) {
      this.errorElement.classList.remove('search-field__error-container_active');
      this.input.classList.remove('search-field__input_invalid');
    } else {
      this.errorElement.classList.add('search-field__error-container_active');
      this.input.classList.add('search-field__input_invalid');
      this.errorElement.textContent = this.error;
    }
  }

  setSubmitButtonState () {
    if (this.isValid) {
      this.button.classList.remove('button_disabled');
      this.button.removeAttribute('disabled');
    } else {
      this.buttonDisable();
    }
  }

  buttonDisable () {
    this.button.classList.add('button_disabled');
    this.button.setAttribute('disabled', '')
  }
}
