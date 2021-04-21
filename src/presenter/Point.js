import { render, RenderPosition, replace, remove } from '../utils/render.js';

import PointView from '../view/point.js';
import EventEditView from '../view/event-edit.js';

export default class Point {
  constructor(pointListContainer, changeData) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;

    this._pointComponent = null;
    this._eventEditComponent = null;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handlePointClickOpen = this._handlePointClickOpen.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handlePointClickClose = this._handlePointClickClose.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._pointComponent = new PointView(point);
    this._eventEditComponent = new EventEditView(point);

    this._pointComponent.setEditClickHandler(this._handlePointClickOpen);
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setFormClickHandler(this._handlePointClickClose);

    if (prevPointComponent === null || prevEventEditComponent === null) {
      render(this._pointListContainer, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this._pointListContainer.getElement().contains(prevPointComponent.getElement())) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._pointListContainer.getElement().contains(prevEventEditComponent.getElement())) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevPointComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._eventEditComponent);
  }

  _replacePointToForm() {
    replace(this._eventEditComponent, this._pointComponent);
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._eventEditComponent);
  }

  _onEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormToPoint();
      document.removeEventListener('keydown', this._onEscKeyDown);
    }
  }

  _handlePointClickOpen() {
    this._replacePointToForm();
    document.addEventListener('keydown', this._onEscKeyDown);
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._point,
        {
          isFavorite: !this._point.isFavorite,
        }));
  }

  _handleFormSubmit(point) {
    this._changeData(point);
    this._replaceFormToPoint();
    document.removeEventListener('keydown', this._onEscKeyDown);
  }

  _handlePointClickClose() {
    this._replaceFormToPoint();
    document.removeEventListener('keydown', this._onEscKeyDown);
  }
}
