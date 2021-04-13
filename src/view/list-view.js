import { createElement } from '../mock/utils';

const createListViewTemplate = () => {
  return '<ul class="trip-events__list"></ul>';
};

export default class ListView {
  constructor() {
  }

  getTemplate() {
    return createListViewTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
