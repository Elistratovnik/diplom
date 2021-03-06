import BaseComponent from "./BaseComponent";

export default class NewsCardList extends BaseComponent {
  constructor({handlers, container, createCardItem, cardTemplate, button, formatCardDate}) {
    super(handlers);
    this.formatCardDate = formatCardDate;
    this.container = container;
    this.cardTemplate = cardTemplate;
    this.createCardItem = createCardItem;
    this.button = button;
    this.count = 0;
  }

  addCard({title, date, source, description, sourceLink, imgLink}) {
    const card = this.createCardItem({title, date, source, description, sourceLink, imgLink}, this.cardTemplate, this.formatCardDate);
    this.container.append(card.createCard());
  }

  trippleCard = (array) => {
    this.buttonDisabled(false);
    for (let i = this.count; i < this.count + 3; i++) {
      if (i >= array.length) {
        this.buttonDisabled(true);
        break;
      };
      this.addCard({title: array[i].title,
                    date: array[i].publishedAt,
                    source: array[i].source.name,
                    description: array[i].description,
                    sourceLink: array[i].url,
                    imgLink: array[i].urlToImage})
      if (array.length == 3) this.buttonDisabled(true);
    }
    this.count = this.count + 3;
  }

  resetList = () => {
    this.count = 0;
    this.container.querySelectorAll('.card').forEach((item) => item.remove());
  }

  buttonDisabled (flag) {
    flag ? this.button.style.display = 'none' : this.button.style.display = 'block';
  }
}

