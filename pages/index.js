import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
];

// ELEMENTS
// ---------------------------------------------------------------------------------------------

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileSubtitleInput = document.querySelector("#profile-subtitle-input");
const profileEditForm = document.forms["profile-form"];

const addCardModal = document.querySelector("#add-card-modal");
const addCardButton = document.querySelector(".profile__add-button");
const addCardTitleInput = document.querySelector("#add-card-title-input");
const addCardLinkInput = document.querySelector("#add-card-link-input");
const addCardForm = document.forms["card-form"];

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards");

const pictureModal = document.querySelector("#picture-modal");
const pictureModalCaption = pictureModal.querySelector(
  ".modal__picture-caption"
);
const pictureModalPhoto = pictureModal.querySelector(".modal__picture");
const closeButtons = document.querySelectorAll(".modal__close");

// FUNCTIONS
// ---------------------------------------------------------------------------------------------
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeKeydownCloseModal);
  modal.addEventListener("mousedown", handleOverlayClickCloseModal);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeKeydownCloseModal);
  modal.removeEventListener("mousedown", handleOverlayClickCloseModal);
}

function renderCard(data, list, method) {
  const card = new Card(data, "#card-template", handleImageClickMethod);
  const cardElement = card.generateCard();
  list[method](cardElement);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__heart-icon");
  const deleteButton = cardElement.querySelector(".card__delete-icon");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__heart-icon_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openModal(pictureModal);
    pictureModalPhoto.src = cardImageEl.src;
    pictureModalPhoto.alt = cardTitleEl.textContent;
    pictureModalCaption.textContent = cardTitleEl.textContent;
  });

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  return cardElement;
}

// EVENT HANDLERS
// ---------------------------------------------------------------------------------------------

function handleImageClickMethod(cardInstance) {
  openModal(pictureModal);
  pictureModalPhoto.src = cardInstance.getCardImage();
  pictureModalPhoto.alt = cardInstance.getCardTitle();
  pictureModalCaption.textContent = cardInstance.getCardTitle();
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;
  closeModal(profileEditModal);
}

function handleAddCardCreate(evt) {
  evt.preventDefault();

  const name = addCardTitleInput.value;
  const link = addCardLinkInput.value;
  const cardSubmitButton = document.querySelector("#card-submit-button");
  renderCard({ name, link }, cardListEl, method);

  evt.target.reset();

  cardSubmitButton.classList.add("modal__form-button_disabled");
  cardSubmitButton.disabled = true;

  closeModal(addCardModal);
}

function handleEscapeKeydownCloseModal(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

function handleOverlayClickCloseModal(evt) {
  if (evt.target.classList.contains("modal_opened")) {
    closeModal(evt.target);
  }
}

// EVENT LISTENERS
// ---------------------------------------------------------------------------------------------

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardButton.addEventListener("click", () => openModal(addCardModal));

addCardForm.addEventListener("submit", handleAddCardCreate);

initialCards.forEach((cardData) => {
  renderCard(cardData, cardListEl, "prepend");
});

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error",
};

const editProfileFormValidator = new FormValidator(settings, profileEditForm);
const addCardFormValidator = new FormValidator(settings, addCardForm);

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
