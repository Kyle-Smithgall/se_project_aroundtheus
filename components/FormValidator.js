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

  _toggleButtonState() {
    let foundInvalid = false;

    this._inputEls.forEach((inputEl) => {
      if (!inputEl.validity.valid) {
        foundInvalid = true;
      }
    });

    if (foundInvalid) {
      return disableButton(
        this._submitButtonSelector,
        this._inactiveButtonClass
      );
    }
    enableButton(this._submitButtonSelector, this._inactiveButtonClass);
  }

  _setEventListeners() {
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (evt) => {
        checkInputValidity(formEl, inputEl, options);
        _toggleButtonState(inputEls, submitButton, options);
      });
    });
  }

  _checkFieldValidity() {
    if (!this._inputSelector.validity.valid) {
      return showInputError(this._form, inputEl, options);
    }
    hideInputError(formEl, inputEl, options);
  }

  _showinputError() {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    this._inputSelector.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = this._inputSelector.validationMessage;
    errorMessageEl.classList.add(errorClass);
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }

  resetFormValidation() {}
}

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error",
};

const editProfileFormValidator = new FormValidator();

export default FormValidator;
