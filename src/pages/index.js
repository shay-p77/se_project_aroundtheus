import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";

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

// const cardData = {
//   name: " ",
//   link: " ",
// };

//userinfo

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
});

// card elements

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

function closePopup(modal) {
  modal.classList.remove("modal_open");
  document.removeEventListener("keyup", handleEscUp);
}

function openPopup(modal) {
  modal.classList.add("modal_open");
  document.addEventListener("keyup", handleEscUp);
}

// image modal elements

const previewImageModal = document.querySelector("#js-preview-modal");
const previewImage = document.querySelector(".modal__preview-image");
const previewImageTitle = document.querySelector("#modal-image-title");
const previewImageModalClose = document.querySelector("#image-modal-close");

function handleImageClick(name, link) {
  imagePopup.open({ name, link });
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    openPopup,
    previewImageModal,
    previewImage,
    previewImageTitle,
    handleImageClick
  );
  return card.getView();
}

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardListEl.append(cardElement);
});

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

// Validation

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
editFormValidator.enableValidation();
const addFormValidator = new FormValidator(validationSettings, cardAddForm);
addFormValidator.enableValidation();

// functions

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
}

// eventlisteners

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
  openPopup(profileEditModal);
});

profileEditModalClose.addEventListener("click", () => {
  closePopup(profileEditModal);
});

cardAddButton.addEventListener("click", () => {
  openPopup(cardAddModal);
});

cardAddModalClose.addEventListener("click", () => {
  closePopup(cardAddModal);
});

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  userInfo.setUserInfo({
    name: profileTitleInput.value,
    job: profileSubtitleInput.value,
  });
  closePopup(profileEditModal);
});

cardAddForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;

  renderCard({ name, link });
  e.target.reset();
  closePopup(cardAddModal);

  addFormValidator.disableSubmitButton();
});

previewImageModalClose.addEventListener("click", (e) => {
  e.preventDefault();
  closePopup(previewImageModal);
});

profileEditModal.addEventListener("click", (e) => {
  if (e.target === profileEditModal) {
    closePopup(profileEditModal);
  }
});

cardAddModal.addEventListener("click", (e) => {
  if (e.target === cardAddModal) {
    closePopup(cardAddModal);
  }
});

previewImageModal.addEventListener("click", (e) => {
  if (e.target === previewImageModal) {
    closePopup(previewImageModal);
  }
});

const handleEscUp = (evt) => {
  evt.preventDefault();
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".modal_open");
    closePopup(activePopup);
  }
};
