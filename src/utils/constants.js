// Initial cards array

export const initialCards = [
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

// Validation

export const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// DOM elements

export const cardListEl = document.querySelector(".cards__list");
export const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// profile elements

export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileSubtitleInput = document.querySelector(
  "#profile-subtitle-input"
);
export const profileEditForm = profileEditModal.querySelector(".modal__form");
export const profileAvatar = document.querySelector(".profile__photo");
export const profileName = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");

// add card elements

export const cardAddButton = document.querySelector(".profile__add-button");
export const cardAddForm = document.querySelector("#card-add-form");
export const deleteButton = document.querySelector("#card-delete-button");

// image modal elements

export const previewImageModal = document.querySelector("#js-preview-modal");
export const previewImage = document.querySelector(".modal__preview-image");
export const previewImageTitle = document.querySelector("#modal-image-title");

// delete card modal

export const deleteCardModal = document.querySelector("#delete-card-modal");
export const confirmDeleteButton = document.querySelector(
  "#confirm-delete-button"
);
