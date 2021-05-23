import AbstractView from './abstract.js';
import { MenuItem } from './const.js';

const createMenuItem = (selectedTab) => {

  return Object.keys(MenuItem).map((item) => `<a
                                                class="trip-tabs__btn
                                                ${(selectedTab.toLowerCase() === item.toLowerCase()) ? 'trip-tabs__btn--active' : ''}"
                                                data-menu=${MenuItem[item]}
                                                href="#">${MenuItem[item]}</a>`).join('');
};

const createSiteMenuTemplate = (selectedTab) => {
  return `<nav class="trip-controls__trip-tabs trip-tabs">
  ${createMenuItem(selectedTab)}

  </nav>`;
};

export default class SiteMenu extends AbstractView {
  constructor(selectedTab) {
    super();

    this._selectedTab = selectedTab;
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate(this._selectedTab);
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.menu);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().querySelectorAll('.trip-tabs__btn').forEach((e) => e.addEventListener('click', this._menuClickHandler));
  }

  setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`[value=${menuItem}]`);

    if (item !== null) {
      item.checked = true;
    }
  }
}
