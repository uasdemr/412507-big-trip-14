import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import SmartView from './smart.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

dayjs.extend(duration);

const BAR_HEIGHT = 55;

const pricePointByType = (points, type) => {
  const filteredByTypePoint = points.filter((point) => point.type === type);
  return filteredByTypePoint.reduce((acc1, point) => {
    const offersCost = point.offers.reduce((acc2, offer) => acc2 + offer.price, 0);
    return acc1 + point.basePrice + offersCost;
  }, 0);
};

const renderMoneyChart = (points) => {
  const moneyCtx = document.querySelector('.statistics__chart--money');

  const types = points.map((point) => point.type);
  const makeTypesUniq = () => [...new Set(types)];
  const filteredByTypes = makeTypesUniq();
  moneyCtx.height = BAR_HEIGHT * filteredByTypes.length;

  const reducedPrices = filteredByTypes.map((type) => pricePointByType(points, type));

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: filteredByTypes,
      datasets: [{
        data: reducedPrices,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const usedPointByType = (points, type) => {
  return points.filter((point) => point.type === type).length;
};

const renderTypeChart = (points) => {
  const typeCtx = document.querySelector('.statistics__chart--transport');

  const types = points.map((point) => point.type);
  const makeTypesUniq = () => [...new Set(types)];
  const filteredByTypes = makeTypesUniq();

  const typeUsedLengths = filteredByTypes.map((type) => usedPointByType(points, type));

  typeCtx.height = BAR_HEIGHT * filteredByTypes.length;
  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: filteredByTypes,
      datasets: [{
        data: typeUsedLengths,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const getTypeDuration = (points, type) => {
  const filteredByTypePoint = points.filter((point) => point.type === type);
  return filteredByTypePoint.reduce((acc1, point) => {
    return acc1 + dayjs(point.dateTo).diff(dayjs(point.dateFrom), 'minutes');
  }, 0);
};

const renderTimeSpendChart = (points) => {
  const timeCtx = document.querySelector('.statistics__chart--time');

  const types = points.map((point) => point.type);
  const makeTypesUniq = () => [...new Set(types)];
  const filteredByTypes = makeTypesUniq();

  const typeDuration = filteredByTypes.map((type) => getTypeDuration(points, type));
  timeCtx.height = BAR_HEIGHT * typeDuration.length;

  const zeroPad = (num) => {
    return String(num).padStart(2, 0);
  };


  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: filteredByTypes,
      datasets: [{
        data: typeDuration,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => {
            const days = zeroPad(dayjs.duration(val, 'minutes').days());
            const hours = zeroPad(dayjs.duration(val, 'minutes').hours());
            const minutes = zeroPad(dayjs.duration(val, 'minutes').minutes());
            const diffReturned = `${days}D ${hours}H ${minutes}M`;
            return `${diffReturned}`;
          },
        },
      },
      title: {
        display: true,
        text: 'TIME-SPEND',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

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
  constructor(pointsModel) {
    super();
    this._pointsModel = pointsModel;
    // this._dateChangeHandler = this._dateChangeHandler.bind(this);
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

  show() {
    super.show();
    this._setCharts();
  }

  // _dateChangeHandler([dateFrom, dateTo]) {
  //   if (!dateFrom || !dateTo) {
  //     return;
  //   }

  //   this.updateData({
  //     dateFrom,
  //     dateTo,
  //   });
  // }

  _setCharts() {
    // Нужно отрисовать два графика
    // Рассчитаем высоту канваса в зависимости от того, сколько данных в него будет передаваться
    renderMoneyChart(this._pointsModel.getPoints());
    renderTypeChart(this._pointsModel.getPoints());
    renderTimeSpendChart(this._pointsModel.getPoints());
  }
}

