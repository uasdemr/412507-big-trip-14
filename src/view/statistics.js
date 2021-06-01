import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import SmartView from './smart.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { formatToDayHourMinutes } from '../utils/point.js';
import { EVENT_TYPES } from './const.js';

dayjs.extend(duration);

const BAR_HEIGHT = 55;

///////////////////////////
const pricePointByType = (points, type) => {
  const filteredByTypePoint = points.filter((point) => point.type === type);

  return filteredByTypePoint.reduce((acc1, point) => {
    return acc1 + point.basePrice;
  }, 0);
};

const usedPointByType = (points, type) => {
  return points.filter((point) => point.type === type).length;
};

const getTypeDuration = (points, type) => {
  const filteredByTypePoint = points.filter((point) => point.type === type);
  return filteredByTypePoint.reduce((acc1, point) => {
    return acc1 + dayjs(point.dateTo).diff(dayjs(point.dateFrom), 'minutes');
  }, 0);
};
//////////////////////////
const makeGraphicsData = (points, callback) => {
  const reducedPrices = Object.keys(EVENT_TYPES).map((type) => ({ type: type, value: callback(points, type) }));
  const sortedPrices = reducedPrices.sort((a, b) => a.value < b.value);
  const labels = sortedPrices.map((it) => it.type);
  const valuesForGraphic = sortedPrices.map((it) => it.value);
  return [labels, valuesForGraphic];
};

const moneyChartFormat = (val) => `€ ${val}`;
const typeChartFormat = (val) => `${val}x`;
const timeSpendFormat = (val) => {
  return val === 0 ? '0M' : formatToDayHourMinutes(val);
};


const renderChart = (ctx, labels, valuesForGraphic, formatter) => {
  ctx.height = BAR_HEIGHT * labels.length;

  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: labels,
      datasets: [{
        data: valuesForGraphic,
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
          formatter: formatter,
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
  constructor(getPoints) {
    super();
    this._getPoints = getPoints;
    this._moneyChart = undefined;
    this._typeChart = undefined;
    this._timeSpendChart = undefined;
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
    this.hide();
    super.show();
    this._setCharts();
  }

  hide() {
    super.hide();
    if (this._moneyChart) {
      this._moneyChart.destroy();
      this._moneyChart = undefined;
    }
    if (this._typeChart) {
      this._typeChart.destroy();
      this._typeChart = undefined;
    }
    if (this._timeSpendChart) {
      this._timeSpendChart.destroy();
      this._timeSpendChart = undefined;
    }
  }

  _setCharts() {
    const points = this._getPoints();

    const moneyCtx = document.querySelector('.statistics__chart--money');
    const typeCtx = document.querySelector('.statistics__chart--transport');
    const timeCtx = document.querySelector('.statistics__chart--time');

    const moneyData = makeGraphicsData(points, pricePointByType);
    const typeData = makeGraphicsData(points, usedPointByType);
    const timeDurationData = makeGraphicsData(points, getTypeDuration);

    this._moneyChart = renderChart(moneyCtx, ...moneyData, moneyChartFormat);
    this._typeChart = renderChart(typeCtx, ...typeData, typeChartFormat);
    this._timeSpendChart = renderChart(timeCtx, ...timeDurationData, timeSpendFormat);
  }
}

