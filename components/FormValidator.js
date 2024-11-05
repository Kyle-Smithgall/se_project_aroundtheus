class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formElement;
    this._inputEls = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this.submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  _showInputError() {
    const errorMessageEl = this._form.querySelector(
      `#${this._inputSelector.id}-error`
    );
    this._inputSelector.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = this._inputSelector.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError() {
    const errorMessageEl = this._form.querySelector(
      `#${this._inputSelector.id}-error`
    );
    this._inputSelector.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _checkInputValidity() {
    if (!this._inputSelector.validity.valid) {
      return showInputError();
    }
    hideInputError();
  }

  _disableButton() {
    this._submitButtonSelector.classList.add(this._inactiveButtonClass);
    return (this._submitButtonSelector.disabled = true);
  }

  _enablebutton() {
    this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
    this._submitButtonSelector.disabled = false;
  }

  _toggleButtonState() {
    let foundInvalid = false;

    this._inputEls.forEach((inputEl) => {
      if (!inputEl.validity.valid) {
        foundInvalid = true;
      }
    });

    if (foundInvalid) {
      return _disableButton();
    }
    _enableButton();
  }

  _setEventListeners() {
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        _checkInputValidity();
        _toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }
}

export default FormValidator;
