const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Elements

// profile elements

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditModalClose = document.querySelector("#profile-modal-close");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileSubtitleInput = document.querySelector("#profile-subtitle-input");
const profileEditForm = profileEditModal.querySelector(".modal__form");

// card elements

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// add card elements

const cardAddModal = document.querySelector("#card-add-modal");
const cardAddButton = document.querySelector(".profile__add-button");
const cardAddModalClose = document.querySelector("#add-modal-close");
const cardTitleInput = document.querySelector("#card-title-input");
const cardLinkInput = document.querySelector("#card-link-input");
const cardTitle = document.querySelector(".card__title");
const cardImage = document.querySelector(".card__image");
const cardAddForm = document.querySelector("#card-add-form");
const saveCardButton = document.querySelector("#save-card");

// functions

function closePopup(modal) {
  modal.classList.remove("modal_open");
}

function closePopup(modal) {
  modal.classList.remove("modal_open");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardTitleEl.textContent = cardData.name;
  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  return cardElement;
}

function deletingCard() {
  const deleteCardButton = document.querySelector(".card");
  deleteCardButton.remove("#card");
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

// eventlisteners

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
  profileEditModal.classList.add("modal_open");
});

profileEditModalClose.addEventListener("click", () => {
  closePopup(profileEditModal);
});

cardAddButton.addEventListener("click", () => {
  cardAddModal.classList.add("modal_open");
});

cardAddModalClose.addEventListener("click", () => {
  closePopup(cardAddModal);
});

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;
  closePopup(profileEditModal);
});

cardAddForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  renderCard({ name, link }, cardListEl);
  closePopup(cardAddModal);
});

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});

initialCards.forEach(function (cardData) {
  const cardEl = cardTemplate.cloneNode(true);
  const imageEl = cardEl.querySelector(".card__image");
  const cardTitle = cardEl.querySelector(".card__title");
  imageEl.src = cardData.link;
  imageEl.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  // cardListEl.prependChild(cardEl);
});

// TO DO

// opening picture modal

// smooth modal opening and closing

const likeButtons = document.querySelectorAll(".card__like-button");
likeButtons.forEach((likeButton) => {
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
});
