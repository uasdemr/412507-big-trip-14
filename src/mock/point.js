import { EVENT_TYPES, DESTINATION } from '../view/const.js';
import { getRandomInteger } from '../utils/utils.js';

const typeGenerator = () => {
  const types = Object.keys(EVENT_TYPES);
  return types[getRandomInteger(0, types.length - 1)];
};

const citys = ['Amsterdam', 'Chamonix', 'Geneva', 'Краснодар', 'Ростов-на-дону'];


const generateDestination = () => {
  const generateFotos = () => {

    const generateFoto = () => {
      const num = getRandomInteger(1, 10000);
      return `http://picsum.photos/248/152?r=${num}`;
    };

    const objectCreator = () => {
      const returnedObj = {
        'src': generateFoto(),
        'description': generateDescription(),
      };

      return returnedObj;
    };

    const objects = [];
    for (let i = 0; i < getRandomInteger(0, 7); i++) {
      objects.push(objectCreator());
    }
    return objects;
  };

  const generateDescription = () => {

    const destinations = DESTINATION.split('. ');
    let newDestination = '';
    for (let i = 0; i < getRandomInteger(0, destinations.length); i++) {
      newDestination += destinations[i] + '.';
    }
    return newDestination;
  };

  return {
    'description': generateDescription(),
    'name': citys[getRandomInteger(0, citys.length - 1)],
    'pictures': generateFotos(),
  };
};

const offers = [
  {
    'type': 'taxi',
    'offers': [
      {
        'title': 'Upgrade to a business class',
        'price': 190,
      },
      {
        'title': 'Choose the radio station',
        'price': 30,
      },
      {
        'title': 'Choose temperature',
        'price': 170,
      },
      {
        'title': 'Drive quickly, I\'m in a hurry',
        'price': 100,
      },
      {
        'title': 'Drive slowly',
        'price': 110,
      },
    ],
  },
  {
    'type': 'bus',
    'offers': [
      {
        'title': 'Infotainment system',
        'price': 50,
      },
      {
        'title': 'Order meal',
        'price': 100,
      },
      {
        'title': 'Choose seats',
        'price': 190,
      },
    ],
  },
  {
    'type': 'train',
    'offers': [
      {
        'title': 'Book a taxi at the arrival point',
        'price': 110,
      },
      {
        'title': 'Order a breakfast',
        'price': 80,
      },
      {
        'title': 'Wake up at a certain time',
        'price': 140,
      },
    ],
  },
  {
    'type': 'flight',
    'offers': [
      {
        'title': 'Choose meal',
        'price': 120,
      },
      {
        'title': 'Choose seats',
        'price': 90,
      },
      {
        'title': 'Upgrade to comfort class',
        'price': 120,
      },
      {
        'title': 'Upgrade to business class',
        'price': 120,
      },
      {
        'title': 'Add luggage',
        'price': 170,
      },
      {
        'title': 'Business lounge',
        'price': 160,
      },
    ],
  },
  {
    'type': 'check-in',
    'offers': [
      {
        'title': 'Choose the time of check-in',
        'price': 70,
      },
      {
        'title': 'Choose the time of check-out',
        'price': 190,
      },
      {
        'title': 'Add breakfast',
        'price': 110,
      },
      {
        'title': 'Laundry',
        'price': 140,
      },
      {
        'title': 'Order a meal from the restaurant',
        'price': 30,
      },
    ],
  },
  {
    'type': 'sightseeing',
    'offers': [],
  },
  {
    'type': 'ship',
    'offers': [
      {
        'title': 'Choose meal',
        'price': 130,
      },
      {
        'title': 'Choose seats',
        'price': 160,
      },
      {
        'title': 'Upgrade to comfort class',
        'price': 170,
      },
      {
        'title': 'Upgrade to business class',
        'price': 150,
      },
      {
        'title': 'Add luggage',
        'price': 100,
      },
      {
        'title': 'Business lounge',
        'price': 40,
      },
    ],
  },
  {
    'type': 'transport',
    'offers': [],
  },
  {
    'type': 'drive',
    'offers': [
      {
        'title': 'Choose comfort class',
        'price': 110,
      },
      {
        'title': 'Choose business class',
        'price': 180,
      },
    ],
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'title': 'Choose live music',
        'price': 150,
      },
      {
        'title': 'Choose VIP area',
        'price': 70,
      },
    ],
  },
];

const getUniqueRandomItemsFromArray = (items) => {
  const randomItems = [];
  if (items.length > 0) {
    for(let i = 0; i < items.length; i++) {
      const num = getRandomInteger(0, items.length - 1);
      if(!randomItems.find((it) => it === items[num])) {
        randomItems.push(items[num]);
      }
    }
  }
  return randomItems;
};

const generateOffers = (type) => {
  // return offers.find((offer) => offer.type === type).offers;
  return getUniqueRandomItemsFromArray(offers.find((offer) => offer.type === type).offers);
};


const generatePoint = (num) => {
  const typeGenerated = typeGenerator();
  return {
    'basePrice': getRandomInteger(5, 2000),
    'dateFrom': '2021-04-10T08:53:00.845Z',
    'dateTo': '2021-05-13T10:03:00.375Z',
    'destination': generateDestination(),
    'id': num,
    'isFavorite': Math.random() > 0.5,
    'offers': generateOffers(typeGenerated),
    'type': typeGenerated,
  };
};

const generatePoints = (num) => {
  const returnedArr = [];
  for (let i = 0; i < num; i++) {
    returnedArr[i] = generatePoint(i);
  }
  return returnedArr;
};

export { generatePoints, offers };
