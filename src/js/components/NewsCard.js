export default class NewsCard {
  constructor({title, date, source, description, sourceLink, imgLink}, template, formatDate) {
    this.formatDate = formatDate;
    this.template = template;
    this.title = title;
    this.date = date;
    this.source = source;
    this.description = description;
    this.sourceLink = sourceLink;
    this.imgLink = imgLink || '../../../images/no_photo.png';
  }

  createCard () {
    this.card = this.template.cloneNode(true).querySelector('.card');
    this.card.setAttribute('href', `${this.sourceLink}`)
    this.cardImage = this.card.querySelector('.card__image');
    this.cardImage.setAttribute('data-link', `${this.imgLink}`);
    this.cardImage.style.backgroundImage = `url('${this.imgLink}')`;
    this.cardTitle = this.card.querySelector('.card__title');
    this.cardTitle.setAttribute('data-title', `${this.title}`);
    this.cardTitle.textContent = this.title;
    this.cardDate = this.card.querySelector('.card__date');
    this.cardDate.setAttribute('data-date', `${this.formatDate(this.date)}`);
    this.cardDate.textContent = this.formatDate(this.date);
    this.cardSource = this.card.querySelector('.card__source');
    this.cardSource.setAttribute('data-source', `${this.source}`);
    this.cardSource.textContent = this.source;
    this.cardText = this.card.querySelector('.card__text');
    this.cardText.setAttribute('data-description', `${this.description}`);
    this.cardText.textContent = this.description;
    return this.card;
  }

  remove = (event) => {
    this.card.remove();
  }
}
