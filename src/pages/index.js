import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import {
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
  profileAvatar,
  profileName,
  profileSubtitle,
  deleteCardModal,
  deleteButton,
  avatarEditButton,
  avatarEditForm,
  initialCards,
  avatarProfile,
  cardLikeButton,
} from "../utils/constants.js";
import api from "../components/Api.js";

// User info setup
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
  avatarSelector: ".profile__photo",
});

const cardSection = new Section(
  {
    items: [],
    renderer: (cardData) => {
      renderCard(cardData);
    },
  },
  ".cards__list"
);
// cardSection.renderItems();
let currentUserId;
// Fetch user info and cards from the API
api
  .getAppData()
  .then(([userData, cards]) => {
    currentUserId = userData._id;

    // Update user info in the DOM
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
    });

    userInfo.setUserAvatar(userData.avatar);
    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.error("Error loading app data:", err);
  });

// Function to render individual cards
function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement);
}

function handleDeleteClick(cardInstance) {
  confirmDeletePopup.setSubmitAction(() => {
    const cardId = cardInstance.getId();
    api
      .deleteCard(cardId)
      .then(() => {
        cardInstance.removeCard();
        confirmDeletePopup.close();
      })
      .catch((err) => {
        console.error("Error deleting card:", err);
      });
  });

  confirmDeletePopup.open();
}

function handleCardLike(card) {
  const isLiked = card.isLiked;
  const cardId = card.getId();

  card.setLikes(!isLiked);

  const likeRequest = isLiked ? api.unlikeCard(cardId) : api.likeCard(cardId);

  likeRequest
    .then((updatedCard) => {
      card.setLikes(updatedCard.isLiked);
    })
    .catch((err) => {
      console.error("Error updating like status:", err);
      card.setLikes(isLiked);
    });
}

// Function to create a new card
function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteClick,
    handleCardLike,
    currentUserId
  );

  const cardElement = card.getView();
  cardElement.setAttribute("data-id", cardData._id);

  return cardElement;
}

// Function to handle image clicks and open the preview
function handleImageClick(name, link) {
  popupWithImage.open({ name, link });
}

// Popup handling
const profilePopup = new PopupWithForm("#profile-edit-modal", (formData) => {
  const updatedName = formData["profile-title-input"];
  const updatedAbout = formData["profile-subtitle-input"];

  profilePopup.setLoadingText(true); // Show "Saving..."

  api
    .updateUserProfile(updatedName, updatedAbout)
    .then((updatedUserData) => {
      userInfo.setUserInfo({
        name: updatedUserData.name,
        job: updatedUserData.about,
      });
      //  userInfo.setUserAvatar(updatedUserData.avatar);
      profilePopup.close();
    })
    .catch((err) => {
      console.error("Error updating profile:", err);
    })
    .finally(() => {
      profilePopup.setLoadingText(false, "Save");
    });
});

const avatarPopup = new PopupWithForm(
  "#modal-change-profile-picture",
  (formData) => {
    console.log("formData:", formData);

    const newAvatarLink = formData["profile-picture-link"];

    avatarPopup.setLoadingText(true);

    api
      .updateAvatar(newAvatarLink)
      .then((updatedUser) => {
        userInfo.setUserAvatar(updatedUser.avatar);
        avatarPopup.close();
      })
      .catch((err) => {
        console.error("Error updating avatar:", err);
      })
      .finally(() => {
        avatarPopup.setLoadingText(false, "Save");
      });
  }
);
avatarPopup.setEventListeners();

avatarEditButton.addEventListener("click", () => {
  avatarFormValidator.disableSubmitButton();
  avatarPopup.open();
});

const cardPopup = new PopupWithForm("#card-add-modal", (formData) => {
  const cardName = formData["card-title-input"];
  const cardLink = formData["card-link-input"];

  const cardData = {
    name: cardName,
    link: cardLink,
  };

  cardPopup.setLoadingText(true);

  api
    .addCard(cardData)
    .then((newCard) => {
      renderCard(newCard);
      cardPopup.close();
    })
    .catch((err) => {
      console.error("Error adding card:", err);
    })
    .finally(() => {
      cardPopup.setLoadingText(false, "Create");
    });
});

profilePopup.setEventListeners();
cardPopup.setEventListeners();

// Popup with image instance
const popupWithImage = new PopupWithImage("#js-preview-modal");
popupWithImage.setEventListeners();

// Validation setup
const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationSettings, cardAddForm);
addFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(
  validationSettings,
  avatarEditForm
);
avatarFormValidator.enableValidation();

// Event listeners for profile and card buttons
profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileSubtitleInput.value = userData.job;
  profilePopup.open();
});

cardAddButton.addEventListener("click", () => {
  addFormValidator.disableSubmitButton();
  cardPopup.open();
});

const confirmDeletePopup = new PopupWithConfirmation("#delete-card-modal");
confirmDeletePopup.setEventListeners();

// TO FIX

// likes dont work

//      profileAvatar.src = userData.avatar;
// Only methods of UserInfo should set/get the profile data (including the avatar)

// profile only updates after reload
