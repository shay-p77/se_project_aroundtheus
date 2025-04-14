export default class Card {
  constructor(
    // { name, link },
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleCardLike,
    userId
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleCardLike = handleCardLike;
    this._userId = userId;
    this._id = data._id;
    this._likes = data.likes || [];
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  isLikedByUser() {
    return (this._likes || []).some((user) => user._id === this._userId);
  }

  _renderLikes() {
    if (this.isLikedByUser()) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  setLikes(newLikes) {
    this._likes = newLikes || [];
    this._renderLikes();
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector("#card-delete-button");
    this._cardImage = this._cardElement.querySelector(".card__image");

    // Like button click
    this._likeButton.addEventListener("click", () => {
      this._handleCardLike(this);
    });

    // Open Image Modal

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });

    // delete modal

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._renderLikes();
    this._setEventListeners();
    return this._cardElement;
  }

  getId() {
    return this._id;
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
