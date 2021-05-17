// import AbstractView from './abstract.js';
import SmartView from './smart.js';

const createListViewTemplate = () => {
  return '<ul class="trip-events__list"></ul>';
};

export default class ListView extends SmartView {

  getTemplate() {
    return createListViewTemplate();
  }
}
