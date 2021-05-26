import { render, RenderPosition, replace, remove } from '../utils/render.js';
import { isDateChange, isPriceChange } from '../utils/point';
import { UserAction, UpdateType } from '../view/const';

import PointView from '../view/point.js';
import EventEditView from '../view/event-edit.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Point {
  constructor(pointListContainer, changeData, changeMode, offers, destinations) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._offers = offers;
    this._destinations = destinations;

    this._pointComponent = null;
    this._eventEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handlePointClickOpen = this._handlePointClickOpen.bind(this);
    this._handlePointClickClose = this._handlePointClickClose.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._pointComponent = new PointView(point);
    this._eventEditComponent = new EventEditView(point, this._offers, this._destinations);

    this._pointComponent.setEditClickHandler(this._handlePointClickOpen);
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setFormClickHandler(this._handlePointClickClose);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    if (prevPointComponent === null || prevEventEditComponent === null) {
      render(this._pointListContainer, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this._pointListContainer.getElement().contains(prevPointComponent.getElement())) {
      if (this._mode === Mode.DEFAULT) {
        replace(this._pointComponent, prevPointComponent);
      }
    }

    if (this._pointListContainer.getElement().contains(prevEventEditComponent.getElement())) {
      if (this._mode === Mode.EDITING) {
        replace(this._eventEditComponent, prevEventEditComponent);
      }
    }

    remove(prevPointComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._eventEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToPoint();
    }
  }

  _replacePointToForm() {
    replace(this._eventEditComponent, this._pointComponent);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._eventEditComponent);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._handlePointClickClose();
    }
  }

  _handlePointClickOpen() {
    this._replacePointToForm();
    document.addEventListener('keydown', this._onEscKeyDown);
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._point,
        {
          isFavorite: !this._point.isFavorite,
        }));
  }

  //Сделать в обработчике проверку на изменения даты и цены
  //Изменение цены это MINOR обновление
  //Изменение даты это MAJOR обновление
  //Сравнить даты из имеющегося this._point и пришедшего point

  //Если обновилась дата, надо сделать перерисовку компонента фильтра и задач
  //Если обновился прайс, надо сделать перерисовку компонента route-and-cost и задач
  _handleFormSubmit(point) {
    const isDateModify = isDateChange(this._point, point);
    const isPriceModify = isPriceChange(this._point, point);

    this._changeData(
      UserAction.UPDATE_POINT,
      isDateModify ? UpdateType.MAJOR : isPriceModify ? UpdateType.MINOR : UpdateType.PATCH,
      Object.assign(
        {},
        this._point,
        point));
    this._replaceFormToPoint();
    document.removeEventListener('keydown', this._onEscKeyDown);
  }

  _handlePointClickClose() {
    this._eventEditComponent.reset(this._point);
    this._replaceFormToPoint();
    document.removeEventListener('keydown', this._onEscKeyDown);
  }

  _handleDeleteClick(point) {
    this._changeData(
      UserAction.DELETE_POINT,
      UpdateType.MAJOR,
      point);
  }
}
