import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._form = this._popupElement.querySelector(".modal__form");
    this._submitButton = this._popup.querySelector("#confirm-delete-button");
  }
  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (this._handleSubmit) {
        this._handleSubmit();
      }
    });

    // this._submitButton.addEventListener("click", (evt) => {
    //   evt.preventDefault();
    //   if (this._handleSubmit) {
    //     this._handleSubmit();
    //   }
    // });
  }
}
