export default class Card {
  constructor(cardData, cardSelector, handleImageClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__heart-icon")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._cardElement
      .querySelector(".card__delete-icon")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this.handleImageClick(this);
      });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector("card__heart-icon")
      .classList.toggle("card__heart-icon_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    // get the card view

    this._setEventListeners();

    // return the card
    this._element.querySelector(".");
  }
}
