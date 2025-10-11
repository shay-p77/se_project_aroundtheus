import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

import api from "../components/Api.js";
import {
  validationSettings,
  profileEditButton,
  profileTitleInput,
  profileSubtitleInput,
  profileEditForm,
  cardAddButton,
  cardAddForm,
  avatarEditButton,
  avatarEditForm,
  cardListEl,
  cardTemplate,
} from "../utils/constants.js";

//  ---- User Info ----
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
  avatarSelector: ".profile__photo",
});

//---- Section for Cards ----
const cardSection = new Section(
  { items: [], renderer: (data) => renderCard(data) },
  ".cards__list"
);

let currentUserId;

//  ---- Fetch initial data ----
api
  .getAppData()
  .then(([userData, cards]) => {
    currentUserId = userData._id;
    userInfo.setUserInfo({ name: userData.name, job: userData.about });
    userInfo.setUserAvatar(userData.avatar);
    cardSection.renderItems(cards);
  })
  .catch((err) => console.error("Error loading app data:", err));

// ---- Card Functions ----
function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleDeleteClick,
    handleCardLike,
    currentUserId
  );
  return card.getView();
}

function renderCard(data) {
  const cardElement = createCard(data);
  cardSection.addItem(cardElement);
}

//  ---- Card Handlers ----
function handleImageClick(name, link) {
  popupWithImage.open({ name, link });
}

function handleDeleteClick(cardInstance) {
  confirmDeletePopup.setSubmitAction(() => {
    api
      .deleteCard(cardInstance.getId())
      .then(() => {
        cardInstance.removeCard();
        confirmDeletePopup.close();
      })
      .catch((err) => console.error(err));
  });
  confirmDeletePopup.open();
}

function handleCardLike(card) {
  const isLiked = card.isLiked;
  const request = isLiked
    ? api.unlikeCard(card.getId())
    : api.likeCard(card.getId());
  request
    .then((updated) => card.setLikes(updated.isLiked))
    .catch(() => card.setLikes(isLiked));
}

//   ---- Popups ----
const profilePopup = new PopupWithForm("#profile-edit-modal", (formData) => {
  profilePopup.setLoadingText(true);
  return api
    .updateUserProfile(
      formData["profile-title-input"],
      formData["profile-subtitle-input"]
    )
    .then((updated) => {
      userInfo.setUserInfo({ name: updated.name, job: updated.about });
    })
    .finally(() => profilePopup.setLoadingText(false, "Save"));
});
profilePopup.setEventListeners();

const avatarPopup = new PopupWithForm("#avatar-modal", (formData) => {
  avatarPopup.setLoadingText(true);
  return api
    .updateAvatar(formData["profile-picture-input"])
    .then((updated) => userInfo.setUserAvatar(updated.avatar))
    .finally(() => avatarPopup.setLoadingText(false, "Save"));
});
avatarPopup.setEventListeners();

avatarEditButton.addEventListener("click", () => {
  avatarPopup.open();
});

const cardPopup = new PopupWithForm("#card-add-modal", (formData) => {
  cardPopup.setLoadingText(true);
  return api
    .addCard({
      name: formData["card-title-input"],
      link: formData["card-link-input"],
    })
    .then((newCard) => renderCard(newCard))
    .finally(() => cardPopup.setLoadingText(false, "Create"));
});
cardPopup.setEventListeners();

const popupWithImage = new PopupWithImage("#js-preview-modal");
popupWithImage.setEventListeners();

const confirmDeletePopup = new PopupWithConfirmation("#delete-card-modal");
confirmDeletePopup.setEventListeners();

//   ---- Form Validators ----
new FormValidator(validationSettings, profileEditForm).enableValidation();
new FormValidator(validationSettings, cardAddForm).enableValidation();
new FormValidator(validationSettings, avatarEditForm).enableValidation();

//  ---- Button Listeners ----
profileEditButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  profileTitleInput.value = data.name;
  profileSubtitleInput.value = data.job;
  profilePopup.open();
});

cardAddButton.addEventListener("click", () => cardPopup.open());
