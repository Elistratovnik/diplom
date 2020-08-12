export default class SearchInput {
  constructor(input, button, errorMessages, errorElement) {
    this.input = input;
    this.button = button;
    this.errorElement = errorElement;
    this.errorMessages = errorMessages;
    this.value = '';
    this.isValid = false;
    this.error = this.errorMessages.valueMissing;
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
    this.input.addEventListener('input', () => {this.validate()});
  }

  validate () {
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
    // if (this.input.validity.tooShort || this.input.validity.tooLong) {
    //   return { isValid: false, error: this.errorMessages.tooShort };
    // }
    // if (this.input.validity.typeMismatch) {
    //   return { isValid: false, error: this.errorMessages.typeMismatch };
    // }
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
