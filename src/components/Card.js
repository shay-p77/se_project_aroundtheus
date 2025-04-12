export default class Card {
  constructor(
    { name, link },
    cardSelector,
    handleImageClick,
    handleLike,
    handleUnlike
  ) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleLike = handleLike;
    this._handleUnlike = handleUnlike;
    this._handleImageClick = handleImageClick;
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
      if (this._isLiked) {
        this._handleUnlike(this._id);
      } else {
        this._handleLike(this._id);
      }
    });

    // updateLikes(cardData);
    // {
    //   this._isLiked = cardData.isLiked;
    //   if (this._isLiked) {
    //     this._likeButton.classList.add("card__like-button_active");
    //   } else {
    //     this._likeButton.classList.remove("card__like-button_active");
    //   }
    // }

    // Delete Button
    this._deleteButton.addEventListener("click", () => {
      this._cardElement.remove();
    });

    // Open Image Modal

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
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
