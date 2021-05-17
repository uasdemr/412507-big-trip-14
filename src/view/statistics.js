import dayjs from 'dayjs';
import SmartView from './smart.js';

const createStatisticsTemplate = () => {
  return `<section class="statistics visually-hidden">
  <h2 class="visually-hidden">Trip statistics</h2>

  <div class="statistics__item statistics__item--money">
    <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
  </div>

  <div class="statistics__item statistics__item--transport">
    <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
  </div>

  <div class="statistics__item statistics__item--time-spend">
    <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
  </div>
</section>`;
};

export default class Statistics extends SmartView {
  constructor(model) {
    super();

    this._data = {
      points: model.getPoints(),
      // По условиям техзадания по умолчанию интервал - неделя от текущей даты
      dateFrom: (() => {
        const daysToFullWeek = 6;
        return dayjs().subtract(daysToFullWeek, 'day').toDate();
      })(),
      dateTo: dayjs().toDate(),
    };

    this._dateChangeHandler = this._dateChangeHandler.bind(this);

    this._setCharts();
  }

  removeElement() {
    super.removeElement();

    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  }

  getTemplate() {
    return createStatisticsTemplate(this._data);
  }

  restoreHandlers() {
    this._setCharts();
  }

  _dateChangeHandler([dateFrom, dateTo]) {
    if (!dateFrom || !dateTo) {
      return;
    }

    this.updateData({
      dateFrom,
      dateTo,
    });
  }

  _setCharts() {
    // Нужно отрисовать два графика
  }
}

