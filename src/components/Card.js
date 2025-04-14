export default class Card {
  constructor(
    // { name, link },
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleCardLike
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._id = data._id;
    this._handleCardLike = handleCardLike;
    this.isLiked = data.isLiked;
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
    //  this._likeButton.addEventListener("click", () => {
    //    if (this._isLiked) {
    //      this._handleUnlike(this._id, this);
    //    } else {
    //      this._handleLike(this._id, this);
    //    }
    //  });

    // liking cards

    // updateLikes(likesArray);{
    //   this._likes = likesArray;
    //   this._isLiked = likesArray.some(user => user._id === this._userId); // <- more on this below
    //   this._renderLikes();
    // }

    // _renderLikes(); {
    //   if (this._isLiked) {
    //     this._likeButton.classList.add("card__like-button_active");
    //   } else {
    //     this._likeButton.classList.remove("card__like-button_active");
    //   }
    //   this._likeCount.textContent = this._likes.length;
    // }

    // Delete Button
    // this._deleteButton.addEventListener("click", () => {
    //   this._cardElement.remove();
    // });

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
