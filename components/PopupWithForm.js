import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
    this._submitButton = this._popupElement.querySelector(".modal__button");
  }

  _getInputValues() {
    const formData = {};
    this._inputList.forEach((input) => {
      formData[input.name] = input.value;
    });
    return formData;
  }

  setLoadingText(isLoading, defaultText = "Save") {
    if (isLoading) {
      this._submitButton.textContent = "Saving...";
    } else {
      this._submitButton.textContent = defaultText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const maybePromise = this._handleFormSubmit(this._getInputValues());

      if (maybePromise && typeof maybePromise.then === "function") {
        maybePromise
          .then(() => {
            this.close();
           // this._popupForm.reset();
          })
          .catch((err) => {
            console.error("Error during form submission:", err);
          });
      }
    });
  }
}
