import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";

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

// card elements

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

//userinfo

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
});

const profilePopup = new PopupWithForm("#profile-edit-modal", (formData) => {
  userInfo.setUserInfo({
    name: formData["profile-title-input"],
    job: formData["profile-subtitle-input"],
  });
});

const cardPopup = new PopupWithForm("#card-add-modal", (formData) => {
  renderCard({
    name: formData["card-title-input"],
    link: formData["card-link-input"],
  });
});

profilePopup.setEventListeners();
cardPopup.setEventListeners();

// image modal elements

const previewImageModal = document.querySelector("#js-preview-modal");
const previewImage = document.querySelector(".modal__preview-image");
const previewImageTitle = document.querySelector("#modal-image-title");
const previewImageModalClose = document.querySelector("#image-modal-close");

// popupwithimage instance

const popupWithImage = new PopupWithImage("#js-preview-modal");
popupWithImage.setEventListeners();

function handleImageClick(name, link) {
  popupWithImage.open({ name, link });
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    // previewImageModal,
    // previewImage,
    // previewImageTitle,
    handleImageClick
  );
  return card.getView();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);
cardSection.renderItems();

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

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement);
  cardListEl.prepend(cardElement);
}

// Eventlisteners

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
  profilePopup.open();
});

profileEditModalClose.addEventListener("click", () => {
  profilePopup.close();
});

cardAddButton.addEventListener("click", () => {
  cardPopup.open();
});

cardAddModalClose.addEventListener("click", () => {
  cardPopup.close();
});

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();

  userInfo.setUserInfo({
    name: profileTitleInput.value,
    job: profileSubtitleInput.value,
  });
  profilePopup.close();
});

cardAddForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = cardTitleInput.value.trim();
  const link = cardLinkInput.value.trim();

  if (!name || !link) return;

  const newCard = createCard({ name, link });
  cardSection.addItem(newCard);

  e.target.reset();
  cardPopup.close();
  addFormValidator.disableSubmitButton();
});

previewImageModalClose.addEventListener("click", (e) => {
  e.preventDefault();
  popupWithImage.close();
});

profileEditModal.addEventListener("click", (e) => {
  if (e.target === profileEditModal) {
    profilePopup.close();
  }
});

cardAddModal.addEventListener("click", (e) => {
  if (e.target === cardAddModal) {
    cardPopup.close();
  }
});

previewImageModal.addEventListener("click", (e) => {
  if (e.target === previewImageModal) {
    popupWithImage.close();
  }
});

const handleEscUp = (evt) => {
  evt.preventDefault();
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".modal_open");
    close(activePopup);
  }
};

// TO FIX

// profile edit modal doesn't update profile

// card add modal adds two broken cards
