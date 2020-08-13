export default class VariableContainer {
  constructor (container) {
    this.container = container;
  }

  showContainer () {
    this.container.style.display = 'block';
  }

  hideContainer () {
    this.container.style.display = 'none';
  }

  showChilds () {
    this._removeElement();
    Array.from(this.container.childNodes).forEach((child) => {
      if(child.nodeType === 1) child.style.display = child.dataset.display;
    })
  }

  hideСhilds () {;
    Array.from(this.container.childNodes).forEach((child) => {
      if(child.nodeType === 1) child.style.display = 'none';
    })
  }

  _removeElement = () => {
    if (this.element) this.element.remove();
  }

  renderElement (template, errorMessage) {
    this._removeElement();
    this.hideСhilds();
    this.element = template.content.cloneNode(true).querySelector(template.dataset.selector);
    if (errorMessage) {
      this.element.querySelector('.error__number').textContent = errorMessage.match(/\d{3}/);
    }
    this.container.append(this.element);
  }
}
