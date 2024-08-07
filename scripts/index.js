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
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileSubtitleInput = document.querySelector("#profile-subtitle-input");
const profileEditForm = document.querySelector("#modal-profile-form");

const addCardModal = document.querySelector("#add-card-modal");
const addCardButton = document.querySelector(".profile__add-button");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const addCardTitleInput = document.querySelector("#add-card-title-input");
const addCardLinkInput = document.querySelector("#add-card-link-input");
const addCardForm = document.querySelector("#add-card-form");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards");

// FUNCTIONS
// ---------------------------------------------------------------------------------------------
function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function renderCard(data, list) {
  const cardElement = getCardElement(data);
  list.prepend(cardElement);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__heart-icon");
  const deleteButton = cardElement.querySelector(".card__delete-icon");
  const pictureModal = document.querySelector("#picture-modal");
  const pictureModalCaption = pictureModal.querySelector(
    ".modal__picture-caption"
  );
  const pictureModalPhoto = pictureModal.querySelector(".modal__picture");
  const pictureModalCloseButton = pictureModal.querySelector(".modal__close");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__heart-icon_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openModal(pictureModal);
    pictureModalPhoto.src = cardImageEl.src;
    pictureModalCaption.textContent = cardTitleEl.textContent;
  });

  pictureModalCloseButton.addEventListener("click", () =>
    closeModal(pictureModal)
  );

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  return cardElement;
}

// EVENT HANDLERS
// ---------------------------------------------------------------------------------------------

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
  renderCard({ name, link }, cardListEl);

  closeModal(addCardModal);
}

// EVENT LISTENERS
// ---------------------------------------------------------------------------------------------

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
  openModal(profileEditModal);
});

profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardButton.addEventListener("click", () => openModal(addCardModal));

addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

addCardForm.addEventListener("submit", handleAddCardCreate);

initialCards.forEach((data) => renderCard(data, cardListEl));
