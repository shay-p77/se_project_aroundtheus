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
  profileAvatar,
  profileName,
  profileSubtitle,
  deleteCardModal,
  confirmDeleteButton,
  deleteButton,
} from "../utils/constants.js";
import api from "../components/Api.js";

// Select the DOM elements for user info

// User info setup
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
});

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

// Fetch user info and cards from the API
api
  .getAppData()
  .then(([userData, cards]) => {
    // Update user info in the DOM
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about, // 'about' from user data
    });

    // Update profile avatar
    profileAvatar.src = userData.avatar;

    // Render cards
    cards.forEach((cardData) => {
      renderCard(cardData); // Render each card
    });
  })
  .catch((err) => {
    console.error("Error loading app data:", err);
  });

// Function to render individual cards
function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement);
}

function handleLike(cardId, cardInstance) {
  api
    .addLike(cardId)
    .then((updatedCardData) => {
      cardInstance.updateLikes(updatedCardData.likes);
    })
    .catch((err) => {
      console.error("Error liking card:", err);
    });
}

function handleUnlike(cardId, cardInstance) {
  api
    .removeLike(cardId)
    .then((updatedCardData) => {
      cardInstance.updateLikes(updatedCardData.likes);
    })
    .catch((err) => {
      console.error("Error unliking card:", err);
    });
}

// Function to create a new card
function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    (cardId) => handleLike(cardId, card),
    (cardId) => handleUnlike(cardId, card)
  );

  const cardElement = card.getView();
  cardElement.setAttribute("data-id", cardData._id);

  // deleteButton.addEventListener("click", () => {
  //   openDeleteCardModal(cardElement);
  // });

  return card.getView();
}

// Function to handle image clicks and open the preview
function handleImageClick(name, link) {
  popupWithImage.open({ name, link });
}

// Popup handling
const profilePopup = new PopupWithForm("#profile-edit-modal", (formData) => {
  // Use formData to get the updated values
  const updatedName = formData["profile-title-input"];
  const updatedAbout = formData["profile-subtitle-input"];

  // Send PATCH request to update profile
  api
    .updateUserProfile(updatedName, updatedAbout)
    .then((updatedUserData) => {
      // Update the profile data in the DOM
      userInfo.setUserInfo({
        name: updatedUserData.name,
        job: updatedUserData.about,
      });
      profileAvatar.src = updatedUserData.avatar;
      profilePopup.close();
    })
    .catch((err) => {
      console.error("Error updating profile:", err);
    });
});

const cardPopup = new PopupWithForm("#card-add-modal", (formData) => {
  const cardName = formData["card-title-input"];
  const cardLink = formData["card-link-input"];

  // Create the card object to be sent to the server
  const cardData = {
    name: cardName,
    link: cardLink,
  };

  // Add the new card to the server
  addNewCard(cardData);

  // Disable the submit button and close the popup
  addFormValidator.disableSubmitButton();
  cardPopup.close();
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

// Event listeners for profile and card buttons
profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileSubtitleInput.value = userData.job;
  profilePopup.open();
});

cardAddButton.addEventListener("click", () => {
  cardPopup.open();
});

// Function to add a new card
function addNewCard(cardData) {
  fetch("https://around-api.en.tripleten-services.com/v1/cards", {
    method: "POST",
    headers: {
      authorization: "a2a2c423-7cb0-4ced-94a4-b5c16324eb7c",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
  })
    .then((response) => response.json())
    .then((newCard) => {
      console.log("New card added:", newCard);
      // Render the new card on the page
      renderCard(newCard);
    })
    .catch((err) => {
      console.error("Error adding new card:", err);
    });
}

let cardToDelete = null;

function handleDeleteClick(cardElement) {
  cardToDelete = cardElement;
  deleteCardModal.open();
}

deleteButton.addEventListener("click", () => handleDeleteClick(cardElement));

function openDeleteCardModal(cardElement) {
  cardToDelete = cardElement;
  deleteCardModal.classList.add("modal_open");
}

function closeDeleteCardModal() {
  deleteCardModal.close();
  cardToDelete = null; // Reset it just in case
}

const deleteModalCloseButton = deleteCardModal.querySelector(
  "#delete-modal-close"
);

// Confirm deletion of the card
confirmDeleteButton.addEventListener("click", () => {
  if (cardToDelete) {
    const cardId = cardToDelete.getAttribute("data-id");

    api
      .deleteCard(cardId)
      .then(() => {
        console.log(`Card with ID ${cardId} deleted`);
        cardToDelete.remove();
        closeDeleteCardModal();
        cardToDelete = null;
      })
      .catch((err) => {
        console.error("Error deleting card:", err);
        closeDeleteCardModal();
      });
  }
});

deleteModalCloseButton.addEventListener("click", closeDeleteCardModal);

// TO FIX

// profile contents...

// extra weird card

// delete modal css

// fix delete modal to close

// fix delete modal cuz card deletes first

// TO DO

// 7. Adding and removing likes

// 8.  Updating profile picture

// 9.  Improving UX of all forms
