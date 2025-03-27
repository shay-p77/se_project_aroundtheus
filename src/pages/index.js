import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import {
  initialCards,
  validationSettings,
  cardListEl,
  cardTemplate,
  profileEditButton,
  profileEditModal,
  profileTitleInput,
  profileSubtitleInput,
  profileEditForm,
  cardAddButton,
  cardAddForm,
  previewImageModal,
  previewImage,
  previewImageTitle,
} from "../utils/constants.js";

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

  addFormValidator.disableSubmitButton();
});

profilePopup.setEventListeners();
cardPopup.setEventListeners();

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
}

// Eventlisteners

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileSubtitleInput.value = userData.job;
  profilePopup.open();
});

cardAddButton.addEventListener("click", () => {
  cardPopup.open();
});

// TO FIX

// have the inputs clear only after submitting

// all constants need to be in constants.js in utils.js
