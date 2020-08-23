export default class CommitSlide {
  constructor({name, avatarLink, date, description, email, link}, template, formatDate) {
    this.formatDate = formatDate;
    this.template = template;
    this.name = name;
    this.avatarLink = avatarLink;
    this.date = date;
    this.description = description;
    this.email = email;
    this.link = link;
  }

  createSlide () {
    this.slide = this.template.cloneNode(true).querySelector('.slide');
    this.slide.setAttribute('href', `${this.link}`)
    this.slideAvatar = this.slide.querySelector('.slide__avatar');
    this.slideAvatar.style.backgroundImage = `url('${this.avatarLink}')`;
    this.slideName = this.slide.querySelector('.slide__name');
    this.slideName.textContent = this.name;
    this.slideDate = this.slide.querySelector('.slide__date');
    this.slideDate.textContent = this.formatDate(this.date);
    this.slideEmail = this.slide.querySelector('.slide__email');
    this.slideEmail.textContent = this.email;
    this.slideText = this.slide.querySelector('.slide__text');
    this.slideText.textContent = this.description;
    return this.slide;
  }
}
