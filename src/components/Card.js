export default class Card {
  constructor(
    { name, link },
    cardSelector,
    openPopup,
    previewImageModal,
    previewImage,
    previewImageTitle
  ) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._openPopup = openPopup;
    this._previewImageModal = previewImageModal;
    this._previewImage = previewImage;
    this._previewImageTitle = previewImageTitle;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector("#card-delete-button");
    this._cardImage = this._cardElement.querySelector(".card__image");

    // Like Button
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("card__like-button_active");
    });

    // Delete Button
    this._deleteButton.addEventListener("click", () => {
      this._cardElement.remove();
    });

    // Open Image Modal
    this._cardImage.addEventListener("click", () => {
      this._openPopup(this._previewImageModal);
      this._previewImage.src = this._link;
      this._previewImage.alt = this._name;
      this._previewImageTitle.textContent = this._name;
    });
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();
    return this._cardElement;
  }
}
