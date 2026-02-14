import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector(".modal__form");
    this._submitButton = this._popup.querySelector("#confirm-delete-button");
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    if (!this._form) return;
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (this._handleSubmit) this._handleSubmit();
    });
  }
}
