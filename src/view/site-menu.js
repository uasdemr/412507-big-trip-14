import AbstractView from './abstract.js';
import { MenuItem } from './const.js';

const createMenuItem = () => {
  return Object.keys(MenuItem).map((item) => `<a class="trip-tabs__btn trip-tabs__btn--active" data-menu=${item} href="#">${MenuItem[item]}</a>`).join('');
};

const createSiteMenuTemplate = () => {
  return `<nav class="trip-controls__trip-tabs trip-tabs">
    <a class="trip-tabs__btn trip-tabs__btn--active" data-menu=${MenuItem.TABLE} href="#">${MenuItem.TABLE}</a>
    <a class="trip-tabs__btn" data-menu=${MenuItem.STATISTICS} href="#">${MenuItem.STATISTICS}</a>
  </nav>`;
};

export default class SiteMenu extends AbstractView{
  constructor(selectedTab) {
    super();

    this._selectedTab = selectedTab;
    console.log(this._selectedTab);
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate();
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
