export default class CommitSlideList {
  constructor(container, createSlideItem, slideTemplate, formatSlideDate) {
    this.formatSlideDate = formatSlideDate;
    this.container = container;
    this.slideTemplate = slideTemplate;
    this.createSlideItem = createSlideItem;
  }

  addSlide({name, avatarLink, date, description, email, link}) {
    const slide = this.createSlideItem({name, avatarLink, date, description, email, link}, this.slideTemplate, this.formatSlideDate);
    this.container.append(slide.createSlide());
  }

  renderSlides = (commitsData, amount = 20) => {
    commitsData.slice(0, amount).forEach((data) => {
      this.addSlide({
        name: data.commit.author.name,
        avatarLink: data.author.avatar_url,
        date: data.commit.author.date,
        description: data.commit.message,
        email: data.commit.author.email,
        link: data.html_url
      });
    })
  }
}

